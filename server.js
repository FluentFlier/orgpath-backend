import express from "express";
import cors from "cors";

// We don't need the config file in server.js
// import { config } from "./src/config.js"; 

import authRoutes from "./src/routes/auth.js";
import dashboardRoutes from "./src/routes/dashboard.js";
import assessmentRoutes from "./src/routes/assessment.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Use a simple, open cors() for development
app.use(cors()); 
app.use(express.json());

// This serves files (like index.html) from the 'frontend' folder
app.use(express.static("frontend"));

// This root route is fine, but will only be hit if
// 'index.html' isn't found in the frontend folder.
app.get("/", (req, res) => {
  res.send("OrgPath API is running 🚀");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/assessment", assessmentRoutes);

// Use the PORT variable we defined above
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));