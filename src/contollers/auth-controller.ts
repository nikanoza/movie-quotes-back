import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { createUserSchema } from "../schemas";
import { EmailValidation, User } from "../models";
import { sendEmailConfirmation } from "../mail";

export const register = async (req: Request, res: Response) => {
  const { body } = req;

  const validator = await createUserSchema(body);

  try {
    const { name, password, email, backlink } = await validator.validateAsync(
      body
    );

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

    const verificationHash = crypto.randomBytes(48).toString("hex");

    await EmailValidation.create({
      email,
      hash: verificationHash,
    });

    await sendEmailConfirmation(email, verificationHash, name, backlink);
    return res.status(201).json({ message: "user created" });
  } catch (error) {
    return res.status(401).json(error);
  }
};
