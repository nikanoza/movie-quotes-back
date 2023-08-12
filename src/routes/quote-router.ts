import { authMiddleware } from "../middlewares";
import { addQuote } from "../controllers";
import express from "express";
import multer from "multer";
import { fileStorage, fileFilter } from "../types/multer";

const quoteRouter = express.Router();

quoteRouter.post(
  "/quotes",
  authMiddleware,
  multer({ storage: fileStorage, fileFilter }).single("poster"),
  addQuote
);

export default quoteRouter;