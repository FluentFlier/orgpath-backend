import express from "express";
import { Pool } from "pg";
import { authMiddleware } from "../utils/authMiddleware.js";
import { config } from "../config.js";

const router = express.Router();
const pool = new Pool({ connectionString: config.dbUrl });

router.use(authMiddleware);

router.get("/", async (req, res) => {
  const data = await pool.query(`SELECT * FROM dashboards WHERE user_id=$1`, [req.user.id]);
  res.json(data.rows);
});

export default router;
