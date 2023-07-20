import Joi from "joi";
import { passwordResetSchema } from "types";

const passwordResetSchema = async (_: passwordResetSchema) => {
  return Joi.object<passwordResetSchema>({
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