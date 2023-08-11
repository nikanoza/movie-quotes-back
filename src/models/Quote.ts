import { Schema, model } from "mongoose";
import { CommentType, QuoteType } from "types";

const { String } = Schema.Types;

const commentSchema = new Schema<CommentType>({
  userId: { type: String, required: true },
  text: { type: String, required: true },
});

const quoteSchema = new Schema<QuoteType>({
  eng: { type: String, required: true },
  geo: { type: String, required: true },
  poster: { type: String, required: true },
  comments: [commentSchema],
  id: { type: String, required: true },
});

const Quote = model("Quote", quoteSchema);

export default Quote;
