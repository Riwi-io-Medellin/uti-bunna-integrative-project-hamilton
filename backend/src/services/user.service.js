// user.service.js
// Business logic for user profile updates.
// Handles password verification, hashing, and delegation to the repository.

import * as userRepository from "../repositories/user.repository.js"
import { hashPassword, verifyPassword } from "../utils/hash.js"
import { HttpError } from "../utils/httpError.js"

/**
 * Updates a user's password and/or phone number.
 *
 * @param {number} userId  - The authenticated user's ID (extracted from JWT by authMiddleware)
 * @param {object} body    - Validated request body (phone_number, currentPassword, newPassword)
 * @returns {object}       - Updated user row without password_hash
 */
export const updateProfile = async (userId, body) => {
  const { phone_number, currentPassword, newPassword } = body

  // Rule: newPassword can only be set when currentPassword is also provided
  if (newPassword && !currentPassword) {
    throw new HttpError(400, "currentPassword is required to set a new password")
  }

  // Fetch the full user record (including password_hash) from the database
  const userResult = await userRepository.findUserWithPasswordById(userId)

  if (userResult.rowCount === 0) {
    throw new HttpError(404, "User not found")
  }

  const user = userResult.rows[0]

  // Validate the current password against the stored hash
  if (newPassword) {
    const isValid = await verifyPassword(currentPassword, user.password_hash)
    if (!isValid) {
      throw new HttpError(401, "Current password is incorrect")
    }
  }

  // Build the fields object to pass to the repository
  const fields = {}

  if (newPassword) {
    fields.password_hash = await hashPassword(newPassword)
  }

  if (phone_number) {
    fields.phone = phone_number
  }

  // Persist changes and get the updated row
  const updated = await userRepository.updateUserProfile(userId, fields)

  // Strip the password hash before returning to the client
  const { password_hash, ...safeUser } = updated.rows[0]

  return { user: safeUser }
}
