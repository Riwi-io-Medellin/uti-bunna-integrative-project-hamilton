import {Router} from "express"
import * as authController from "../controllers/auth.controller.js"
import {validate} from "../middlewares/validation.middleware.js"
import {registerSchema} from "../schemas/register.schema.js"

const router = Router()

router.post(
  "/register",
  validate(registerSchema),
  authController.register
)

export default router

