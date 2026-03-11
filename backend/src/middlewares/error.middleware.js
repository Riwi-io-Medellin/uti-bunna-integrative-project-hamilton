// Global error-handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message)
  
  // Determine status code based on error message or type
  let statusCode = 500
  let errorMessage = "Internal server error"
  
  if (err.message === "User already exists") {
    statusCode = 409
    errorMessage = "User already exists"
  } else if (err.message === "Invalid credentials") {
    statusCode = 401
    errorMessage = "Invalid credentials"
  } else if (err.message) {
    // Use the error message for other known errors
    errorMessage = err.message
    // Check if it's a known client error (has statusCode property from express-validator or similar)
    if (err.statusCode) {
      statusCode = err.statusCode
    }
  }
  
  res.status(statusCode).json({
    message: errorMessage
  })
}

