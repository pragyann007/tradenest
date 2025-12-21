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
    wallet:{
        type:Number,
        default:1000
    },
  passwordResetToken:String,
  passwordResetExpires:String,

    is_verified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const User =  mongoose.model("User",userSchema);
