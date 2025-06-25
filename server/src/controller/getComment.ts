import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import prisma from "../middleware/prisma";
import { pool } from "../db/db";


export const getComment = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const postId = req.query.id;

    const fetchComment = await pool.query(`SELECT 
                                comments.*,
                                users.firstname,
                                users.lastname,
                                comments.id AS comment_id
                                FROM comments 
                                JOIN users ON comments.author_id = users.id
                                WHERE comments.post_id = $1
                                ORDER BY comments.created_at DESC
            `, [postId]);

    res.status(200).json(fetchComment);
});