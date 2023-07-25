import { Request, Response } from "express";
import { addMovieSchema } from "../schemas";
import { User } from "../models";

import { v4 as uuid } from "uuid";

export const addMovie = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const paramsUserId = req.params.userId;
    const { file } = req;
    console.log(file);

    if (!file) {
      return res.status(400).json({ message: "image did not upload" });
    }

    const validator = await addMovieSchema({
      ...body,
      userId: paramsUserId,
      poster: "/storage/" + file.filename,
    });

    const { userId, name, categories, year, poster, director, description } =
      await validator.validateAsync({
        ...body,
        userId: paramsUserId,
        poster: "/storage/" + file.filename,
      });

    const user = await User.findOne({ id: userId });
    const id = uuid();

    if (user) {
      user.movies.push({
        name,
        categories,
        year,
        poster,
        director,
        description,
        id,
      });

      await user.save();
      return res.status(201).json({ message: "movie added to list" });
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};
