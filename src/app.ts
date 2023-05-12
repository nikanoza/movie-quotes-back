import express from "express";
import dotenv from "dotenv";
import connectToMongo from "./config/mongo.js";

dotenv.config();
connectToMongo();
const app = express();

app.listen(process.env.PORT || 3000);
