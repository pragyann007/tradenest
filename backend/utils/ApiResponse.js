class ApiResponse {
    static success(res, data = {}, message = "Success", statusCode = 200) {
      res.status(statusCode).json({
        success: true,
        message,
        data
      })
    }
  
    static error(res, message = "Error", statusCode = 500, errors = []) {
      res.status(statusCode).json({
        success: false,
        message,
        errors
      })
    }
  }
  
export default ApiResponse ;  