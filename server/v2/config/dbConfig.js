import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  process.stdout.write(' + Connected to Postgress database...');
});

export default pool;
