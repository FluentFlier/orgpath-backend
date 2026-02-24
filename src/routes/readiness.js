import express from "express";
import pool from "../../db/db.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

/**
 * @route GET /api/readiness/report
 * @desc Returns employee readiness report - aggregated assessment data
 *       Accessible by team leads (their team) and company managers (all employees)
 */
router.get("/report", async (req, res) => {
  const { role } = req.user;

  if (role !== "lead" && role !== "company") {
    return res
      .status(403)
      .json({ error: "Access denied. Leads and company managers only." });
  }

  try {
    let employeeFilter = "";
    let params = [];

    if (role === "lead") {
      // Team leads see only their assigned employees
      employeeFilter = `WHERE u.team_lead_id = $1 OR (
        u.department = (SELECT department FROM users WHERE id = $1)
        AND u.role = 'employee'
      )`;
      params = [req.user.id];
    } else {
      // Company managers see everyone
      employeeFilter = `WHERE u.role = 'employee'`;
    }

    const query = `
      SELECT
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.job_title,
        u.department,
        u.created_at AS hire_date,
        latest.score AS latest_score,
        latest.category_scores,
        latest.status AS assessment_status,
        latest.created_at AS last_assessed,
        agg.assessment_count,
        agg.avg_score,
        agg.min_score,
        agg.max_score,
        CASE
          WHEN latest.score IS NULL THEN 'not_assessed'
          WHEN latest.score >= 80 THEN 'ready'
          WHEN latest.score >= 60 THEN 'developing'
          ELSE 'needs_support'
        END AS readiness_level
      FROM users u
      LEFT JOIN LATERAL (
        SELECT score, category_scores, status, created_at
        FROM assessments
        WHERE user_id = u.id
        ORDER BY created_at DESC
        LIMIT 1
      ) latest ON true
      LEFT JOIN LATERAL (
        SELECT
          COUNT(*)::int AS assessment_count,
          ROUND(AVG(score)) AS avg_score,
          MIN(score) AS min_score,
          MAX(score) AS max_score
        FROM assessments
        WHERE user_id = u.id AND status = 'completed'
      ) agg ON true
      ${employeeFilter}
      ORDER BY u.department, u.first_name
    `;

    const { rows } = await pool.query(query, params);

    // Summary statistics
    const total = rows.length;
    const assessed = rows.filter((r) => r.latest_score != null).length;
    const ready = rows.filter((r) => r.readiness_level === "ready").length;
    const developing = rows.filter(
      (r) => r.readiness_level === "developing"
    ).length;
    const needsSupport = rows.filter(
      (r) => r.readiness_level === "needs_support"
    ).length;
    const notAssessed = rows.filter(
      (r) => r.readiness_level === "not_assessed"
    ).length;

    const scores = rows
      .filter((r) => r.latest_score != null)
      .map((r) => Number(r.latest_score));
    const avgScore =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;

    // Group by department
    const byDepartment = {};
    rows.forEach((r) => {
      const dept = r.department || "Unassigned";
      if (!byDepartment[dept]) {
        byDepartment[dept] = { employees: [], readyCount: 0, total: 0 };
      }
      byDepartment[dept].employees.push(r);
      byDepartment[dept].total++;
      if (r.readiness_level === "ready") byDepartment[dept].readyCount++;
    });

    res.json({
      summary: {
        totalEmployees: total,
        assessed,
        avgScore,
        readinessBreakdown: {
          ready,
          developing,
          needsSupport,
          notAssessed,
        },
      },
      byDepartment,
      employees: rows,
    });
  } catch (error) {
    console.error("Readiness report error:", error);
    res.status(500).json({ error: "Failed to generate readiness report" });
  }
});

/**
 * @route GET /api/readiness/employee/:id
 * @desc Returns detailed readiness data for a single employee
 */
router.get("/employee/:id", async (req, res) => {
  const { role } = req.user;
  const employeeId = parseInt(req.params.id);

  if (role !== "lead" && role !== "company") {
    return res.status(403).json({ error: "Access denied." });
  }

  try {
    // Get employee details
    const userResult = await pool.query(
      `SELECT id, first_name, last_name, email, job_title, department, created_at
       FROM users WHERE id = $1 AND role = 'employee'`,
      [employeeId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Get all assessments for this employee
    const assessments = await pool.query(
      `SELECT id, score, category_scores, status, created_at
       FROM assessments
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [employeeId]
    );

    const employee = userResult.rows[0];
    const scores = assessments.rows
      .filter((a) => a.score != null)
      .map((a) => Number(a.score));

    const latestScore = scores[0] || null;
    let readinessLevel = "not_assessed";
    if (latestScore >= 80) readinessLevel = "ready";
    else if (latestScore >= 60) readinessLevel = "developing";
    else if (latestScore != null) readinessLevel = "needs_support";

    // Score trend (last 5 assessments)
    const trend = assessments.rows
      .slice(0, 5)
      .reverse()
      .map((a) => ({
        score: Number(a.score),
        date: a.created_at,
      }));

    res.json({
      employee,
      readinessLevel,
      latestScore,
      avgScore:
        scores.length > 0
          ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
          : null,
      assessmentCount: assessments.rows.length,
      trend,
      assessments: assessments.rows,
    });
  } catch (error) {
    console.error("Employee readiness error:", error);
    res.status(500).json({ error: "Failed to fetch employee readiness" });
  }
});

export default router;
