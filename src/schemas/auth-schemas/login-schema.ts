import Joi from "joi";
import { User } from "../../models";
import { LoginSchema } from "types";

const loginSchema = async (_: LoginSchema) => {
  return Joi.object<LoginSchema>({
    email: Joi.string()
      .email()
      .required()
      .external(async (value) => {
        try {
          const user = await User.findOne({ "emails.email": value });
          if (!user) {
            throw new Error("Invalid email or password");
          }
          return value;
        } catch (error) {
          throw new Error("Invalid email or password");
        }
      }),
    password: Joi.string().required(),
  });
};

export default loginSchema;
