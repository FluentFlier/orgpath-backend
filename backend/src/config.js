import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const config = {
  dbUrl: process.env.DATABASE_URL || "postgresql://orgpath:orgpath@db:5432/orgpath",
  jwtSecret: process.env.JWT_SECRET || "supersecretkey-change-in-production",
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8080,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
};
