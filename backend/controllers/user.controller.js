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
    const {assets,quantity} = req.body ; 

    
    if(!user){
        throw new ApiError(400,"No user found")
    }

    if(!assets || !quantity || quantity<=0 ){
        throw new ApiError(400,"All fields are required ..")
    }

    const validateAsset = await Asset.findOne({symbol:assets});

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
      console.log(check_wallet)

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

    const {assets,quantity} = req.body ; 
    console.log(assets)

    if(!user){
        throw new ApiError(403,"Unauthorised")
    }

    const asset = await Asset.findOne({symbol:assets})

    if(!asset){
        throw new ApiError(400,"No asset found")
    }
    const transaction = await Transaction.find({userId:user.id,assetId:asset._id}).populate("assetId");

    if(transaction.length === 0 ){
        throw new ApiError(400,"You have no transactions for this asset.")
    }

    let qty = 0 ; 

    transaction.forEach((trans)=>{
        console.log(trans)
        if(trans.transaction_type === "BUY"){
            qty+=trans.quantity
        }
        else if(trans.transaction_type === "SELL"){
            qty-=trans.quantity
        }

    })

    console.log(qty)

    if(quantity>qty){
        throw new ApiError(400, `You dont have ${quantity} stocks you only have ${qty}`)
    }

    const latestCandleClose = await Candle.findOne({assetId:asset._id}).sort({timestamp:-1});

    const price = latestCandleClose.close ; 
    const totalPrice = Number(quantity) * Number(price);

    

    const users = await User.findById(user.id)
    console.log(users)
    
    const wallet = users.wallet ; 
    console.log(wallet)

    const profit =(wallet+totalPrice).toFixed(2) ;

    users.wallet = profit ; 

    await users.save();

    const transaction_push = new Transaction({
        userId:user.id , 
        assetId:asset._id,
        transaction_type:"SELL",
        quantity,
        price,
        total_price:totalPrice,

    })

    await transaction_push.save()











    return ApiResponse.success(res,transaction_push,"Sold Sucess")

   



})