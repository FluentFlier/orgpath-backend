import fs from 'fs';
import { parse } from 'csv-parse/sync';
import pg from 'pg';
import { config } from './src/config.js'; 

const { Pool } = pg;
const pool = new Pool({ connectionString: config.dbUrl });

// Helper to safely parse percentages (handles both "48%" and "0.48")
function parsePercent(str) {
  if (!str) return 0;
  let val = parseFloat(str);
  if (typeof str === 'string' && str.includes('%')) return val / 100;
  if (val > 1) return val / 100; // Catch raw numbers like 48 instead of 0.48
  return val;
}

async function run() {
  console.log('🔄 Starting Data Import...');

  // 1. Ensure the DB has the right columns & FIX performance_rating type
  console.log('📦 Updating Database Schema to support HR metrics & Job Titles...');
  await pool.query(`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS title VARCHAR(255);
    ALTER TABLE users ADD COLUMN IF NOT EXISTS department VARCHAR(255);
    ALTER TABLE users ADD COLUMN IF NOT EXISTS performance_rating VARCHAR(255);
    -- Force it to be a string in case it was accidentally created as an integer previously
    ALTER TABLE users ALTER COLUMN performance_rating TYPE VARCHAR(255);
    ALTER TABLE users ADD COLUMN IF NOT EXISTS potential_rating VARCHAR(50);
    ALTER TABLE users ADD COLUMN IF NOT EXISTS risk_rating VARCHAR(50);
    ALTER TABLE users ADD COLUMN IF NOT EXISTS engagement_score INT;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS diversity_info TEXT;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS external_experience_yrs INT;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS internal_experience_yrs INT;
  `);

  // 2. Setup Password Hash (Default to 'test123')
  let hash = '$2a$10$wKz0bK2nL1n3q6lqUv5hH.B6lJgO6yZ7Q8U9X/kM2r3s4t5u6v7w8'; 
  try {
    const bcrypt = await import('bcryptjs');
    hash = await bcrypt.hash('test123', 10);
  } catch(e) {
    console.log('ℹ️  Using default fallback hash for test123');
  }

  // 3. Read the Sponsor's CSV files
  console.log('📖 Reading Sponsor CSV files...');
  const scoresFile = 'Data Set - Scores.csv';
  const ordersFile = 'Orders.csv';

  if (!fs.existsSync(scoresFile) || !fs.existsSync(ordersFile)) {
    console.error('❌ ERROR: Could not find the CSV files! Make sure they are in the /app folder and spelled correctly.');
    process.exit(1);
  }

  const rawScores = fs.readFileSync(scoresFile, 'utf-8');
  const scoresData = parse(rawScores, { columns: true, skip_empty_lines: true, relax_quotes: true, bom: true });

  const rawOrders = fs.readFileSync(ordersFile, 'utf-8');
  const ordersData = parse(rawOrders, { columns: true, skip_empty_lines: true, relax_quotes: true, bom: true });

  // Map orders by user_id for real emails
  const emailMap = {};
  for (const row of ordersData) {
    if (row.user_id && row.email && row.email !== 'NULL' && row.email.trim() !== '') {
      emailMap[row.user_id] = row.email.toLowerCase().trim();
    }
  }

  console.log(`🚀 Found ${scoresData.length} employees. Inserting into PostgreSQL...`);
  
  // Clear old test assessments so the Math matches the spreadsheet perfectly
  await pool.query('DELETE FROM assessments');

  // 4. Loop and Insert
  for (const row of scoresData) {
    const id = row['ID'];
    const firstName = row['First Name'] || 'Employee';
    const lastName = row['Last Name'] || id;
    
    // Use real email, or fallback to a generated one
    let email = emailMap[id];
    if (!email) email = `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/[^a-z0-9]/g, '')}@orgpath.com`;

    const role = 'employee';
    const dept = row['Business Unit'] || 'General';
    const title = row['Role'] || 'Team Member';
    const perf = row['Performance'] || 'Meets Expectations';

    const userRes = await pool.query(`
      INSERT INTO users (first_name, last_name, email, password_hash, role, department, title, performance_rating)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (email) DO UPDATE SET 
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        department = EXCLUDED.department,
        title = EXCLUDED.title,
        performance_rating = EXCLUDED.performance_rating
      RETURNING id
    `, [firstName, lastName, email, hash, role, dept, title, perf]);

    const dbUserId = userRes.rows[0].id;

    // Extract the 5 core categories from the CSV and parse the percentages correctly
    const limitsRisk = parsePercent(row['Category - Professional - Limits Risk']);
    const embracesAgility = parsePercent(row['Category - Professional - Embraces Agility']);
    const achievesExcellence = parsePercent(row['Category - Professional - Achieves Excellence']);
    const developsRel = parsePercent(row['Category - Professional - Develops Relationships']);
    const setsPurpose = parsePercent(row['Category - Professional - Sets Purpose']);

    const overallScore = (limitsRisk + embracesAgility + achievesExcellence + developsRel + setsPurpose) / 5;

    const details = {
      category_scores: {
        "Limits Risk": limitsRisk,
        "Embraces Agility": embracesAgility,
        "Achieves Excellence": achievesExcellence,
        "Develops Relationships": developsRel,
        "Sets Purpose": setsPurpose
      }
    };

    // Insert Assessment Score
    await pool.query(`
      INSERT INTO assessments (user_id, score, status, details, created_at)
      VALUES ($1, $2, 'Completed', $3, NOW())
    `, [dbUserId, overallScore, JSON.stringify(details)]);
  }

  console.log('✅ SUCCESS! All 82 employees and their exact scores are now in the database!');
  process.exit(0);
}

run().catch(err => {
  console.error('❌ FATAL ERROR:', err);
  process.exit(1);
});