import { configDotenv } from 'dotenv';
import { Pool } from 'pg';
import path from "path";

configDotenv({
    path: process.env.NODE_ENV === "production" ? path.resolve(__dirname, "../../.env.production") : path.resolve(__dirname, "../../.env")
});

export const isProd = process.env.NODE_ENV === "production";
console.log(isProd)

console.log("DATABASE_URL", process.env.DATABASE_URL);
console.log("NODE_ENV", process.env.NODE_ENV);

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ...(isProd && {
        ssl: {
            rejectUnauthorized: false
        }
    })
});

