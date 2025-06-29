import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from './router/router';
import passport from "passport";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";


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

app.use(passport.initialize());
app.use(cookieParser());

app.use("/", router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);

});