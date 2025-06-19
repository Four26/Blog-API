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
exports.logIn = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = __importDefault(require("../middleware/prisma"));
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma_1.default.users.findUnique({
            where: {
                username: username
            }
        });
        if (!response) {
            return done(null, false, { message: "User not found! Please sign up first!" });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, response.password);
        if (!passwordMatch) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, response);
    }
    catch (error) {
        return done(error);
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma_1.default.users.findUnique({
            where: {
                id: id
            }
        });
        return done(null, response);
    }
    catch (error) {
        return done(error);
    }
}));
exports.logIn = (0, express_async_handler_1.default)((req, res) => {
    passport_1.default.authenticate("local", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
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
    }))(req, res);
});
