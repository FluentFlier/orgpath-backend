import express from "express";
import pool from "../db.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

/**
 * @route POST /api/assessment
 * @desc Create a new assessment
 */
router.post("/", async (req, res) => {
  try {
    const { responses, score } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!responses || typeof responses !== 'object') {
      return res.status(400).json({
        success: false,
        error: "Responses must be a valid object"
      });
    }

    if (score === undefined || score === null) {
      return res.status(400).json({
        success: false,
        error: "Score is required"
      });
    }

    const scoreNum = parseFloat(score);
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      return res.status(400).json({
        success: false,
        error: "Score must be a number between 0 and 100"
      });
    }

    const result = await pool.query(
      `INSERT INTO assessments (user_id, responses, score)
       VALUES ($1, $2, $3) RETURNING *`,
      [userId, JSON.stringify(responses), scoreNum]
    );

    res.status(201).json({
      success: true,
      message: "Assessment created successfully",
      assessment: result.rows[0]
    });
  } catch (error) {
    console.error("Assessment POST error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create assessment"
    });
  }
});

/**
 * @route GET /api/assessment
 * @desc Get all assessments for the authenticated user
 */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, score, responses, created_at
       FROM assessments
       WHERE user_id=$1
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      count: result.rows.length,
      assessments: result.rows
    });
  } catch (error) {
    console.error("Assessment GET error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch assessments"
    });
  }
});

export default router;
