import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
    },
    otp:{
        type:mongoose.Types.ObjectId,
        ref:"Otp"
    }
},{timestamps:true})

export const User =  mongoose.model("User",userSchema);
