import express from "express";
import pool from "../../db/db.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

/**
 * @route GET /api/teamlead/dashboard
 * @desc Returns real dashboard data for a team lead with team member mapping
 */
router.get("/dashboard", async (req, res) => {
  if (req.user.role !== "lead") {
    return res.status(403).json({ error: "Access denied. Not a team lead." });
  }

  try {
    const leadId = req.user.id;

    // Get team members assigned to this lead
    const teamQuery = await pool.query(
      `SELECT u.id, u.first_name, u.last_name, u.email, u.job_title, u.department
       FROM users u
       WHERE u.team_lead_id = $1
       ORDER BY u.first_name`,
      [leadId]
    );

    const teamMembers = teamQuery.rows;
    const teamMemberIds = teamMembers.map((m) => m.id);

    // If no direct reports, fall back to department-based lookup
    let effectiveIds = teamMemberIds;
    if (teamMemberIds.length === 0) {
      const deptQuery = await pool.query(
        `SELECT u.id, u.first_name, u.last_name, u.email, u.job_title, u.department
         FROM users u
         WHERE u.department = (SELECT department FROM users WHERE id = $1)
           AND u.role = 'employee'
           AND u.id != $1
         ORDER BY u.first_name`,
        [leadId]
      );
      teamMembers.push(...deptQuery.rows);
      effectiveIds = deptQuery.rows.map((m) => m.id);
    }

    // Get latest assessment scores for team members
    let assessmentStats = { avgScore: 0, completionRate: 0, scores: [] };
    if (effectiveIds.length > 0) {
      const assessmentQuery = await pool.query(
        `SELECT DISTINCT ON (a.user_id)
           a.user_id, a.score, a.category_scores, a.status, a.created_at
         FROM assessments a
         WHERE a.user_id = ANY($1)
         ORDER BY a.user_id, a.created_at DESC`,
        [effectiveIds]
      );

      const completedCount = assessmentQuery.rows.filter(
        (r) => r.status === "completed"
      ).length;
      const scores = assessmentQuery.rows
        .filter((r) => r.score != null)
        .map((r) => Number(r.score));
      const avgScore =
        scores.length > 0
          ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
          : 0;

      assessmentStats = {
        avgScore,
        completionRate:
          effectiveIds.length > 0
            ? Math.round((completedCount / effectiveIds.length) * 100)
            : 0,
        scores: assessmentQuery.rows,
      };
    }

    // Build performance breakdown from category_scores
    const categoryTotals = {};
    let categoryCount = 0;
    assessmentStats.scores.forEach((row) => {
      if (row.category_scores) {
        categoryCount++;
        Object.entries(row.category_scores).forEach(([key, val]) => {
          categoryTotals[key] = (categoryTotals[key] || 0) + Number(val);
        });
      }
    });
    const performanceBreakdown = {};
    Object.entries(categoryTotals).forEach(([key, total]) => {
      performanceBreakdown[key] = Math.round(total / categoryCount);
    });

    // Top performers
    const topPerformers = assessmentStats.scores
      .filter((r) => r.score != null)
      .sort((a, b) => Number(b.score) - Number(a.score))
      .slice(0, 5)
      .map((r) => {
        const member = teamMembers.find((m) => m.id === r.user_id);
        return {
          name: member
            ? `${member.first_name} ${member.last_name}`
            : "Unknown",
          role: member?.job_title || "Employee",
          score: Number(r.score),
          initials: member
            ? `${member.first_name[0]}${(member.last_name || "")[0] || ""}`
            : "?",
        };
      });

    res.json({
      teamSize: effectiveIds.length,
      avgOverallScore: assessmentStats.avgScore,
      completionRate: assessmentStats.completionRate,
      performanceBreakdown,
      topPerformers,
      teamMembers: teamMembers.map((m) => ({
        id: m.id,
        name: `${m.first_name} ${m.last_name}`,
        email: m.email,
        jobTitle: m.job_title,
        department: m.department,
      })),
    });
  } catch (error) {
    console.error("Team lead dashboard error:", error);
    res.status(500).json({ error: "Failed to fetch team dashboard" });
  }
});

/**
 * @route GET /api/teamlead/team
 * @desc Returns the team-lead to employee mapping for this lead
 */
router.get("/team", async (req, res) => {
  if (req.user.role !== "lead") {
    return res.status(403).json({ error: "Access denied. Not a team lead." });
  }

  try {
    const result = await pool.query(
      `SELECT u.id, u.first_name, u.last_name, u.email, u.job_title, u.department,
              (SELECT COUNT(*) FROM assessments WHERE user_id = u.id) AS assessment_count,
              (SELECT score FROM assessments WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1) AS latest_score
       FROM users u
       WHERE u.team_lead_id = $1
       ORDER BY u.first_name`,
      [req.user.id]
    );

    res.json({
      leadId: req.user.id,
      members: result.rows,
    });
  } catch (error) {
    console.error("Team mapping error:", error);
    res.status(500).json({ error: "Failed to fetch team mapping" });
  }
});

/**
 * @route PUT /api/teamlead/assign
 * @desc Assigns employees to this team lead (bulk)
 */
router.put("/assign", async (req, res) => {
  if (req.user.role !== "lead" && req.user.role !== "company") {
    return res.status(403).json({ error: "Access denied." });
  }

  const { employeeIds, leadId } = req.body;
  const targetLeadId = leadId || req.user.id;

  if (!Array.isArray(employeeIds) || employeeIds.length === 0) {
    return res.status(400).json({ error: "employeeIds array required" });
  }

  try {
    const result = await pool.query(
      `UPDATE users SET team_lead_id = $1
       WHERE id = ANY($2) AND role = 'employee'
       RETURNING id, first_name, last_name`,
      [targetLeadId, employeeIds]
    );

    res.json({
      assigned: result.rows.length,
      employees: result.rows,
    });
  } catch (error) {
    console.error("Team assignment error:", error);
    res.status(500).json({ error: "Failed to assign team members" });
  }
});

export default router;
