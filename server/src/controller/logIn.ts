import bcryptjs from "bcryptjs";
import passport from "passport";
import { pool } from "../db/db";
import { Request, Response } from "express";
import { Strategy as LocalStrategy } from "passport-local"
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";

dotenv.config();

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

        if (!passwordMatch) {
            return done(null, false, { message: "Incorrect password" });
        }

        return done(null, checkUser.rows[0]);
    } catch (error) {
        return done(error);
    }
}));


passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});
passport.deserializeUser(async (id: number, done: any) => {
    try {
        const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
        return done(null, user);
    } catch (error) {
        return done(error)
    }
});

export const logIn = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    passport.authenticate("local", async (err: any, user: User, info: any) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!user) {
            return res.status(401).json({ message: info.message || "Unauthorized" });
        }

        req.logIn(user, (error) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(200).json({ message: 'Successfully logged in!', user: user.username });
        });

    })(req, res);
});