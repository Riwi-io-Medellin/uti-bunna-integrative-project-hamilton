// user.controller.js
// Thin controller layer: receives HTTP request, delegates to service, returns HTTP response.
// All business logic lives in user.service.js.

import * as userService from "../services/user.service.js"

/**
 * PATCH /api/users/me
 * Allows an authenticated user to update their password and/or phone number.
 * req.user.id is populated by authMiddleware after JWT verification.
 */
export const updateProfile = async (req, res, next) => {
  try {
    const result = await userService.updateProfile(req.user.id, req.body)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}
