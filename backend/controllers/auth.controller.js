import { User } from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = asyncHandler(async(req,res)=>{

    const {name,email,password} = req.body ; 

    if(!name || !email || !password){
        throw new ApiError(402,"All Fields Required")
    }

    const emailExists = await User.findOne({email})

    if(emailExists){
        throw new ApiError(400,"User already exists")

    }

    const hash_password = await bcrypt.hash(password,12);


    const user = await User.create({
        name,
        email,
        password:hash_password
    })

 

    return ApiResponse.success(res,user,'Registration Sucess',201)

    


})

export const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body ; 

    if(!email||!password){
        throw new ApiError(402,"All field are required ")
    }

    const check_email = await User.findOne({email});
    
    if(!check_email){
        throw ApiError(400,"Email dont exists please register ...")
    }

    const check_password = await bcrypt.compare(password,check_email.password);

    if(!check_password){
        throw ApiError(403,"Invalid Credentials")
    }

    const payload = {
        id:check_email._id,
        name:check_email.name,
        email:check_email.email
    }

    const token = jwt.sign(payload,process.env.SECRET,{expiresIn:"7d"})

    res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return ApiResponse.success(res,check_email,"Logged in sucess",200)
    




})