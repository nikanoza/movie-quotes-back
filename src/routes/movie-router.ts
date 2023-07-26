import express from "express";
import { authMiddleware } from "../middlewares";
import multer from "multer";
import { fileStorage, fileFilter } from "../types/multer.js";
import { addMovie } from "../controllers";

const movieRouter = express.Router();

movieRouter.post(
  "/movies/:userId",
  multer({ storage: fileStorage, fileFilter }).single("image"),
  addMovie
);

export default movieRouter;
