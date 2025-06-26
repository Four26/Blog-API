import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { pool } from "../db/db";

interface User {
    id: number
}

export const userBlogs = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {

    const userId = (req.user as User).id;

    const getUserBlogs = await pool.query("SELECT posts.*, category.name AS category_name FROM posts JOIN category ON posts.category_id = category.id WHERE posts.author_id = $1", [userId])

    res.status(200).json(getUserBlogs.rows);
});