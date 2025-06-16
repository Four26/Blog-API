import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";

const prisma = new PrismaClient();

interface User {
    id: number
}

export const getPosts = expressAsyncHandler(async (req: Request, res: Response) => {

    const getPosts = await prisma.posts.findMany({
        where: {
            status: "published"
        },
        include: {
            category: true,
            users: {
                select: {
                    firstname: true,
                    lastname: true
                }
            }
        },
        orderBy: {
            created_at: "desc"
        }
    });

    res.status(200).json(getPosts);
    return;
});

