import { Asset } from "../models/Assets.model.js"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js"

export const get_all_asset = asyncHandler(async(req,res)=>{

    const assets = await  Asset.find();

    if(!assets){
        throw new ApiError(400,"No asset found ")
    }

    return ApiResponse.success(res,assets,"Fetched all assets")


})