import {Router} from "express"
import * as authController from "../controllers/auth.controller.js"
import {validate} from "../middlewares/validation.middleware.js"
import {registerSchema} from "../schemas/register.schema.js"
import {loginSchema} from "../schemas/login.schema.js"
import { forgotPasswordSchema } from "../schemas/forgotPassword.schema.js"
import { forgotPasswordController } from "../controllers/forgotPassword.controller.js"

const router = Router()

router.post(
  "/register",
  validate(registerSchema),
  authController.register
)

router.post(
  "/login",
  validate(loginSchema),
  authController.login
)

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPasswordController
)

export default router

