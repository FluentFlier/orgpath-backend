import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import { config } from "../config.js";

const router = express.Router();
const pool = new Pool({ connectionString: config.dbUrl });

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: "All fields required" });
  try {
    const hash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1,$2,$3) RETURNING id, username, email`,
      [username, email, hash]
    );
    const user = result.rows[0];
    const token = jwt.sign(user, config.jwtSecret, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: "1h" });
  res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
});

export default router;
