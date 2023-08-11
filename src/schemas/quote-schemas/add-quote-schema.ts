import Joi from "joi";
import { User } from "../../models";
import { CreateQuotes } from "types";

const addQuoteSchema = async (_: CreateQuotes) => {
  return Joi.object<CreateQuotes>({
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
    movieId: Joi.string().required(),
    eng: Joi.string().required(),
    geo: Joi.string().required(),
    poster: Joi.string().required(),
  });
};

export default addQuoteSchema;
