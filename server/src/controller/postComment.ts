import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import prisma from "../middleware/prisma";
import { pool } from "../db/db";

interface User {
    id: number
}

export const postComment = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const postId = Number(req.params.id);
    const userId = (req.user as User).id;
    const { comment } = req.body;

    const postComment = await pool.query(`INSERT INTO comments (comments, post_id, author_id, parent_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6`, [comment, postId, userId, null, new Date(), new Date()]);

    res.status(200).json({ message: "Your comment is posted." })
});