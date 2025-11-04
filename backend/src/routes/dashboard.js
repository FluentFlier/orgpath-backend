import express from "express";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

/**
 * @route GET /api/dashboard
 * @desc Returns user dashboard info (requires valid JWT)
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = req.user; // populated from JWT by middleware

    // Mock response for now — replace later with DB queries
    res.json({
      success: true,
      message: "Dashboard data fetched successfully",
      user: {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        referral_code: user.referral_code,
      },
      assessments: [
        { id: 1, score: 87, created_at: "2025-11-03T19:00:00Z" },
        { id: 2, score: 91, created_at: "2025-11-02T17:00:00Z" },
      ],
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
