import express from "express";
import pool from "../db.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

/**
 * @route GET /api/dashboard
 * @desc Returns user dashboard info with real assessment data from database
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = req.user; // populated from JWT by middleware

    // Query actual assessments from database
    const assessmentsQuery = await pool.query(
      `SELECT id, score, responses, created_at
       FROM assessments
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [user.id]
    );

    const assessments = assessmentsQuery.rows;

    // Calculate statistics
    let avgScore = 0;
    let latestScore = null;
    let trend = null;

    if (assessments.length > 0) {
      const totalScore = assessments.reduce((sum, a) => sum + parseFloat(a.score || 0), 0);
      avgScore = (totalScore / assessments.length).toFixed(1);
      latestScore = assessments[0].score;

      // Calculate trend (compare latest to previous)
      if (assessments.length >= 2) {
        const latest = parseFloat(assessments[0].score || 0);
        const previous = parseFloat(assessments[1].score || 0);
        const diff = latest - previous;

        if (diff > 0) {
          trend = `↑ +${diff.toFixed(1)}`;
        } else if (diff < 0) {
          trend = `↓ ${diff.toFixed(1)}`;
        } else {
          trend = "— No change";
        }
      }
    }

    res.json({
      success: true,
      message: "Dashboard data fetched successfully",
      user: {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        referral_code: user.referral_code,
      },
      assessments: assessments.map(a => ({
        id: a.id,
        score: parseFloat(a.score),
        created_at: a.created_at,
      })),
      stats: {
        total: assessments.length,
        average: parseFloat(avgScore),
        latest: latestScore ? parseFloat(latestScore) : null,
        trend: trend,
      },
    });
  } catch (error) {
    console.error("❌ Dashboard route error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch dashboard data",
    });
  }
});

export default router;
