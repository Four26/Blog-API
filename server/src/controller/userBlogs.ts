import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
import prisma from "../middleware/prisma";

interface User {
    id: number
}

export const userBlogs = expressAsyncHandler(async (req: Request, res: Response) => {

    const userId = (req.user as User).id;

    const getUserBlogs = await prisma.posts.findMany({
        where: {
            author_id: userId
        },
        include: {
            category: {
                select: {
                    name: true
                }
            }
        }
    });

    res.status(200).json(getUserBlogs);
});