"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db/db");
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const router_1 = __importDefault(require("./router/router"));
const passport_1 = __importDefault(require("passport"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const allowedOrigins = process.env.CLIENT_URL;
console.log(allowedOrigins);
console.log(db_1.isProd);
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    exposedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    store: new ((0, connect_pg_simple_1.default)(express_session_1.default))({
        pool: db_1.pool,
        conString: process.env.DATABASE_URL,
        tableName: "session",
        pruneSessionInterval: 60 * 60,
        ttl: 24 * 60 * 60
    }),
    secret: (_a = process.env.SESSION_SECRET) !== null && _a !== void 0 ? _a : 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: db_1.isProd,
        sameSite: db_1.isProd ? "none" : "lax"
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/", router_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
