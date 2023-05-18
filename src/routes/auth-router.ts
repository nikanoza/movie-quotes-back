import { emailValidation, login, register } from "../contollers";
import express from "express";

const authRouter = express();

authRouter.post("/register", register);
authRouter.post("/verify", emailValidation);
authRouter.post("/login", login);

export default authRouter;
