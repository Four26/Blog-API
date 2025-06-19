"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.logOut = (0, express_async_handler_1.default)((req, res) => {
    req.logOut(() => {
        req.session.destroy((error) => {
            res.clearCookie("connect.sid");
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json({ message: "Successfully logged out!" });
            return;
        });
    });
});
