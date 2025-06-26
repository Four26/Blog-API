import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { pool } from "../db/db";

interface User {
    id: number
}

export const editBlog = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = (req.user as User).id;
    const { title, content, category, publish } = req.body

    const status = publish === false ? "draft" : "published";

    const category_id = await pool.query(`SELECT * FROM category WHERE name = $1`, [category]);

    const updatePosts = await pool.query(
        `UPDATE posts
            SET title = $1,
                content = $2,
                author_id = $3,
                category_id = $4,
                status = $5,
                updated_at = $6
            WHERE id = $7`,
        [title, content, userId, category_id.rows[0].id, status, new Date(), Number(req.params.id)]
    );

    res.status(200).json({ message: "Your blog is successfully save!" });
});