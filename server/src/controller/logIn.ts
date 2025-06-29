import bcryptjs from "bcryptjs";
import passport from "passport";
import { pool } from "../db/db";
import { NextFunction, Request, Response } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET;

interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    created_at: Date;
    admin: boolean
}

passport.use(new LocalStrategy(async (username: string, password: string, done: any) => {
    try {

        const checkUser = await pool.query(`SELECT id, username, password FROM users WHERE username = $1`, [username]);
        if (!checkUser.rows.length) {
            return done(null, false, { message: "User not found! Please sign up first!" });
        }

        const passwordMatch = await bcryptjs.compare(password, checkUser.rows[0].password);

        if (!passwordMatch) return done(null, false, { message: "Incorrect password" });

        return done(null, checkUser.rows[0]);
    } catch (error) {
        return done(error);
    }
}));

export const logIn = (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate("local", (err: any, user: User, info: any) => {

        if (err) return res.status(500).json({ error: err.message });

        if (!user) return res.status(401).json({ message: info.message || "Unauthorized" });

        if (!jwtSecret) {
            console.error("JWT_SECRET is missing from environment variables!");
            return res.status(500).json({ message: "JWT secret is not defined!" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ message: 'Successfully logged in!', user: user.username });
    })(req, res, next);
};