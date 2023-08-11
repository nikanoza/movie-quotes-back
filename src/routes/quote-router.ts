import { addQuote } from "../controllers";
import express from "express";

const quoteRouter = express.Router();

quoteRouter.post("/quotes", addQuote);

export default quoteRouter;
