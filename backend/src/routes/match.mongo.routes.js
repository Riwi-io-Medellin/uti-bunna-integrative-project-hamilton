import { Router } from "express"
import * as matchMongoController from "../controllers/match.mongo.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { driverMiddleware } from "../middlewares/driver.middleware.js"
import { mongoErrorHandler, mongoNotFoundHandler } from "../middlewares/match.mongo.error.middleware.js"

const router = Router()

router.post(
  "/:passengerId/accept",
  authMiddleware,
  driverMiddleware,
  matchMongoController.acceptPassenger
)

router.get(
  "/me",
  authMiddleware,
  matchMongoController.getPassengerMatches
)

router.use(mongoNotFoundHandler)
router.use(mongoErrorHandler)

export default router
