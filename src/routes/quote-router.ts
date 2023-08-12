import { authMiddleware } from "../middlewares";
import {
  addComment,
  addDislike,
  addLike,
  addQuote,
  deleteQuote,
  editQuotes,
} from "../controllers";
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

quoteRouter.put(
  "/quotes",
  authMiddleware,
  multer({ storage: fileStorage, fileFilter }).single("poster"),
  editQuotes
);

quoteRouter.put("/likes/plus/:userId/:quoteId", authMiddleware, addLike);
quoteRouter.put("/likes/minus/:userId/:quoteId", authMiddleware, addDislike);
quoteRouter.delete("/quotes/:id", authMiddleware, deleteQuote);
quoteRouter.post("/comments", authMiddleware, addComment);

export default quoteRouter;
