import ApiError from "../utils/ApiError.js";
export const validator = (schema, property = "body") => (req, res, next) => {
    console.log('hida')
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
    });
  
    if (error) {
      const messages = error.details.map(d => d.message);
      return next(new ApiError(422, "Validation Failed", messages));
    }
  
    req[property] = value;
    next();
  };
  