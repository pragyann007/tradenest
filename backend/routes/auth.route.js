import { Router } from "express";
import { change_password_0, check_password_1, login, register } from "../controllers/auth.controller.js";
import {validator} from "../middlewares/validator.js"
import { registerSchema } from "../validators/auth.validator.js";

export const authRouter = Router()

authRouter.post("/register",validator(registerSchema),register);
authRouter.post("/login",login)
authRouter.post("/forgot-password",change_password_0)
authRouter.post("/forgot",check_password_1)

