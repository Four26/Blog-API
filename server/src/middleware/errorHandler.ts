import { Request, Response, NextFunction } from "express"


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const errStack = err.stack || "No stack trace available";
    const errMessage = err.message || "Unknown error";

    res.status(500).json({
        message: errMessage,
        stack: errStack
    })
}