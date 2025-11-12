import express from "express";
import { Pool } from "pg"; // <-- 1. IMPORT POOL
import { authMiddleware } from "../utils/authMiddleware.js";
import { config } from "../config.js"; // <-- 2. IMPORT CONFIG

const router = express.Router();
const pool = new Pool({ connectionString: config.dbUrl }); // <-- 3. CREATE POOL

/**
 * @route GET /api/dashboard
 * @desc Returns user dashboard info (requires valid JWT)
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = req.user; // populated from JWT by middleware

    // --- 4. REAL DATABASE QUERY ---
    // Get all assessments for this specific user
    const assessmentQuery = `
      SELECT id, score, created_at 
      FROM assessments 
      WHERE user_id = $1 
      ORDER BY created_at DESC
    `;
    const { rows } = await pool.query(assessmentQuery, [user.id]);
    // 'rows' will be an array of assessments, e.g., [{id: 1, score: 87, ...}]
    // --- END OF QUERY ---

    // 5. SEND REAL DATA
    res.json({
      success: true,
      message: "Dashboard data fetched successfully",
      user: {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        referral_code: user.referral_code,
      },
      // Send the 'rows' from our query instead of the mock array
      assessments: rows, 
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