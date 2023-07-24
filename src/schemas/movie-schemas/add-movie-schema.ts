import Joi from "joi";
import { User } from "../../models";
import { CreateMovie, Name } from "types";

const addMovieSchema = async (data: CreateMovie) => {
  const commonSchema = Joi.object<Name>({
    eng: Joi.string().required(),
    geo: Joi.string().required(),
  });

  const nameSchema = Joi.object<Name>({
    eng: Joi.string()
      .required()
      .external(async (value) => {
        try {
          const user = await User.findOne({
            "name.eng": value,
            id: data.userId,
          });
          if (user) {
            throw new Error("movie with this name already exists");
          }
          return value;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      }),
    geo: Joi.string()
      .required()
      .external(async (value) => {
        try {
          const user = await User.findOne({
            "name.geo": value,
            id: data.userId,
          });
          if (user) {
            throw new Error("movie with this name already exists");
          }
          return value;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      }),
  });

  return Joi.object<CreateMovie>({
    userId: Joi.string()
      .required()
      .external(async (value) => {
        try {
          const user = await User.findOne({ id: value });
          if (!user) {
            throw new Error("User did not fined");
          }
          return value;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      }),
    name: nameSchema.required(),
    categories: Joi.array().items(Joi.string()).required(),
    year: Joi.number().integer().required(),
    poster: Joi.string().required(),
    director: commonSchema.required(),
    description: commonSchema.required(),
  });
};

export default addMovieSchema;
