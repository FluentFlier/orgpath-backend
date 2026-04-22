import express from "express";
import { Pool } from "pg";
import { authMiddleware } from "../utils/authMiddleware.js";
import { config } from "../config.js";

const router = express.Router();
const pool = new Pool({ connectionString: config.dbUrl });

router.use(authMiddleware);

router.post("/", async (req, res) => {
  const client = await pool.connect();
  try {
    const { employee_id, status, performance_rating, potential_category, flight_risk, impact_of_loss, final_notes } = req.body;
    
    // Fallback manager ID if auth token is missing details
    const manager_id = req.user?.id || 1;

    await client.query('BEGIN');

    // 1. Force Create Table (No strict unique constraints that can break)
    await client.query(`
      CREATE TABLE IF NOT EXISTS evaluations (
        id SERIAL PRIMARY KEY,
        manager_id INTEGER,
        employee_id INTEGER,
        status VARCHAR(50),
        performance_rating INTEGER,
        potential_category VARCHAR(100),
        flight_risk VARCHAR(50),
        impact_of_loss VARCHAR(50),
        final_notes TEXT,
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // 2. Delete old evaluation for this employee to cleanly prevent duplicates
    await client.query('DELETE FROM evaluations WHERE employee_id = $1', [employee_id]);

    // 3. Insert new evaluation
    await client.query(`
      INSERT INTO evaluations 
        (manager_id, employee_id, status, performance_rating, potential_category, flight_risk, impact_of_loss, final_notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [manager_id, employee_id, status || 'Completed', performance_rating, potential_category, flight_risk, impact_of_loss, final_notes]);

    // 4. Update the actual Users table so the Dashboard cards change!
    await client.query(`
      UPDATE users 
      SET performance_rating = $1
      WHERE id = $2
    `, [performance_rating.toString(), employee_id]);

    await client.query('COMMIT');
    res.status(200).json({ message: "Evaluation saved successfully" });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Database Error:", error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

export default router;