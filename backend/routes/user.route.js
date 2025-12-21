import express from "express"
import { buy, sell, wallet } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

export const userRouter = express.Router();

userRouter.get("/wallet",isAuth,wallet)
userRouter.post("/trade/buy",isAuth,buy)
userRouter.post("/trade/sell",isAuth,sell)