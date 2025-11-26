import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import { config } from "../config.js";

const router = express.Router();

/**
 * Validates email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 * Minimum 8 characters, at least one letter and one number
 */
function isValidPassword(password) {
  if (!password || password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" };
  }
  if (!/[a-zA-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one letter" };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" };
  }
  return { valid: true };
}

/**
 * Determines user role from referral code
 */
function roleFromReferral(code) {
  if (!code) return "employee";
  const c = String(code).trim().charAt(0).toUpperCase();
  if (c === "A") return "employee";
  if (c === "B") return "lead";
  if (c === "C") return "company";
  return "employee";
}

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

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 */
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, referralCode } = req.body;

    // Validate required fields
    if (!firstName || !email || !password || !referralCode) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: firstName, email, password, and referralCode are required"
      });
    }

    // Validate firstName
    if (firstName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: "First name must be at least 2 characters long"
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format"
      });
    }

    // Validate password strength
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        error: passwordValidation.message
      });
    }

    // Validate referral code
    if (!referralCode || referralCode.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Referral code is required"
      });
    }

    const role = roleFromReferral(referralCode);
    const hash = await bcrypt.hash(password, 12);
    const username = email.toLowerCase().trim();
    const cleanEmail = email.toLowerCase().trim();

    const result = await pool.query(
      `INSERT INTO users (first_name,last_name,username,email,password_hash,referral_code,role)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING id,first_name,last_name,email,referral_code,role`,
      [firstName.trim(), lastName?.trim() || null, username, cleanEmail, hash, referralCode.trim(), role]
    );

    const user = result.rows[0];
    const token = signToken(user);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user
    });
  } catch (e) {
    if (String(e.message).includes("duplicate key")) {
      return res.status(409).json({
        success: false,
        error: "An account with this email already exists"
      });
    }
    console.error("Registration error:", e);
    res.status(500).json({
      success: false,
      error: "Server error during registration"
    });
  }
});

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 */
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Validate input
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        error: "Email/username and password are required"
      });
    }

    if (typeof identifier !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        error: "Invalid input format"
      });
    }

    const userQuery = await pool.query(
      "SELECT * FROM users WHERE email=$1 OR username=$1 LIMIT 1",
      [identifier.toLowerCase().trim()]
    );

    const user = userQuery.rows[0];
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    const token = signToken(user);
    const safeUser = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      referral_code: user.referral_code,
      role: user.role,
    };

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: safeUser
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      error: "Server error during login"
    });
  }
});

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
