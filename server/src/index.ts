import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from './router/router';
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();
const app = express();
const PORT = process.env.PORT

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    exposedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});