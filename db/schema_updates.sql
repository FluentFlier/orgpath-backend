-- Migration: Add Risk/Succession Planning Tables
-- Date: Jan 2026

-- 1. Add Risk & Potential columns to the users table
ALTER TABLE users 
ADD COLUMN performance_rating INT DEFAULT 0,
ADD COLUMN potential_rating VARCHAR(50),
ADD COLUMN flight_risk VARCHAR(50),
ADD COLUMN impact_of_loss VARCHAR(50);

-- 2. Create the Succession Plans table
CREATE TABLE succession_plans (
    id SERIAL PRIMARY KEY,
    incumbent_user_id INT, 
    successor_user_id INT, 
    readiness_level VARCHAR(50), 
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);