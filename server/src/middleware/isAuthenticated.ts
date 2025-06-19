import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";

export const isAuthenticated = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: "User not authenticated!" });
        return;
    }
    res.status(200).json({ isAuthenticated: true, username: (req.user as any).username });
    next();
});