import Joi from "joi";
import { PasswordResetSchema } from "types";

const passwordResetSchema = async (_: PasswordResetSchema) => {
  return Joi.object<PasswordResetSchema>({
    hash: Joi.string()
      .required(),
    password: Joi.string().min(8).max(20).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords do not match",
      }),
  });
};

export default passwordResetSchema;