import { emailValidation, login, passwordRecovery, passwordReset, register } from "../controllers";
import express from "express";

const authRouter = express();

authRouter.post("/register", register);
authRouter.post("/verify", emailValidation);
authRouter.post("/login", login);
authRouter.post("/recovery", passwordRecovery)
authRouter.post("/reset", passwordReset)

export default authRouter;
