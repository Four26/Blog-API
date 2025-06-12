import express from "express";
import { signUp } from "../controller/signUp";
import { logIn } from "../controller/logIn";
import { logOut } from "../controller/logOut";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { createPost } from "../controller/createPost";
import { getPosts } from "../controller/getPosts";
import { authenticate } from "../controller/authenticate";
import { userBlogs } from "../controller/userBlogs";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/logOut", logOut);
router.post("/createPost", isAuthenticated, createPost);
router.get("/checkAuth", isAuthenticated, authenticate);
router.get("/getPost", getPosts);
router.get("/myBlogs", isAuthenticated, userBlogs);


export default router;