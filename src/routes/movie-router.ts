import express from "express";
import { authMiddleware } from "../middlewares";
import multer from "multer";
import { fileStorage, fileFilter } from "types";
import { addMovie } from "../controllers";

const movieRouter = express.Router();

movieRouter.post(
  "/movies/:userId",
  authMiddleware,
  multer({ storage: fileStorage, fileFilter }).single("poster"),
  addMovie
);

export default movieRouter;
