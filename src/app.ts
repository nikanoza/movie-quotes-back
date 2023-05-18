import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import connectToMongo from "./config/mongo.js";
import { authRouter } from "./routes";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";

dotenv.config();
connectToMongo();
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api", authRouter);

app.use("/", ...swaggerMiddleware);

app.listen(process.env.PORT || 3000);
