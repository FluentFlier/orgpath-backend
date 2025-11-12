import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import { config } from "../config.js";

const router = express.Router();
const pool = new Pool({ connectionString: config.dbUrl });

// Function to determine role from referral code
function roleFromReferral(code) {
  if (!code) return "employee";
  const c = String(code).trim().charAt(0).toUpperCase();
  if (c === "A") return "employee";
  if (c === "B") return "lead";
  if (c === "C") return "company";
  return "employee";
}

// Function to sign a new JWT token
function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      referral_code: user.referral_code,
    },
    config.jwtSecret,
    { expiresIn: "1h" }
  );
}

// --- REAL REGISTER ENDPOINT ---
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, referralCode } = req.body;
    
    // 1. Validate input
    if (!firstName || !email || !password || !referralCode) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 2. Determine role and hash password
    const role = roleFromReferral(referralCode);
    const hash = await bcrypt.hash(password, 12);
    const username = email.toLowerCase(); // Use email as username

    // 3. Insert user into database
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, username, email, password_hash, referral_code, role)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, first_name, last_name, email, referral_code, role`,
      [firstName, lastName, username, email, hash, referralCode, role]
    );

    // 4. Sign and return token
    const user = result.rows[0];
    const token = signToken(user);
    res.status(201).json({ token, user });

  } catch (e) {
    if (String(e.message).includes("duplicate key")) {
      return res.status(409).json({ error: "User already exists" });
    }
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// --- REAL LOGIN ENDPOINT ---
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body; // 'identifier' can be email or username
    if (!identifier || !password)
      return res.status(400).json({ error: "Missing credentials" });

    // 1. Find user by email or username
    const userQuery = await pool.query(
      "SELECT * FROM users WHERE email=$1 OR username=$1 LIMIT 1",
      [identifier.toLowerCase()]
    );
    const user = userQuery.rows[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // 2. Check password
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    // 3. Sign and return token
    const token = signToken(user);
    const safeUser = { // Don't send password hash back
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      referral_code: user.referral_code,
      role: user.role,
    };
    res.json({ token, user: safeUser });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// --- GET /ME ENDPOINT ---
router.get("/me", (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;