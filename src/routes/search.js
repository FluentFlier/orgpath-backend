import express from "express";
import pool from "../../db/db.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

/**
 * @route POST /api/search/documents
 * @desc Full-text search across ingested documents and chunks
 *       Foundation for RAG pipeline - returns relevant chunks for LLM context
 */
router.post("/documents", async (req, res) => {
  const { query, limit = 10 } = req.body;

  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    // Search across document chunks first (more granular)
    const chunkResults = await pool.query(
      `SELECT dc.id, dc.content, dc.chunk_index, dc.metadata,
              d.title AS document_title, d.id AS document_id,
              ts_rank(to_tsvector('english', dc.content), plainto_tsquery('english', $1)) AS relevance
       FROM document_chunks dc
       JOIN documents d ON dc.document_id = d.id
       WHERE to_tsvector('english', dc.content) @@ plainto_tsquery('english', $1)
       ORDER BY relevance DESC
       LIMIT $2`,
      [query, limit]
    );

    // Also search full documents as fallback
    const docResults = await pool.query(
      `SELECT d.id, d.title, d.metadata,
              LEFT(d.content, 500) AS snippet,
              ts_rank(to_tsvector('english', d.content), plainto_tsquery('english', $1)) AS relevance
       FROM documents d
       WHERE to_tsvector('english', d.content) @@ plainto_tsquery('english', $1)
       ORDER BY relevance DESC
       LIMIT $2`,
      [query, limit]
    );

    res.json({
      query,
      chunks: chunkResults.rows,
      documents: docResults.rows,
      totalChunks: chunkResults.rows.length,
      totalDocuments: docResults.rows.length,
    });
  } catch (error) {
    console.error("Document search error:", error);
    res.status(500).json({ error: "Search failed" });
  }
});

/**
 * @route POST /api/search/context
 * @desc RAG context retrieval - returns chunked content formatted for LLM consumption
 */
router.post("/context", async (req, res) => {
  const { query, maxTokens = 2000 } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query required" });
  }

  try {
    // Retrieve relevant chunks ordered by relevance, capped by token budget
    const result = await pool.query(
      `SELECT dc.content, dc.token_count, d.title AS source
       FROM document_chunks dc
       JOIN documents d ON dc.document_id = d.id
       WHERE to_tsvector('english', dc.content) @@ plainto_tsquery('english', $1)
       ORDER BY ts_rank(to_tsvector('english', dc.content), plainto_tsquery('english', $1)) DESC
       LIMIT 20`,
      [query]
    );

    // Assemble context within token budget
    let tokenBudget = maxTokens;
    const contextParts = [];

    for (const row of result.rows) {
      const chunkTokens = row.token_count || Math.ceil(row.content.length / 4);
      if (tokenBudget - chunkTokens < 0 && contextParts.length > 0) break;
      contextParts.push({
        source: row.source,
        content: row.content,
      });
      tokenBudget -= chunkTokens;
    }

    res.json({
      query,
      context: contextParts,
      sourcesUsed: [...new Set(contextParts.map((c) => c.source))],
    });
  } catch (error) {
    console.error("Context retrieval error:", error);
    res.status(500).json({ error: "Context retrieval failed" });
  }
});

/**
 * @route GET /api/search/stats
 * @desc Returns document/chunk stats for the RAG pipeline
 */
router.get("/stats", async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM documents) AS total_documents,
        (SELECT COUNT(*) FROM document_chunks) AS total_chunks,
        (SELECT COUNT(*) FROM ingestion_jobs WHERE status = 'completed') AS completed_jobs,
        (SELECT COUNT(*) FROM ingestion_jobs WHERE status = 'failed') AS failed_jobs
    `);

    res.json(stats.rows[0]);
  } catch (error) {
    console.error("Search stats error:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
