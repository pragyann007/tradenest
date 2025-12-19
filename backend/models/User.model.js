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
  passwordResetToken:String,
  passwordResetExpires:String,

    is_verified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const User =  mongoose.model("User",userSchema);
