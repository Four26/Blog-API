import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

interface User {
    username: string
}

export const authenticate = async (req: Request, res: Response) => {
    const username = (req.user as User).username
    res.status(200).json(username);
    return;
}
