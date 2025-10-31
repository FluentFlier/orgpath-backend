import express from "express";
import cors from "cors";
import { config } from "./src/config.js";
import authRoutes from "./src/routes/auth.js";
import assessmentRoutes from "./src/routes/assessment.js";
import dashboardRoutes from "./src/routes/dashboard.js";

const app = express();
app.use(cors({ origin: config.allowedOrigin, credentials: true }));
app.use(express.json());

app.get("/", (_, res) => res.send("OrgPath API is running 🚀"));

app.use("/api/auth", authRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(config.port, () =>
  console.log(`✅ OrgPath backend running on port ${config.port}`)
);
