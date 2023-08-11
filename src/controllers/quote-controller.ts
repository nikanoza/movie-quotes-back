import { Request, Response } from "express";
import { User } from "models";
import { v4 as uuid } from "uuid";
import Quote from "../models/Quote";
import { addQuoteSchema } from "../schemas";

export const addQuote = async (req: Request, res: Response) => {
  const { body, file } = req;

  if (!file) {
    return res.status(400).json({ message: "image did not upload" });
  }

  try {
    const posterUrl = "/storage/" + file.filename;
    const validator = await addQuoteSchema({ ...body, poster: posterUrl });

    const { userId, movieId, eng, geo, poster } = await validator.validateAsync(
      { ...body, poster: posterUrl }
    );

    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const movie = user.movies.find((elem) => elem.id === movieId);

    if (!movie) {
      return res.status(400).json({ message: "movie not found" });
    }

    const id = uuid();
    const newQuote = new Quote({
      eng,
      geo,
      poster,
      id,
      movieId,
      userId,
      comments: [],
    });

    await newQuote.save();
    return res.status(201).json(newQuote);
  } catch (error) {
    return res.status(401).json(error);
  }
};
