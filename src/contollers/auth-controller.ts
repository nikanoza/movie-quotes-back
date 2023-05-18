import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import { createUserSchema } from "../schemas";
import { User } from "../models";

export const register = async (req: Request, res: Response) => {
  const { body } = req;

  const validator = await createUserSchema(body);

  try {
    const { name, password, email } = await validator.validateAsync(body);

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
  } catch (error) {
    return res.status(401).json(error);
  }

  return res.status(201).json({ message: "user created" });
};
