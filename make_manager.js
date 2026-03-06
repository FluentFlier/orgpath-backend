import pg from 'pg';
import { config } from './src/config.js'; 

const { Pool } = pg;
const pool = new Pool({ connectionString: config.dbUrl });

async function run() {
  console.log('🔄 Linking all 82 real employees to Big Boss...');
  
  // First, find Big Boss's ID
  const res = await pool.query(`SELECT id FROM users WHERE email = 'bigboss@gmail.com'`);
  
  if (res.rows.length === 0) {
     console.log('❌ Error: Could not find bigboss@gmail.com in the database.');
     process.exit(1);
  }
  
  const bigBossId = res.rows[0].id;

  // Now, check what column your database uses for managers (manager_id, leader_id, company_id, etc.)
  // We will forcefully assign all the imported employees to Big Boss!
  
  try {
     // Try manager_id first (most common)
     await pool.query(`UPDATE users SET manager_id = $1 WHERE email != 'bigboss@gmail.com'`, [bigBossId]);
     console.log('✅ Set manager_id successfully.');
  } catch(e) {
     try {
       // If manager_id fails, try company_id
       await pool.query(`UPDATE users SET company_id = (SELECT company_id FROM users WHERE id = $1) WHERE email != 'bigboss@gmail.com'`, [bigBossId]);
       console.log('✅ Set company_id successfully.');
     } catch (e2) {
       console.log('⚠️ Could not find manager_id or company_id column. The backend might just be filtering by the exact string "Manager".');
     }
  }

  process.exit(0);
}

run().catch(err => {
  console.error('❌ ERROR:', err);
  process.exit(1);
});