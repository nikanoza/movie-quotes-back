import { Request, Response } from "express";

export const addQuote = (req: Request, res: Response) => {
  const { body, file } = req;

  if (!file) {
    return res.status(400).json({ message: "image did not upload" });
  }
};
