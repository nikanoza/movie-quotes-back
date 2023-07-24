import { addEmail, updateAvatar, updateUser } from "../controllers";
import express, { Request } from "express";
import { authMiddleware } from "../middlewares";
import multer, { FileFilterCallback } from "multer";
import { DestinationCallback, FileNameCallback } from "types";

const fileStorage = multer.diskStorage({
  destination: (
    _: Request,
    __: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, "public/storage");
  },
  filename: (
    _: express.Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    callback(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (
  __: express.Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

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
