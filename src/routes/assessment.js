import express from "express";
import { Pool } from "pg";
import { authMiddleware } from "../utils/authMiddleware.js";
import { config } from "../config.js";

const router = express.Router();
const pool = new Pool({ connectionString: config.dbUrl });

// Protect all routes with authentication
router.use(authMiddleware);

// --- EXISTING ROUTES ---

// 1. Save a standard survey/assessment
router.post("/", async (req, res) => {
  const { responses, score } = req.body;
  const userId = req.user.id;
  
  try {
    const result = await pool.query(
      `INSERT INTO assessments (user_id, responses, score)
       VALUES ($1, $2, $3) RETURNING *`,
      [userId, responses, score]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error saving assessment:", error);
    res.status(500).json({ error: "Server error saving assessment" });
  }
});

// 2. Get past assessments
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM assessments WHERE user_id=$1`, [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching assessments:", error);
    res.status(500).json({ error: "Server error fetching assessments" });
  }
});

// --- NEW ROUTE: RISK & SUCCESSION PLANNING ---
// This fulfills the sponsor's request to "Collect Risk, Potential, and Readiness Ratings"

router.post("/risk-succession", async (req, res) => {
  // We use a specific client to handle Transactions (BEGIN/COMMIT)
  const client = await pool.connect();
  
  try {
    const { 
        target_user_id,     // The ID of the employee being evaluated
        performance_rating, // Integer (1-5)
        potential_rating,   // String (e.g. "High Potential")
        flight_risk,        // String (e.g. "High", "Low")
        impact_of_loss,     // String (e.g. "Critical")
        successors          // Array: [{ successor_id: 10, readiness: 'Ready Now' }]
    } = req.body;

    // Start Transaction
    await client.query('BEGIN');

    // 1. Update the Employee's Main Metrics (Risk, Performance, Potential)
    const updateUserQuery = `
        UPDATE users 
        SET performance_rating = $1, 
            potential_rating = $2, 
            flight_risk = $3, 
            impact_of_loss = $4
        WHERE id = $5
    `;
    await client.query(updateUserQuery, [
        performance_rating, 
        potential_rating, 
        flight_risk, 
        impact_of_loss, 
        target_user_id
    ]);

    // 2. Handle Succession Planning
    // First, clear old successors for this person to avoid duplicates
    await client.query(
        `DELETE FROM succession_plans WHERE incumbent_user_id = $1`, 
        [target_user_id]
    );

    // Then, insert the new successors
    if (successors && successors.length > 0) {
        const insertSuccessorQuery = `
            INSERT INTO succession_plans 
            (incumbent_user_id, successor_user_id, readiness_level)
            VALUES ($1, $2, $3)
        `;

        for (const successor of successors) {
            await client.query(insertSuccessorQuery, [
                target_user_id, 
                successor.successor_id, 
                successor.readiness
            ]);
        }
    }

    // Commit changes
    await client.query('COMMIT');
    res.status(200).json({ message: "Risk and Succession data saved successfully." });

  } catch (error) {
    // If error, undo changes
    await client.query('ROLLBACK');
    console.error("Error saving succession data:", error);
    res.status(500).json({ error: "Server error processing succession data" });
  } finally {
    client.release();
  }
});

export default router;