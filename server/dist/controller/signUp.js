"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const zod_1 = __importDefault(require("zod"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = __importDefault(require("../middleware/prisma"));
exports.signUp = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateSignUp = zod_1.default.object({
        firstname: zod_1.default.string().min(2, "First name must be atleast 2 characters long!"),
        lastname: zod_1.default.string().min(2, "Lastname must be atleast 2 characters long!"),
        username: zod_1.default.string().min(3, "Username must be atleast 3 characters long!").max(12, "Username must be less than 12 characters long!"),
        email: zod_1.default.string().email("Invalid email!"),
        password: zod_1.default.string().min(8, "Password must be atleast 8 characters long!"),
        confirmPassword: zod_1.default.string().nonempty("Confirm password is required!")
    }).refine(data => data.password === data.confirmPassword, {
        message: "Password doesn't match!",
        path: ["confirmPassword"]
    });
    try {
        const { firstname, lastname, username, email, password } = validateSignUp.parse(req.body);
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const checkDuplicateUsername = yield prisma_1.default.users.findUnique({
            where: {
                username: username
            }
        });
        const checkDuplicateEmail = yield prisma_1.default.users.findUnique({
            where: {
                email: email
            }
        });
        if (checkDuplicateUsername || checkDuplicateEmail) {
            const errors = [];
            if (checkDuplicateUsername) {
                errors.push({ field: "username", message: "Username already exists!" });
            }
            if (checkDuplicateEmail) {
                errors.push({ field: "email", message: "Email already exists!" });
            }
            res.status(409).json({ message: errors });
            return;
        }
        else {
            const createUser = yield prisma_1.default.users.create({
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
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            const errorMessage = error.errors.map((err) => ({
                field: err.path.join("."),
                message: err.message
            }));
            res.status(400).json({ message: errorMessage });
            return;
        }
        else {
            console.log(error);
            res.status(500).json({ message: "Internal server error!" });
            return;
        }
    }
}));
