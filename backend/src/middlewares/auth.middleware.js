import jwt from "jsonwebtoken"
import { isBlacklisted } from "../utils/tokenBlacklist.js"

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" })
  }

  const token = authHeader.split(" ")[1]

  // Verificar si el token está en la lista negra (logout realizado)
  if (isBlacklisted(token)) {
    return res.status(401).json({ error: "Token has been revoked" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {
      id: decoded.id,
      role: decoded.role
    }
    next()
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" })
  }
}

