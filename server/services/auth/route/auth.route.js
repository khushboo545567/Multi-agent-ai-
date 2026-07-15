import express from "express";
import { getCurrUser, login, logout } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/get-curr-user", getCurrUser);
export default authRouter;
