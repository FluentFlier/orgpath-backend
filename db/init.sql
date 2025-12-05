-- 1. USERS TABLE
-- Merges concepts from legacy 'admin_users' and 'invited_users'
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name    TEXT NOT NULL,
  last_name     TEXT,
  username      TEXT UNIQUE,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  
  -- Role Management (A/B/C codes)
  referral_code TEXT,
  role          TEXT NOT NULL DEFAULT 'employee', -- 'employee', 'lead', 'company'
  
  -- Extra fields found in the sponsor's legacy database
  phone         TEXT,
  job_title     TEXT,
  department    TEXT,
  
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ASSESSMENTS TABLE
-- Captures data from legacy 'scores' table but uses modern JSONB
CREATE TABLE IF NOT EXISTS assessments (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  
  -- The raw answers (Question 1: Answer A)
  responses JSONB, 
  
  -- The calculated breakdown (Agility: 80%, Risk: 70%)
  -- This replaces their massive 50-column 'scores' table
  category_scores JSONB, 
  
  -- The final overall score
  score NUMERIC,
  
  status TEXT DEFAULT 'completed', -- 'in_progress', 'completed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DASHBOARDS TABLE
-- Caches analytics for fast loading
CREATE TABLE IF NOT EXISTS dashboards (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. INGESTION JOBS
-- Tracks the status of file uploads and processing
CREATE TABLE IF NOT EXISTS ingestion_jobs (
  id SERIAL PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Path to local file or S3 key
  file_type TEXT NOT NULL, -- 'csv', 'pdf', 'docx', etc.
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  uploaded_by INT REFERENCES users(id),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DOCUMENTS
-- Stores unstructured content extracted from files (for RAG/Search)
CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  ingestion_job_id INT REFERENCES ingestion_jobs(id),
  title TEXT,
  content TEXT, -- Extracted text content
  metadata JSONB, -- Extra metadata (page count, author, etc.)
  created_at TIMESTAMPTZ DEFAULT NOW()
);