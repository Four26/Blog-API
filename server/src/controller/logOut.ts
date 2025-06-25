import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";

export const logOut = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    req.logOut(() => {
        req.session.destroy((error) => {
            if (error) {
                return res.status(500).json({ error: error.message })
            }

            res.clearCookie("connect.sid", {
                path: "/",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // HTTPS in production
                sameSite: "strict", // Prevent CSRF
            });

            return res.status(200).json({ message: "Successfully logged out!" });
        })
    });
});