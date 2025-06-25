import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import prisma from "../middleware/prisma";
import { pool } from "../db/db";


export const deletePosts = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const postId = Number(req.params.id);
    const deletePost = await pool.query(`DELETE FROM posts WHERE id = $1`, [postId]);
    res.status(200).json({ message: "Blog is successfully deleted!" });
});