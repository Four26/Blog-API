import z from "zod";
import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";


const prisma = new PrismaClient();

export const signUp = expressAsyncHandler(async (req: Request, res: Response) => {

    const validateSignUp = z.object({
        firstname: z.string().min(2, "First name must be atleast 2 characters long!").nonempty("First name is required!"),
        lastname: z.string().min(2, "Lastname must be atleast 2 characters long!").nonempty("Last name is required!"),
        username: z.string().min(3, "Username must be atleast 3 characters long!").nonempty("Username is required!"),
        email: z.string().email("Invalid email!").nonempty("Email is required!"),
        password: z.string().min(8, "Password must be atleast 8 characters long!").nonempty("Password is required!"),
        confirmPassword: z.string().nonempty("Confirm password is required!")
    }).refine(data => data.password === data.confirmPassword, {
        message: "Password doesn't match!",
        path: ["confirmPassword"]
    });

    try {
        const { firstname, lastname, username, email, password } = validateSignUp.parse(req.body);

        const hashedPassword = await bcryptjs.hash(password, 10);

        const checkDuplicateUsername = await prisma.users.findUnique({
            where: {
                username: username
            }
        });

        const checkDuplicateEmail = await prisma.users.findUnique({
            where: {
                email: email
            }
        });

        if (checkDuplicateUsername || checkDuplicateEmail) {
            res.status(409).json({ message: `${checkDuplicateUsername ? "Username" : "Email"} already exists!` });
            return;
        } else {
            const createUser = await prisma.users.create({
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    email: email,
                    password: hashedPassword,
                    created_at: new Date(),
                    admin: false
                }
            });

            res.status(200).json({ message: "User created successfully!", user: createUser });
            return;
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errMessage = error.errors[0].message;
            console.log(errMessage);
            res.status(400).json({ message: errMessage });
            return;
        } else {
            res.status(500).json({ message: "Internal server error!" });
            return;
        }
    }

})