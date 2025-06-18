import { configDotenv } from 'dotenv';
import { Pool } from 'pg';
import path from "path";
configDotenv();


configDotenv({
    path: process.env.NODE_ENV === "production" ? path.resolve(__dirname, "../.env.production") : path.resolve(__dirname, "../.env")
});

if (process.env.NODE_ENV === "production" && process.env.DATABASE_URL_PROD) {
    process.env.DATABASE_URL = process.env.DATABASE_URL_PROD;
}

export const isProd = process.env.NODE_ENV === "production";

export const pool = new Pool({
    connectionString: isProd ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL
});

