import express from "express";
import { signUp } from "../controller/signUp";
import { logIn } from "../controller/logIn";


const router = express.Router();

router.post("/signUp", signUp);
router.post("/logIn", logIn);

export default router;