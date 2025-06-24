import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import prisma from "../middleware/prisma";


export const deletePosts = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const postId = Number(req.params.id);
    const deletePost = await prisma.posts.delete({ where: { id: postId } })
    res.status(200).json({ message: "Blog is successfully deleted!" });
});