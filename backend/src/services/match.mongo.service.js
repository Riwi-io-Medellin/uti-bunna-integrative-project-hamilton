import {
  addMatchToPassenger,
  getMatchesByPassenger
} from "../repositories/match.mongo.repository.js"

export const acceptPassenger = async (driverId, passengerId, driverInfo) => {
  return addMatchToPassenger(passengerId, {
    driver_id: driverId,
    full_name: driverInfo.full_name,
    phone: driverInfo.phone
  })
}

export const getPassengerMatches = async (passengerId) => {
  return getMatchesByPassenger(passengerId)
}
