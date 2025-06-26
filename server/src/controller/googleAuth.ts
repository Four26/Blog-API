import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { pool } from "../db/db";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    passReqToCallback: true
}, async (req: Request, accessToken, refreshToken, profile, cb) => {
    console.log(process.env.SERVER_URL);

    try {
        const email = profile.emails?.[0].value;
        const state = req.query.state;

        if (!email) return cb(null, false, { message: "No email returned from Google" });

        const existingUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (state === "signUp") {

            if (existingUser.rows.length > 0) {
                return cb(null, existingUser.rows[0]);
            }

            const newUser = await pool.query(`INSERT INTO users (email, username, firstname, lastname, password, created_at, admin, authprovider, googleid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
                profile.emails?.[0].value,
                profile.displayName,
                profile.name?.givenName,
                profile.name?.familyName,
                "",
                new Date(),
                false,
                "google",
                profile.id
            ]);

            return cb(null, newUser.rows[0]);
        }

        if (state === "logIn") {
            if (existingUser.rows.length > 0 && existingUser.rows[0].authprovider === "google") {
                return cb(null, existingUser.rows[0]);
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
            if (error) return next(error);

            const state = req.query.state;

            if (state === "signUp") {
                return res.redirect(`${process.env.CLIENT_URL}/logIn`);
            } else if (state === "logIn") {
                return res.redirect(`${process.env.CLIENT_URL}/user`);
            } else {
                return res.redirect(`${process.env.CLIENT_URL}/logIn?error=${encodeURIComponent(info.message || "Authentication failed!")}`);
            }
        });
    })(req, res, next);
}