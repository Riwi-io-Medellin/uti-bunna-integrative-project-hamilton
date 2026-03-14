import { Router } from "express"
import * as userController from "../controllers/user.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validation.middleware.js"
import { updateProfileSchema } from "../schemas/update-profile.schema.js"

const router = Router()

router.patch(
  "/me",
  authMiddleware,
  validate(updateProfileSchema),
  userController.updateProfile 
)

export default router
