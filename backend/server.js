import express from "express";
import cors from "cors";

import authRoutes from "./src/routes/auth.js";
import dashboardRoutes from "./src/routes/dashboard.js";
import assessmentRoutes from "./src/routes/assessment.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OrgPath API is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/assessment", assessmentRoutes);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


