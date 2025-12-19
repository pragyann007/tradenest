import { User } from "../models/User.model.js";
import { sendOtpMail } from "../service/sendMail.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"


export const register = asyncHandler(async(req,res)=>{
console.log('hiiii')
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

export const change_password_0 = asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log(email)
  
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
  
    const user = await User.findOne({ email });
  
    // IMPORTANT: prevent email enumeration
    if (!user) {
      throw new ApiError(400,"No user found")
    }
  
    // Generate secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");
  
    // Hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save({ validateBeforeSave: false });
  
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
    await sendOtpMail(email, resetLink);
  
    return ApiResponse.success(
      res,
      {},
     `mail sent to ${email}`
    );
  });


  export const check_password_1 = asyncHandler(async (req, res) => {
    const { token } = req.query;
    const { password } = req.body;
  
    if (!token || !password) {
      throw new ApiError(400, "Invalid request");
    }
  
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
  
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
  
    if (!user) {
      throw new ApiError(400, "Token is invalid or expired");
    }
  
    user.password = password; // will be hashed by pre-save hook
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
  
    await user.save();
  
    return ApiResponse.success(
      res,
      {},
      "Password reset successfully"
    );
  });
  
