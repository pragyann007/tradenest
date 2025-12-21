import { Asset } from "../models/Assets.model.js";
import { User } from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import {Candle} from "../models/Candle.model.js"
import { Transaction } from "../models/Transaction.model.js";

export const wallet = asyncHandler(async(req,res)=>{

    const {user} = req ; 

    if(!req.user){
        throw new ApiError(403,"Forbidden")
    }

    const getUserWallet = await User.findById(user.id).select("-password");

    const users_wallet = getUserWallet.wallet ; 


    if(!getUserWallet){
        throw new ApiError(400," Server Error ")
    }

    
    return ApiResponse.success(res,{wallet:users_wallet},"Fetched users wallet")



})


export const buy = asyncHandler(async(req,res)=>{
    const {user} = req ;
    const {asset,quantity} = req.body ; 

    
    if(!user){
        throw new ApiError(400,"No user found")
    }

    if(!asset || !quantity || quantity<=0 ){
        throw new ApiError(400,"All fields are required ..")
    }

    const validateAsset = await Asset.findOne({symbol:asset});

    if(!validateAsset){
        throw new ApiError(404,"Asset Not found ")
    }

    if(!validateAsset.isActive){
        throw new ApiError(400,"The requested asset is not active currently ..")
    }

    const latestCandle = await Candle.findOne({assetId:validateAsset._id}).sort({timestamp:-1});

    if (!latestCandle) {
        throw new ApiError(400, "Market data not available");
      }

      const price = latestCandle.close ; 

      const totalCost = Number(quantity)* price ; 

      const check_wallet = await User.findById(user.id);

      const wallet = check_wallet.wallet; 

      if(wallet < totalCost){
        throw new ApiError(400,"Not enogh balance .")
      }

      let deductBalence = wallet-totalCost ; 

      check_wallet.wallet = deductBalence ; 

      await check_wallet.save() ; 

    //   create transaction 

    const transaction = new Transaction({
        userId:user.id , 
        assetId:validateAsset._id,
        transaction_type:"BUY",
        quantity,
        price,
        total_price:totalCost,

    })

    await transaction.save();

    return ApiResponse.success(res,transaction,"Bought sucesfully")

      






    


})

export const sell = asyncHandler(async(req,res)=>{
    const {user} = req ; 

})