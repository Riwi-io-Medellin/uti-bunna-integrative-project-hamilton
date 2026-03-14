import { HttpError } from "../utils/httpError.js"

export function mongoNotFoundHandler(req, res, next) {
  next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`))
}

export function mongoErrorHandler(error, req, res, next) {
  let statusCode = error instanceof HttpError ? error.statusCode : 500

  if (error?.code === "23505") {
    statusCode = 409
  }

  // Mongoose duplicate key error (unique index violation)
  if (error?.code === 11000) {
    statusCode = 409
  }

  // Mongoose schema validation error
  if (error?.name === "ValidationError") {
    statusCode = 400
  }

  // Mongoose cast error (wrong type passed, e.g. string where Number expected)
  if (error?.name === "CastError") {
    statusCode = 400
  }

  if (error?.name === "ValidationError") {
    statusCode = 400
  }

  const payload = {
    success: false,
    message: error.message || "Internal server error"
  }

  if (error instanceof HttpError && error.details) {
    payload.details = error.details
  }

  res.status(statusCode).json(payload)
}

