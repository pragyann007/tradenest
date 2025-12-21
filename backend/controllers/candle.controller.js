import { Asset } from "../models/Assets.model.js";
import { Candle } from "../models/Candle.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const getCandleData = asyncHandler(async (req, res) => {
    const { asset } = req.query;
    const findAsset = await Asset.findOne({ symbol: asset });
    if (!findAsset) throw new ApiError(404, "Cannot find asset");

    if (!findAsset.isActive) throw new ApiError(400, "Asset is not active");

    const candles = await Candle.find({ assetId: findAsset._id }).sort({ timestamp: 1 });

    return ApiResponse.success(res, candles, "Fetched candle data");
});
