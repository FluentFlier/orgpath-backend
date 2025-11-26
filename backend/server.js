import express from "express";
import cors from "cors";
import { config } from "./src/config.js";

import authRoutes from "./src/routes/auth.js";
import dashboardRoutes from "./src/routes/dashboard.js";
import assessmentRoutes from "./src/routes/assessment.js";

const app = express();

// CORS Configuration - restrict to specific origins
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = config.corsOrigin.split(',').map(o => o.trim());

    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin) || config.nodeEnv === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OrgPath API is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/assessment", assessmentRoutes);

app.listen(config.port, () => console.log(`✅ Server running on port ${config.port}`));


