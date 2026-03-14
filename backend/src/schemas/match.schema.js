// Mongoose Schema - defines the shape and validation of MongoDB documents.
// Note: other files in this folder are AJV schemas for HTTP request validation.
// These are different tools with different purposes.

import mongoose from "mongoose"

// Shape of each match subdocument inside the matches array
const matchSubSchema = new mongoose.Schema(
  {
    driver_id: {
      type: Number,
      required: [true, "driver_id is required"],
    },
    full_name: {
      type: String,
      required: [true, "full_name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
      trim: true,
    },
    matched_at: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
)

// Shape of the main document: one passenger -> many matches
export const matchSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: [true, "user_id is required"],
      unique: true,
    },
    matches: {
      type: [matchSubSchema],
      default: [],
    },
  },
  {
    versionKey: false,
  }
)
