import express from "express";
import { signUp } from "../controller/signUp";
import { logIn } from "../controller/logIn";
import { logOut } from "../controller/logOut";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { createPost } from "../controller/createPost";
import { getPosts } from "../controller/getPosts";
import { authenticate } from "../controller/authenticate";
import { userBlogs } from "../controller/userBlogs";
import { editBlog } from "../controller/editBlog";
import { postComment } from "../controller/postComment";
import { getComment } from "../controller/getComment";
import { getUserPosts } from "../controller/getUserPosts";
import { deletePosts } from "../controller/deletePosts";


const router = express.Router();

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/logOut", logOut);
router.post("/createPost", isAuthenticated, createPost);
router.post("/postComment:id", isAuthenticated, postComment);
router.put("/editBlog:id", isAuthenticated, editBlog)
router.get("/checkAuth", isAuthenticated, authenticate);
router.get("/getPost", getPosts);
router.get("/myBlogs", isAuthenticated, userBlogs);
router.get("/getComments", isAuthenticated, getComment);
router.get("/getUserPosts", isAuthenticated, getUserPosts);
router.delete("/deletePost/:id", isAuthenticated, deletePosts);

export default router;