import { Schema, model } from "mongoose";
import { Email, Movie, Name, User } from "../types/models";

const { String, Boolean, Number } = Schema.Types;

const emailSchema = new Schema<Email>({
  email: { type: String, required: true },
  verify: { type: Boolean, default: false },
  primary: { type: Boolean, default: false },
});

const nameSchema = new Schema<Name>({
  eng: { type: String, required: true },
  geo: { type: String, required: true },
});

const movieSchema = new Schema<Movie>({
  name: nameSchema,
  categories: [{ type: String, required: true }],
  year: { type: Number, required: true },
  director: nameSchema,
  description: nameSchema,
  poster: { type: String, required: true },
  id: { type: Number, required: true },
});

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  emails: [emailSchema],
  password: { type: String, required: true },
  movies: [movieSchema],
  id: { type: String, required: true },
});

const User = model("Users", userSchema);

export default User;
