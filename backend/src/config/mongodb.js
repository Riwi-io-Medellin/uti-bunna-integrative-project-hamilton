import { MongoClient } from "mongodb"
import { config } from "dotenv"
import { ensureMatchIndexes } from "../models/match.model.js"

config()

let client = null
let database = null

export const connectMongoDB = async () => {
  if (database) {
    return database
  }

  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error("MONGODB_URI is not defined")
  }

  client = new MongoClient(uri)
  await client.connect()
  database = client.db()
  await ensureMatchIndexes(database)

  return database
}

export const getDb = () => {
  if (!database) {
    throw new Error("MongoDB is not connected")
  }

  return database
}
