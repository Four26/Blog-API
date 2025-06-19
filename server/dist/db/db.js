"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.isProd = void 0;
const dotenv_1 = require("dotenv");
const pg_1 = require("pg");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.configDotenv)({
    path: process.env.NODE_ENV === "production" ? path_1.default.resolve(__dirname, "../../.env.production") : path_1.default.resolve(__dirname, "../../.env")
});
exports.isProd = process.env.NODE_ENV === "production";
console.log(exports.isProd);
console.log("DATABASE_URL", process.env.DATABASE_URL);
console.log("NODE_ENV", process.env.NODE_ENV);
exports.pool = new pg_1.Pool(Object.assign({ connectionString: process.env.DATABASE_URL }, (exports.isProd && {
    ssl: {
        rejectUnauthorized: false
    }
})));
