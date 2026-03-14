import jwt from "jsonwebtoken"

export const recoverTokenMiddleware = (req, res, next) => {
  const { token } = req.query

  if (!token) {
    return res.status(401).json({ error: "No reset token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.type !== "password-reset") {
      return res.status(401).json({ error: "Invalid token type" })
    }
    req.user = { id: decoded.userId }
    next()
    
  } catch (error) {
"Invalid or expired token"
  }
}