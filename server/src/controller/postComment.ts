import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
import prisma from "../middleware/prisma";

interface User {
    id: number
}

export const postComment = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const postId = Number(req.params.id);
    const userId = (req.user as User).id;
    const { comment } = req.body;

    const postComment = await prisma.comments.create({

        data: {
            comments: comment,
            post_id: postId,
            author_id: userId,
            parent_id: null,
            created_at: new Date()
        }
    });

    res.status(200).json({ message: "Your comment is posted." })
});