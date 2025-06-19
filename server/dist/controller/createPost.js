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
exports.createPost = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = __importDefault(require("../middleware/prisma"));
exports.createPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const author_id = req.user.id;
    const { title, content, category, publish } = req.body;
    if (!title || !content || !category || publish === undefined) {
        res.status(400).json({ message: "Please fill all the fields!" });
        return;
    }
    const status = publish === false ? "draft" : "published";
    const category_id = yield prisma_1.default.category.findFirst({
        where: {
            name: category
        }
    });
    if (!(category_id === null || category_id === void 0 ? void 0 : category_id.id)) {
        res.status(400).json({ message: "Category not found." });
        return;
    }
    const newPost = yield prisma_1.default.posts.create({
        data: {
            title,
            content,
            author_id,
            category_id: category_id === null || category_id === void 0 ? void 0 : category_id.id,
            status,
            created_at: new Date(),
            updated_at: new Date()
        }
    });
    res.status(200).json({ message: "Your blog is successfully save!" });
    return;
}));
