import mongoose from "mongoose"
import { matchSchema } from "../schemas/match.schema.js"

// Collection name stays the same: "matchForUser"
export const MatchModel = mongoose.model("matchForUser", matchSchema)
