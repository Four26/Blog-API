import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";

export const logOut = expressAsyncHandler((req: Request, res: Response) => {
    req.logOut(() => {
        req.session.destroy((error) => {
            res.clearCookie("connect.sid");
            if (error) {
                return res.status(500).json({ error: error.message })
            }
            res.status(200).json({ message: "Successfully logged out!" });
            return;
        })
    })
});