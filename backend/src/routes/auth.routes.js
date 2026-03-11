import {Router} from "express"
import * as authController from "../controllers/auth.controller.js"
import {validate} from "../middlewares/validation.middleware.js"
import {registerSchema} from "../schemas/register.schema.js"
import {loginSchema} from "../schemas/login.schema.js"

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

export default router

