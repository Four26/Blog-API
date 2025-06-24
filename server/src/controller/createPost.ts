import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import prisma from "../middleware/prisma";

interface CreatePostBody {
    title: string;
    content: string;
    category: string;
    publish: boolean;
}

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

        const category_id = await prisma.category.findFirst({
            where: {
                name: category
            }
        });

        if (!category_id?.id) {
            res.status(400).json({ message: "Category not found." });
            return;
        }

        const newPost = await prisma.posts.create({
            data: {
                title,
                content,
                author_id,
                category_id: category_id?.id,
                status,
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        res.status(200).json({ message: "Your blog is successfully save!" });
    } catch (error) {
        console.error('error', error);
        res.status(500).json({ message: "Internal server error!" });
    }
});