import z from "zod";
import { pool } from "../db/db";
import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

const validateSignUp = z.object({
    firstname: z.string().min(2, "First name must be atleast 2 characters long!"),
    lastname: z.string().min(2, "Lastname must be atleast 2 characters long!"),
    username: z.string().min(3, "Username must be atleast 3 characters long!").max(12, "Username must be less than 12 characters long!"),
    email: z.string().email("Invalid email!"),
    password: z.string().min(8, "Password must be atleast 8 characters long!"),
    confirmPassword: z.string().nonempty("Confirm password is required!")
}).refine(data => data.password === data.confirmPassword, {
    message: "Password doesn't match!",
    path: ["confirmPassword"]
});


export const signUp = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {

    try {
        const { firstname, lastname, username, email, password } = validateSignUp.parse(req.body);

        const hashedPassword = await bcryptjs.hash(password, 10);

        const checkDuplicateUsername = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
        const checkDuplicateEmail = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (checkDuplicateUsername.rows.length > 0 || checkDuplicateEmail.rows.length > 0) {
            const errors = [];

            if (checkDuplicateUsername.rows.length > 0) {
                errors.push({ field: "username", message: "Username already exists!" });
            }

            if (checkDuplicateEmail.rows.length > 0) {
                errors.push({ field: "email", message: "Email already exists!" });
            }

            res.status(409).json({ message: errors });
        } else {
            const createUser = await pool.query(`INSERT INTO users (firstname, lastname, username, email, password, created_at, admin, googleid, authprovider) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [firstname, lastname, username, email, hashedPassword, new Date(), false, null, "local"]);

            res.status(200).json({ message: "User created successfully!" });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessage = error.errors.map((err) => ({
                field: err.path.join("."),
                message: err.message
            }));
            res.status(400).json({ message: errorMessage });
        } else {
            console.log(error)
            res.status(500).json({ message: "Internal server error!" });
        }
    }
});