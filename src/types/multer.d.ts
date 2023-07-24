import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

export type DestinationCallback = (
  error: Error | null,
  destination: string
) => void;
export type FileNameCallback = (error: Error | null, filename: string) => void;

export const fileStorage = multer.diskStorage({
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

export const fileFilter = (
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
