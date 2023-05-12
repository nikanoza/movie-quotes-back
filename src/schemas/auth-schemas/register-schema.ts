import Joi from "joi";
import { User } from "../../models";
import { RegisterSchema } from "types/schemas";

const createUserSchema = async (_: RegisterSchema) => {
  return Joi.object<RegisterSchema>({
    name: Joi.string()
      .required()
      .external(async (value) => {
        const existingUser = await User.findOne({ name: value });
        if (existingUser) {
          throw new Error("Name is already taken");
        }
      }),
    password: Joi.string().min(8).max(20).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords do not match",
      }),
    email: Joi.string()
      .email()
      .required()
      .external(async (value, _) => {
        const user = await User.findOne({ "emails.email": value });

        if (user) {
          const emailExists = user.emails.some(
            (email) => email.email === value
          );
          if (emailExists) {
            throw new Error("Email is already taken");
          }
        }
      }),
  });
};

export default createUserSchema;
