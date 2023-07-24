import { addEmail, updateAvatar, updateUser } from "../controllers";
import express from "express";
import { authMiddleware } from "../middlewares";
import multer from "multer";
import { fileStorage, fileFilter } from "types";

const userRouter = express.Router();

userRouter.put(
  "/user/avatar/:userId",
  authMiddleware,
  multer({ storage: fileStorage, fileFilter }).single("avatar"),
  updateAvatar
);
userRouter.put("/user/:id", authMiddleware, updateUser);
userRouter.post("/user/emails/:id", authMiddleware, addEmail);

export default userRouter;
