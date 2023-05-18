import { register } from "../contollers";
import express from "express";

const authRouter = express();

authRouter.post("/register", register);

export default authRouter;
