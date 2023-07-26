import { Request, Response } from "express";
import { addMovieSchema } from "../schemas";
import { User } from "../models";

import { v4 as uuid } from "uuid";

export const addMovie = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const paramsUserId = req.params.userId;
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: "image did not upload" });
    }
    const transform = {
      year: body.year,
      name: { eng: body.name_eng, geo: body.name_geo },
      director: { eng: body.director_eng, geo: body.director_geo },
      description: { eng: body.description_eng, geo: body.description_geo },
      userId: paramsUserId,
      poster: "/storage/" + file.filename,
      categories: typeof body.categories === "string" ? body.categories.split(",") : body.categories
    };

    const validator = await addMovieSchema(transform);

    const { userId, name, categories, year, poster, director, description } =
      await validator.validateAsync(transform);

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
