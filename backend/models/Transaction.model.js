
import mongoose from "mongoose"
const TransactionSchema = new mongoose.Schema({
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    assetId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Asset",
      required:true
    },
    transaction_type:{
      type:String,
      enum:["BUY","SELL"],
      required:true
    },
    quantity:{
      type:Number,
      required:true,
      min:1
    },
    price:{
      type:Number,
      required:true
    },
    total_price:{
      type:Number,
      required:true
    }
  },{timestamps:true});
  



export const Transaction = mongoose.model("Transaction",TransactionSchema);