import { emailValidation, register } from "../contollers";
import express from "express";

const authRouter = express();

authRouter.post("/register", register);
authRouter.post("/verify", emailValidation);

export default authRouter;
