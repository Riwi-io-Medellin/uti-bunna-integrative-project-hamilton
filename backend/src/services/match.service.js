import { findMatchesForDriver } from "../repositories/match.repository.js"

export async function getMatchesForDriver(driverId) {
  const result = await findMatchesForDriver(driverId)
  return result.rows
}
