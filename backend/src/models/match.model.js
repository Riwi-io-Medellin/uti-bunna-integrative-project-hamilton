export const MATCH_COLLECTION = "matchForUser"

export const ensureMatchIndexes = async (db) => {
  await db.collection(MATCH_COLLECTION).createIndex(
    { user_id: 1 },
    { unique: true }
  )
}
