import { configDotenv } from 'dotenv';
import { Pool } from 'pg';
import path from "path";

configDotenv({
    path: process.env.NODE_ENV === "production" ? path.resolve(__dirname, "../.env.production") : path.resolve(__dirname, "../.env")
});

export const isProd = process.env.NODE_ENV === "production";

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

