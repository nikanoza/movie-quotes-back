import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import { createUserSchema } from "../schemas";
import { User } from "../models";

export const register = async (req: Request, res: Response) => {
  const { body } = req;

  const validator = await createUserSchema(body);

  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const { name, password, email } = value;

  const id = uuid();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    name,
    password: hashedPassword,
    emails: [{ email, verify: false, primary: true }],
    movies: [],
    id,
  });
};
