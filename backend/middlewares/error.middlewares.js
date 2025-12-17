import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

export const errorHandler = (err, req, res, next) => {
    let error = err
  if (err.name === "CastError") {
    error = new ApiError(400, "Invalid ID format")
  }

  // MongoDB duplicate key
  if (err.code === 11000) {
    error = new ApiError(
      409,
      "Duplicate field value",
      Object.keys(err.keyValue)
    )
  }

  // Validation errors (mongoose)
  if (err.name === "ValidationError") {
    error = new ApiError(
      422,
      "Validation failed",
      Object.values(err.errors).map(e => e.message)
    )
  }

  ApiResponse.error(res, error.message, error.statusCode, error.errors)
}

