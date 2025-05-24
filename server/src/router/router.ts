import express from "express";
import { signUp } from "../controller/signUp";

const router = express.Router();

router.post("/signUp", signUp);

export default router;