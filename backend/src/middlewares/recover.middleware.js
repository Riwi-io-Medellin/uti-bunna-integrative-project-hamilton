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
    if (decoded.userId !== req.user.id) {
      return res.status(401).json({ error: "Reset token not for this user" })
    }
    next()
    
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}

