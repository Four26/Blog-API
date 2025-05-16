import express from "express";
import dotenv from "dotenv";
import router from './router/router';
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();
const PORT = process.env.PORT

const app = express();

app.use("/", router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});