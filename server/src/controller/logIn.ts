import bcryptjs from "bcryptjs";
import passport from "passport";
import { Request, Response } from "express";
import { Strategy as LocalStrategy } from "passport-local"
import expressAsyncHandler from "express-async-handler";
import prisma from "../middleware/prisma";

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
        const response = await prisma.users.findUnique({
            where: {
                username: username
            }
        });

        if (!response) {
            return done(null, false, { message: "User not found! Please sign up first!" });
        }

        const passwordMatch = await bcryptjs.compare(password, response.password);

        if (!passwordMatch) {
            return done(null, false, { message: "Incorrect password" });
        }

        return done(null, response)
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});
passport.deserializeUser(async (id: number, done: any) => {
    try {
        const response = await prisma.users.findUnique({
            where: {
                id: id
            }
        });
        return done(null, response);
    } catch (error) {
        return done(error)
    }
});

export const logIn = expressAsyncHandler((req: Request, res: Response) => {
    passport.authenticate("local", async (err: Error, user: User, info: any) => {

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
            return res.status(200).json({ message: 'Successfully logged in!' });
        });

    })(req, res);
});