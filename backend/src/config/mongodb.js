import mongoose from "mongoose"
import { config } from "dotenv"

config()

let isConnected = false

export const connectMongoDB = async () => {
  if (isConnected) {
    return
  }

  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error("MONGODB_URI is not defined")
  }

  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB_NAME || "matchForUser",
  })

  isConnected = true
  console.log("MongoDB connected via Mongoose")
}

// getDb() is no longer needed - Mongoose manages the connection internally.
// It is kept as a no-op export so that if any file still imports it,
// it won't crash. Remove once confirmed nothing imports it.
export const getDb = () => {
  throw new Error(
    "getDb() is deprecated after Mongoose migration. Use MatchModel directly."
  )
}
