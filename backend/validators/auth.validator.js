import Joi from "joi"

export const registerSchema = Joi.object({
    name:Joi.string().required().min(2).max(50).required(),
    email:Joi.string().email().min(2).required(),
    password:Joi.string().min(8).max(50).required()
})

export const loginSchema = new Joi.object({
    email:Joi.string().email().min(2).required(),
    password:Joi.string().min(8).max(50).required()
    
})