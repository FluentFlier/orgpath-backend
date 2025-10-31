import express from "express";
import { Pool } from "pg";
import { authMiddleware } from "../utils/authMiddleware.js";
import { config } from "../config.js";

const router = express.Router();
const pool = new Pool({ connectionString: config.dbUrl });

router.use(authMiddleware);

router.post("/", async (req, res) => {
  const { responses, score } = req.body;
  const userId = req.user.id;
  const result = await pool.query(
    `INSERT INTO assessments (user_id, responses, score)
     VALUES ($1, $2, $3) RETURNING *`,
    [userId, responses, score]
  );
  res.json(result.rows[0]);
});

router.get("/", async (req, res) => {
  const result = await pool.query(`SELECT * FROM assessments WHERE user_id=$1`, [req.user.id]);
  res.json(result.rows);
});

export default router;
