import express from "express";
import { Request, Response } from "express";
import { signUp } from "../controller/signUp";
import { logIn } from "../controller/logIn";
import { logOut } from "../controller/logOut";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { createPost } from "../controller/createPost";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/logOut", logOut);
router.post("/createPost", isAuthenticated, createPost);
router.get("/checkAuth", isAuthenticated, (req: Request, res: Response) => {
    res.status(200).json({ message: "User is authenticated!" });
    return;
});

export default router;