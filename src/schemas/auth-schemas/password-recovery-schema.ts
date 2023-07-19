import Joi from "joi";
import { PasswordRecoverySchema } from "types";

const passwordRecoverySchema = async (_: PasswordRecoverySchema) => {
  return Joi.object<PasswordRecoverySchema>({
    email: Joi.string()
      .email()
      .required(),
    backLink: Joi.string().uri().required(),
  });
};

export default passwordRecoverySchema;