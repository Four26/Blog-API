import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import prisma from "../middleware/prisma";
import { NextFunction, Request, Response } from "express";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    passReqToCallback: true
}, async (req: Request, accessToken, refreshToken, profile, cb) => {


    try {
        const email = profile.emails?.[0].value;
        const state = req.query.state;

        if (!email) return cb(null, false, { message: "No email returned from Google" });

        console.log(state);

        const existingUser = await prisma.users.findUnique({ where: { email, googleId: profile.id, authProvider: "google" } });

        if (state === "signUp") {

            if (existingUser) {
                return cb(null, existingUser);
            }

            const newUser = await prisma.users.create({
                data: {
                    email: profile.emails?.[0].value || "",
                    username: profile.displayName || "",
                    firstname: profile.name?.givenName || "",
                    lastname: profile.name?.familyName || "",
                    password: "",
                    created_at: new Date(),
                    admin: false,
                    authProvider: "google",
                    googleId: profile.id
                }
            });
            return cb(null, newUser);
        }

        if (state === "logIn") {
            if (existingUser && existingUser.authProvider === "google") {
                return cb(null, existingUser);
            } else {
                return cb(null, false, { message: "No Google account registered. Please sign up first." });
            }
        }
        return cb(null, false, { message: "Invalid state parameter" });
    } catch (error) {
        return cb(error)
    }
}));


export const googleLogIn = passport.authenticate('google', { scope: ["profile", "email"], state: "logIn" });
export const googleSignUp = passport.authenticate('google', { scope: ["profile", "email"], state: "signUp" });

export const googleLogInCallback = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', (err: any, user: any, info: any) => {
        if (err) return next(err);

        if (!user) {
            return res.redirect(`${process.env.CLIENT_URL}/logIn?error=${encodeURIComponent(info.message || "Authentication failed!")}`)

        }

        req.logIn(user, (error) => {
            if (err) return next(err);
            return res.redirect(`${process.env.CLIENT_URL}/user`);
        })
    })(req, res);
}