import Joi, { CustomHelpers } from "joi";
import { User } from "../../models";
import { NewComment, QuoteType, UserT } from "types";
import Quote from "models/Quote";

const determineIfUserExist =
  (user: UserT | null) => (value: string, helpers: CustomHelpers) => {
    if (!user) {
      return helpers.error("user did not exist!");
    }

    return value;
  };

const determineIfQuoteExist =
  (quote: QuoteType | null) => (value: string, helpers: CustomHelpers) => {
    if (!quote) {
      return helpers.error("quote did not exist!");
    }

    return value;
  };

const addCommentSchema = async (data: NewComment) => {
  const user = await User.findOne({ id: data.userId });

  const quote = await Quote.findOne({ id: data.quoteId });
  return Joi.object<NewComment>({
    userId: Joi.string().custom(determineIfUserExist(user)).required(),
    quoteId: Joi.string().custom(determineIfQuoteExist(quote)).required(),
    text: Joi.string().min(3).required(),
  });
};

export default addCommentSchema;
