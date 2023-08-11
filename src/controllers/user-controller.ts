import { Request, Response } from "express";
import { PasswordRecovery, User } from "../models";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { generateExpireDate } from "../helpers";
import { sendPasswordRecovery } from "../mail";
import { passwordRecoverySchema, passwordResetSchema } from "../schemas";

export const passwordRecovery = async (req: Request, res: Response) => {
  const { body } = req;

  const validator = await passwordRecoverySchema(body);
  const { email, backLink } = await validator.validateAsync(body);

  const user = await User.findOne({ "emails.email": email });

  if (!user) {
    return res
      .status(400)
      .json({ message: "user with this email did'not find" });
  }

  const primary = user.emails.find((email) => email.primary);

  if (primary && primary.toString() !== email) {
    return res
      .status(400)
      .json({ message: "Looks like this is not your primary email" });
  }

  const hash = crypto.randomBytes(48).toString("hex");
  const date = generateExpireDate();

  await PasswordRecovery.create({ email, hash, expireIn: date });
  await sendPasswordRecovery(email, hash, user.name, backLink);

  return res
    .status(200)
    .json({ message: "Check your email for instractions!" });
};

export const passwordReset = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const validator = await passwordResetSchema(body);
    const { password, hash } = await validator.validateAsync(body);

    const resetDocument = await PasswordRecovery.findOne({ hash });

    if (!resetDocument) {
      return res.status(400).json({
        message: "There is no any request for this account to update password",
      });
    }

    const date = new Date();
    const isExpired = resetDocument.expireIn > date;

    if (!isExpired) {
      await resetDocument.deleteOne();
      return res.status(400).json({ message: "Link has expired!" });
    }

    const user = await User.findOne({ "emails.email": resetDocument.email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "user with this email did'not find" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();
    await resetDocument.deleteOne();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const updateAvatar = async (req: Request, res: Response) => {
  try {
    const { file } = req;
    const id = req.params.userId;
    const user = await User.findOne({ id });

    if (!user) {
      return res
        .status(400)
        .json({ message: "user with this id did'not find" });
    }

    if (!file) {
      return res.status(400).json({ message: "image did not upload" });
    }

    const image = "/storage/" + file.filename;
    user.avatar = image;
    await user.save();
    return res.status(201).json({ message: "user avatar updated!" });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const id = req.params.id;

    const user = await User.findOne({ id });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user with this email did'not find" });
    }

    if (name) {
      user.name = name;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }
    return res.status(203).json({ message: "user info updated" });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const addEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const id = req.params.id;

    const user = await User.findOne({ id });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user with this email did'not find" });
    }

    user.emails.push({
      email,
      verify: false,
      primary: false,
    });

    await user.save();
    return res.status(201).json({ message: "new email added to account" });
  } catch (error) {
    return res.status(401).json(error);
  }
};
