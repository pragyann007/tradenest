import { Asset } from "../models/Assets.model.js"
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler.js"

export const get_all_asset = asyncHandler(async(req,res)=>{

    const assets = await  Asset.find();

    if(!assets){
        throw new ApiError(400,"No asset found ")
    }

    return ApiResponse.success(res,assets,"Fetched all assets")


})