CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name    TEXT NOT NULL,
  last_name     TEXT,
  username      TEXT UNIQUE,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  referral_code TEXT,
  role          TEXT NOT NULL DEFAULT 'employee',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assessments (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  responses JSONB,
  score NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dashboards (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
