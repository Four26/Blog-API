import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool, isProd } from "./db/db";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import router from './router/router';
import passport from "passport";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();
const app = express();
const PORT = process.env.PORT
const allowedOrigins = [process.env.CLIENT_URL];


app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins?.includes(origin)) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    exposedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);

app.use(session({
    store: new (connectPgSimple(session))({
        pool,
        conString: process.env.DATABASE_URL,
        tableName: "session",
        pruneSessionInterval: 60 * 60,
        ttl: 24 * 60 * 60
    }),
    secret: process.env.SESSION_SECRET ?? 'secret',
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax"
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);

});