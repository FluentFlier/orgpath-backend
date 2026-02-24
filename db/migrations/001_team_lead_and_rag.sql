-- Migration: Add team-lead mapping and RAG support
-- Run this against an existing database:
--   docker exec -i orgpath-db psql -U orgpath -d orgpath < db/migrations/001_team_lead_and_rag.sql

-- Add team_lead_id column to users
ALTER TABLE users ADD COLUMN IF NOT EXISTS team_lead_id INT REFERENCES users(id);

-- Document chunks table for RAG
CREATE TABLE IF NOT EXISTS document_chunks (
  id SERIAL PRIMARY KEY,
  document_id INT REFERENCES documents(id) ON DELETE CASCADE,
  chunk_index INT NOT NULL,
  content TEXT NOT NULL,
  token_count INT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_users_team_lead ON users(team_lead_id);
CREATE INDEX IF NOT EXISTS idx_users_department ON users(department);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_assessments_user ON assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_document_chunks_doc ON document_chunks(document_id);
