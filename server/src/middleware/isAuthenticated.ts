import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";

export const isAuthenticated = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: "User not authenticated!" });
        return;
    }
    next();
});