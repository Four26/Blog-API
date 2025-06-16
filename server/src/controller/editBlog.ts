import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";

const prisma = new PrismaClient();
interface User {
    id: number
}

export const editBlog = expressAsyncHandler(async (req: Request, res: Response) => {
    const userId = (req.user as User).id;
    const { title, content, category, publish } = req.body

    const status = publish === false ? "draft" : "published";

    const category_id = await prisma.category.findFirst({
        where: {
            name: category
        }
    });

    const updatePost = await prisma.posts.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            title: title,
            content: content,
            author_id: userId,
            category_id: category_id?.id,
            status: status,
            updated_at: new Date()
        }
    });

    res.status(200).json({ message: "Your blog is successfully save!" });
    return;
});