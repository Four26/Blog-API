import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import prisma from "../middleware/prisma";
import { pool } from "../db/db";


interface User {
    id: number
}

export const getPosts = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {

    const getPosts = await pool.query(` SELECT 
            posts.*, 
            category.name AS category_name, 
            users.firstname, 
            users.lastname
        FROM posts
        JOIN category ON posts.category_id = category.id
        JOIN users ON posts.author_id = users.id
        WHERE posts.status = 'published'
        ORDER BY posts.created_at DESC`);

    res.status(200).json(getPosts);
});

