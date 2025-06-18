import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";
import prisma from "../middleware/prisma";


export const getComment = expressAsyncHandler(async (req: Request, res: Response) => {
    const postId = req.query.id;

    const fetchComment = await prisma.comments.findMany({
        where: {
            post_id: Number(postId)
        },
        include: {
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

    res.status(200).json(fetchComment);
    return;
});