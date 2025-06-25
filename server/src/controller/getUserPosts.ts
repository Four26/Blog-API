import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import prisma from "../middleware/prisma";
import { pool } from "../db/db";


interface User {
    id: number
}

export const getUserPosts = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {

    const userId = (req.user as User).id;

    const getPost = await pool.query(`SELECT * FROM posts WHERE author_id = $1`, [userId]);
    res.status(200).json(getPost);
});
