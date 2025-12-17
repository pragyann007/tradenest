import mongoose from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const connect = asyncHandler(async(url)=>{

    mongoose.connect(url)
    console.log("Db connected sucess !!")

})