import express from "express";
import cors from "cors";
import { Pool } from "pg";
import { config } from "./src/config.js";

import authRoutes from "./src/routes/auth.js";
import dashboardRoutes from "./src/routes/dashboard.js";
import assessmentRoutes from "./src/routes/assessment.js";
import teamleadRoutes from "./src/routes/teamlead.js";
import companyRoutes from "./src/routes/company.js";
import evaluationRoutes from "./src/routes/evaluation.js"; // <-- NEW IMPORT

const app = express();
const PORT = process.env.PORT || 8080;
const pool = new Pool({ connectionString: config.dbUrl });

app.use(cors());
app.use(express.json());

// This serves files (like index.html) from the 'frontend' folder
app.use(express.static("frontend"));

app.get("/", (_, res) => res.send("OrgPath API is running 🚀"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/teamlead", teamleadRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/evaluation", evaluationRoutes); // <-- REGISTER NEW ROUTE

// --- Fetch ALL real employees for the directory ---
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, first_name, last_name, email, role, department, title, performance_rating 
      FROM users 
      WHERE role = 'employee'
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// --- Fetch a single user by ID for the Member Detail View ---
app.get("/api/users/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, first_name, last_name, email, role, department, title, performance_rating 
       FROM users 
       WHERE id = $1`, 
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));