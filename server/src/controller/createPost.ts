import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { pool } from "../db/db";


interface User {
    id: number
}

export const createPost = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const author_id = (req.user as User).id;
        const { title, content, category, publish } = req.body;

        if (!title || !content || !category || publish === undefined) {
            res.status(400).json({ message: "Please fill all the fields!" });
            return
        }

        const status = publish === false ? "draft" : "published";

        const category_id = await pool.query(`SELECT * FROM category WHERE name = $1`, [category]);

        if (!category_id.rows[0].id) {
            res.status(400).json({ message: "Category not found." });
            return;
        }

        const newPost = await pool.query(`INSERT INTO posts (title, content, author_id, category_id, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [title, content, author_id, category_id.rows[0].id, status, new Date(), new Date()]);

        res.status(200).json({ message: "Your blog is successfully save!" });
    } catch (error) {
        console.error('error', error);
        res.status(500).json({ message: "Internal server error!" });
    }
});