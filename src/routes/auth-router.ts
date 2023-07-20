import { emailValidation, login, passwordRecovery, register } from "../controllers";
import express from "express";

const authRouter = express();

authRouter.post("/register", register);
authRouter.post("/verify", emailValidation);
authRouter.post("/login", login);
authRouter.post("/recovery", passwordRecovery)

export default authRouter;
