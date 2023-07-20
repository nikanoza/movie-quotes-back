import express, { Request } from "express";
import multer, { FileFilterCallback } from 'multer';
import { DestinationCallback, FileNameCallback } from "types";

const fileStorage = multer.diskStorage({
    destination: (
      _: Request,
      __: Express.Multer.File,
      callback: DestinationCallback
    ): void => {
      callback(null, 'public/storage')
    },
    filename: (
      _: express.Request,
      file: Express.Multer.File,
      callback: FileNameCallback
    ): void => {
      callback(null, new Date().toISOString() + file.originalname)
    },
  })
  
  const fileFilter = (
    __: express.Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ): void => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  }

const userRouter = express.Router();

userRouter.put("/user/avatar", multer({ storage: fileStorage, fileFilter }).single('avatar'),)

export default userRouter;