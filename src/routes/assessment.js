import express from "express";
import { Pool } from "pg";
import { authMiddleware } from "../utils/authMiddleware.js";
import { config } from "../config.js";
import { calculateAssessmentScores } from "../services/scoringService.js"; // Import the math logic

const router = express.Router();
const pool = new Pool({ connectionString: config.dbUrl });

// Protect all routes
router.use(authMiddleware);

// --- 1. GET Past Assessments ---
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM assessments WHERE user_id=$1`, [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching assessments:", error);
    res.status(500).json({ error: "Server error fetching assessments" });
  }
});

// --- 2. POST New Assessment (Auto-Scored) ---
router.post("/", async (req, res) => {
  const client = await pool.connect();
  try {
    const { responses, assessment_type } = req.body;
    const userId = req.user.id;

    // A. Run the Scoring Engine
    const computedScores = calculateAssessmentScores(responses);

    await client.query('BEGIN');

    // B. Save to Database
    const insertQuery = `
      INSERT INTO assessments (user_id, score, details, type, created_at)
      VALUES ($1, $2, $3, $4, NOW()) 
      RETURNING *
    `;
    
    // We store the full JSON breakdown in 'details'
    const result = await client.query(insertQuery, [
      userId, 
      computedScores.overall_score, 
      JSON.stringify(computedScores), 
      assessment_type || 'self' 
    ]);

    await client.query('COMMIT');

    // C. Return the calculated scores to the frontend immediately
    res.json({
      message: "Assessment scored and saved",
      data: result.rows[0],
      breakdown: computedScores 
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error saving assessment:", error);
    res.status(500).json({ error: "Server error calculating scores" });
  } finally {
    client.release();
  }
});

// --- 3. POST Risk & Succession Data (From earlier today) ---
router.post("/risk-succession", async (req, res) => {
  const client = await pool.connect();
  try {
    const { 
        target_user_id, performance_rating, potential_rating, 
        flight_risk, impact_of_loss, successors 
    } = req.body;

    await client.query('BEGIN');

    // Update User Metrics
    await client.query(`
        UPDATE users 
        SET performance_rating = $1, potential_rating = $2, flight_risk = $3, impact_of_loss = $4
        WHERE id = $5
    `, [performance_rating, potential_rating, flight_risk, impact_of_loss, target_user_id]);

    // Update Successors
    await client.query(`DELETE FROM succession_plans WHERE incumbent_user_id = $1`, [target_user_id]);
    
    if (successors && successors.length > 0) {
        for (const s of successors) {
            await client.query(`
                INSERT INTO succession_plans (incumbent_user_id, successor_user_id, readiness_level)
                VALUES ($1, $2, $3)
            `, [target_user_id, s.successor_id, s.readiness]);
        }
    }

    await client.query('COMMIT');
    res.status(200).json({ message: "Risk and Succession data saved." });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error saving succession:", error);
    res.status(500).json({ error: "Server error" });
  } finally {
    client.release();
  }
});

export default router;