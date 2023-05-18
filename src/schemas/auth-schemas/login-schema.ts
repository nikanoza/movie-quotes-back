import Joi from "joi";
import { User } from "../../models";

const loginSchema = async () => {
  return Joi.object({
    email: Joi.string()
      .email()
      .required()
      .custom(async (value, _) => {
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
