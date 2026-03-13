import {Router} from "express"
import { resetPasswordController } from "../controllers/resetPassword.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { recoverTokenMiddleware } from "../middlewares/recover.middleware.js"
import {validate} from "../middlewares/validation.middleware.js"
import { passwordSchema } from "../schemas/password.schema.js"

const router = Router()

router.post(
  "/reset-password",
  authMiddleware,
  recoverTokenMiddleware,
  validate(passwordSchema),
  resetPasswordController
)



export default router

