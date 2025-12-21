import mongoose from "mongoose"

const WalletScehma = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    balance:{
        type:Number,
        default:1000,
},
currency:{
    type:String,
    default:"NPR"

},



},{timestamps:true})


export const Wallet = mongoose.model("Wallet",WalletScehma);
