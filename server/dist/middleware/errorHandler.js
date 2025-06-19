"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = ({ err, req, res, next }) => {
    const errStack = err.stack;
    const errMessage = err.message;
    res.status(500).json({
        message: errMessage,
        stack: errStack
    });
};
exports.errorHandler = errorHandler;
