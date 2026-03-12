import {Router} from "express"
import { updatePassword } from "../controllers/recoverPassword.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import {validate} from "../middlewares/validation.middleware.js"
import { passwordSchema } from "../schemas/password.schema.js"

const router = Router()

router.post(
  "/recoverPassword",
  authMiddleware,
  validate(passwordSchema),
  updatePassword
)



export default router

