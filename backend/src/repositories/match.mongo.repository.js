import { MatchModel } from "../models/match.model.js"

export const addMatchToPassenger = async (passengerId, driverData) => {
  const matchPayload = {
    driver_id: driverData.driver_id,
    full_name: driverData.full_name,
    phone: driverData.phone,
    matched_at: new Date(),
  }

  // Single query: upsert + return updated document
  // Before: two separate queries (updateOne + findOne)
  const doc = await MatchModel.findOneAndUpdate(
    {
      user_id: passengerId,
      "matches.driver_id": { $ne: driverData.driver_id },
    },
    {
      $push: { matches: matchPayload },
      $setOnInsert: { user_id: passengerId },
    },
    {
      upsert: true,
      returnDocument: 'after',
      runValidators: true,
    }
  )

  // doc is null when the driver was already in the list ($ne filter didn't match)
  // Return the existing document in that case - same response shape either way
  if (!doc) {
    return MatchModel.findOne({ user_id: passengerId }).lean()
  }

  return doc
}

export const getMatchesByPassenger = async (passengerId) => {
  return MatchModel.findOne({ user_id: passengerId }).lean()
}
