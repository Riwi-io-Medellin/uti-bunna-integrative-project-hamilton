export const driverMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  if (req.user.role !== "driver") {
    return res.status(403).json({ error: "Access denied. Drivers only." })
  }

  req.driverId = req.user.id
  next()
}

