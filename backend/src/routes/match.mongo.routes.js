import { Router } from "express"
import * as matchMongoController from "../controllers/match.mongo.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { driverMiddleware } from "../middlewares/driver.middleware.js"

const router = Router()

router.post(
  "/:passengerId/accept",
  authMiddleware,
  driverMiddleware,
  matchMongoController.acceptPassenger
)

router.get(
  "/:passengerId",
  authMiddleware,
  matchMongoController.getPassengerMatches
)

export default router
