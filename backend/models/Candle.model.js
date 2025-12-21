import mongoose from "mongoose";

const CandleSchema = new mongoose.Schema({
    assetId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Asset",
      required:true
    },
    interval:{
      type:String,
      enum:["1m","5m","15m","1h","1d"],
      required:true
    },
    open:{
      type:Number,
      required:true
    },
    high:{
      type:Number,
      required:true
    },
    low:{
      type:Number,
      required:true
    },
    close:{
      type:Number,
      required:true
    },
    volume:{
      type:Number,
      default:0
    },
    timestamp:{
      type:Date,
      required:true
    }
  },{timestamps:true});
  

export const Candle = mongoose.model("Candle",CandleSchema)