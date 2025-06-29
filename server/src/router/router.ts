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
import { googleLogIn, googleLogInCallback, googleSignUp } from "../controller/googleAuth";
import { jwtAuth } from "../middleware/jwtAuth";


const router = express.Router();

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/logOut", logOut);
router.post("/createPost", jwtAuth, createPost);
router.post("/postComment:id", jwtAuth, postComment);

router.put("/editBlog:id", jwtAuth, editBlog);

router.get("/checkAuth", jwtAuth, authenticate);
router.get("/getPost", getPosts);
router.get("/myBlogs", jwtAuth, userBlogs);
router.get("/getComments", jwtAuth, getComment);
router.get("/getUserPosts", jwtAuth, getUserPosts);
router.get("/auth/google/logIn", googleLogIn);
router.get("/auth/google/signUp", googleSignUp);
router.get("/auth/google/callback", googleLogInCallback);


router.delete("/deletePost/:id", jwtAuth, deletePosts);

export default router;