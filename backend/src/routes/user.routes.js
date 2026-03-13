// user.routes.js
// Defines the user profile routes.
// Middleware chain: authMiddleware → validate(schema) → controller

import { Router } from "express"
import * as userController from "../controllers/user.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validation.middleware.js"
import { updateProfileSchema } from "../schemas/update-profile.schema.js"

const router = Router()

// PATCH /api/users/me
// Protected route: requires a valid Bearer JWT token.
// Only phone_number and password-related fields are accepted (enforced by schema).
router.patch(
  "/me",
  authMiddleware,           // 1. Verify JWT — populates req.user
  validate(updateProfileSchema), // 2. Validate body — rejects address + unknown fields
  userController.updateProfile   // 3. Execute business logic
)

export default router
