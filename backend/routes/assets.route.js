import express from "express"
import { get_all_asset } from "../controllers/asset.controller.js";

export const assetRouter = express.Router();

assetRouter.get("/get",get_all_asset)

