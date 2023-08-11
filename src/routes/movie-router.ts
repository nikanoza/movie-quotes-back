import express from "express";
import { authMiddleware } from "../middlewares";
import multer from "multer";
import { fileStorage, fileFilter } from "../types/multer.js";
import { addMovie, updateMovie } from "../controllers";

const movieRouter = express.Router();

movieRouter.post(
  "/movies/:userId",
  authMiddleware,
  multer({ storage: fileStorage, fileFilter }).single("image"),
  addMovie
);
movieRouter.put(
  "/movies/:userId",
  authMiddleware,
  multer({ storage: fileStorage, fileFilter }).single("image"),
  updateMovie
);

export default movieRouter;
