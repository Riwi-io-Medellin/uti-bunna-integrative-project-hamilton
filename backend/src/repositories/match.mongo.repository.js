import { getDb } from "../config/mongodb.js"
import { MATCH_COLLECTION } from "../models/match.model.js"

export const addMatchToPassenger = async (passengerId, driverData) => {
  const db = getDb()

  const matchPayload = {
    driver_id: driverData.driver_id,
    full_name: driverData.full_name,
    phone: driverData.phone,
    matched_at: new Date()
  }

  await db.collection(MATCH_COLLECTION).updateOne(
    {
      user_id: passengerId,
      "matches.driver_id": { $ne: driverData.driver_id }
    },
    {
      $push: { matches: matchPayload },
      $setOnInsert: { user_id: passengerId }
    },
    { upsert: true }
  )

  return db.collection(MATCH_COLLECTION).findOne({ user_id: passengerId })
}

export const getMatchesByPassenger = async (passengerId) => {
  const db = getDb()

  return db.collection(MATCH_COLLECTION).findOne({ user_id: passengerId })
}
