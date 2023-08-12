import Joi from "joi";
import { EditQuotes } from "types";

const editQuoteSchema = async (_: EditQuotes) => {
  return Joi.object<EditQuotes>({
    eng: Joi.string().required(),
    geo: Joi.string().required(),
    poster: Joi.string().required(),
  });
};

export default editQuoteSchema;
