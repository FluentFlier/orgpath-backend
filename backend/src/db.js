import { Pool } from "pg";
import { config } from "./config.js";

/**
 * Shared PostgreSQL connection pool
 * Using a single pool instance across all routes for better resource management
 */
const pool = new Pool({
  connectionString: config.dbUrl,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err);
});

export default pool;
