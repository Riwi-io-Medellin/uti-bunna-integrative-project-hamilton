import { findUserById } from "../repositories/user.repository.js"
import {
  addMatchToPassenger,
  getMatchesByPassenger
} from "../repositories/match.mongo.repository.js"

export const acceptPassenger = async (driverId, passengerId) => {
  const [driverResult, passengerResult] = await Promise.all([
    findUserById(driverId),
    findUserById(passengerId)
  ])

  if (driverResult.rows.length === 0) throw new Error("Driver not found")
  if (passengerResult.rows.length === 0) throw new Error("Passenger not found")

  const passenger = passengerResult.rows[0]
  if (passenger.role !== "passenger") {
    throw new Error("Selected user is not a passenger")
  }

  const { full_name, phone } = driverResult.rows[0]

  return addMatchToPassenger(passengerId, {
    driver_id: driverId,
    full_name,
    phone
  })
}

export const getPassengerMatches = async (passengerId) => {
  return getMatchesByPassenger(passengerId)
}
