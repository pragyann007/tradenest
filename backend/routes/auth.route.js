import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import {validator} from "../middlewares/validator.js"

export const authRouter = Router()

authRouter.post("/register",validator,register);
