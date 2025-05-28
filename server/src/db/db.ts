import { Pool } from 'pg';


export const pool = new Pool({
    connectionString: 'postgresql://postgres:root_0926@localhost:5432/blog_db'
});

