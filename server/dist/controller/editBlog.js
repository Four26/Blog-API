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
exports.editBlog = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = __importDefault(require("../middleware/prisma"));
exports.editBlog = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { title, content, category, publish } = req.body;
    const status = publish === false ? "draft" : "published";
    const category_id = yield prisma_1.default.category.findFirst({
        where: {
            name: category
        }
    });
    const updatePost = yield prisma_1.default.posts.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            title: title,
            content: content,
            author_id: userId,
            category_id: category_id === null || category_id === void 0 ? void 0 : category_id.id,
            status: status,
            updated_at: new Date()
        }
    });
    res.status(200).json({ message: "Your blog is successfully save!" });
    return;
}));
