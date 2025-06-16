import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";

const prisma = new PrismaClient();

interface User {
    id: number
}

export const getUserPosts = expressAsyncHandler(async (req: Request, res: Response) => {

    const userId = (req.user as User).id;

    const getPost = await prisma.posts.findMany({
        where: {
            author_id: userId
        }
    });

    res.status(200).json(getPost);
    return;
});
