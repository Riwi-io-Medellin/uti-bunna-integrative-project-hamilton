import { Router } from "express"
import * as matchController from "../controllers/match.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { driverMiddleware } from "../middlewares/driver.middleware.js"

const router = Router()

router.get("/matches", authMiddleware, driverMiddleware, matchController.getMatches)

export default router
