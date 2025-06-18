import { configDotenv } from 'dotenv';
import { Pool } from 'pg';
configDotenv();

export const isProd = process.env.NODE_ENV === "production";

export const pool = new Pool({
    connectionString: isProd ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL
});

