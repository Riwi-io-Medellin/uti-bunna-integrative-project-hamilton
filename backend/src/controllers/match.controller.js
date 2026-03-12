import * as matchService from "../services/match.service.js"

export const getMatches = async (req, res, next) => {
  const driverId = req.user.id
  
  if (!driverId) {
    return res.status(400).json({ error: "Invalid driver id" })
  }
  
  try {
    const matches = await matchService.getMatchesForDriver(driverId)
    const driverResult = await matchService.getDriverRouteService(driverId)
    const driverRoute = driverResult ? driverResult.driverRoute : null
    res.status(200).json({ 
      driverId, 
      driverRoute,
      total: matches.length, 
      matches 
    })
  } catch (error) {
    next(error)
  }
}
