import { Request, Response } from "express";
import { User } from "models";
import { v4 as uuid } from "uuid";
import Quote from "../models/Quote";
import { addQuoteSchema, editQuoteSchema } from "../schemas";

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
      likes: 0,
      comments: [],
    });

    await newQuote.save();
    return res.status(201).json(newQuote);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const editQuotes = async (req: Request, res: Response) => {
  const { body, file, params } = req;

  if (!file) {
    return res.status(400).json({ message: "image did not upload" });
  }

  const quote = await Quote.findOne({ id: params.id });
  if (!quote) {
    return res.status(400).json({ message: "quote did not find!" });
  }
  const posterUrl = "/storage/" + file.filename;
  const validator = await editQuoteSchema({ ...body, poster: posterUrl });
  const { value, error } = validator.validate({ ...body, poster: posterUrl });

  if (error) {
    return res.status(401).json(error.details);
  }

  const { eng, geo, poster } = value;

  quote.eng = eng;
  quote.geo = geo;
  quote.poster = poster;

  await quote.save();

  return res.status(204).json({ message: "quote updated" });
};

export const addLike = async (req: Request, res: Response) => {
  const { userId, quoteId } = req.params;

  const user = await User.findOne({ id: userId });
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  const quote = await Quote.findOne({ id: quoteId });
  if (!quote) {
    return res.status(400).json({ message: "quote not found" });
  }

  quote.likes = quote.likes + 1;
  user.likes.push(quote.id);

  await quote.save();
  await user.save();

  return res.status(204);
};

export const addDislike = async (req: Request, res: Response) => {
  const { userId, quoteId } = req.params;

  const user = await User.findOne({ id: userId });
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  const quote = await Quote.findOne({ id: quoteId });
  if (!quote) {
    return res.status(400).json({ message: "quote not found" });
  }

  quote.likes = quote.likes - 1;
  const index = user.likes.findIndex(quote.id);

  user.likes.splice(1, index);

  await quote.save();
  await user.save();

  return res.status(204);
};
