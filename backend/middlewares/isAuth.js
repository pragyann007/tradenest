import ApiError from "../utils/ApiError";
import jwt from "jsonwebtoken"

export const isAuth = async (req,res,next)=>{
    const token = req.cookies.accessToken ; 

    if(!token){
        throw new ApiError(403,"Forbidden , No token found ")
    }

    const decode_token = jwt.verify(token,process.env.SECRET) ; 

    req.user = decode_token ; 

    next()

}