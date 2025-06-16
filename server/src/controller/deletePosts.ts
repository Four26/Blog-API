import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";

const prisma = new PrismaClient();

export const deletePosts = expressAsyncHandler(async (req: Request, res: Response) => {
    const postId = Number(req.params.id);
    console.log(postId);

    const deletePost = await prisma.posts.delete({ where: { id: postId } })

    res.status(200).json({ message: "Blog is successfully deleted!" });
    return;
});