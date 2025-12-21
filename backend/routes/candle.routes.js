import express from "express"
import { getCandleData } from "../controllers/candle.controller.js"

export const candleRouter = express.Router()

candleRouter.get("/get-candle-info",getCandleData);


