import ApiError from "../utils/ApiError";

export const validator = (schema,property="body")=>(req,res,next)=>{
    const {error,value} = schema.validate(req[property],{abortEarly:false});

    if(error){
        const message = error.details.map(d=>d.message);
        throw new ApiError(422,"Validation Failed",message)
    }
    req[property] = value ; 
    next()
}