import { connectMongoDB, getDb } from "../config/mongodb.js"
import { MATCH_COLLECTION } from "../models/match.model.js"

export const addMatchToPassenger = async (passengerId, driverData) => {
  await connectMongoDB()
  const db = getDb()
  const id = Number(passengerId)

  const matchPayload = {
    driver_id: driverData.driver_id,
    full_name: driverData.full_name,
    phone: driverData.phone,
    matched_at: new Date()
  }

  try {
    await db.collection(MATCH_COLLECTION).updateOne(
      {
        user_id: id,
        "matches.driver_id": { $ne: driverData.driver_id }
      },
      {
        $push: { matches: matchPayload },
        $setOnInsert: { user_id: id }
      },
      { upsert: true }
    )
  } catch (error) {
    // When the passenger already exists and driver_id is duplicated,
    // the upsert path can hit unique index user_id_1. This should be ignored.
    if (error?.code !== 11000) {
      throw error
    }
  }

  return db.collection(MATCH_COLLECTION).findOne({ user_id: id })
}

export const getMatchesByPassenger = async (passengerId) => {
  await connectMongoDB()
  const db = getDb()
  const id = Number(passengerId)

  return db.collection(MATCH_COLLECTION).findOne({ user_id: id })
}
