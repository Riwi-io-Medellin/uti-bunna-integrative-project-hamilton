import { findMatchesForDriver, getDriverRoute } from "../repositories/match.repository.js"

export async function getMatchesForDriver(driverId) {
  const result = await findMatchesForDriver(driverId)
  return result.rows
}

export async function getDriverRouteService(driverId) {
  const result = await getDriverRoute(driverId)
  return result
}
