import { Router } from "express"
import * as matchController from "../controllers/match.controller.js"

const router = Router()

router.get("/:driverId/matches", matchController.getMatches)

export default router
