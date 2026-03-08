import * as matchService from "../services/match.service.js"

export const getMatches = async (req, res, next) => {
  const driverId = parseInt(req.params.driverId)
  
  if (isNaN(driverId)) {
    return res.status(400).json({ error: "Invalid driver id" })
  }
  
  try {
    const matches = await matchService.getMatchesForDriver(driverId)
    res.status(200).json({ 
      driverId, 
      total: matches.length, 
      matches 
    })
  } catch (error) {
    next(error)
  }
}
