import * as matchMongoService from "../services/match.mongo.service.js"

export const acceptPassenger = async (req, res, next) => {
  const driverId = req.user.id
  const passengerId = req.params.passengerId

  try {
    const matchDocument = await matchMongoService.acceptPassenger(driverId, passengerId)

    return res.status(200).json({
      ok: true,
      data: matchDocument,
      message: "match accepted successfully"
    })
  } catch (error) {
    return next(error)
  }
}

export const getPassengerMatches = async (req, res, next) => {
  if (req.user.role !== "passenger") {
    return res.status(403).json({
      ok: false,
      data: null,
      message: "Only passengers can view matches"
    })
  }

  const passengerId = req.user.id

  try {
    const matchDocument = await matchMongoService.getPassengerMatches(passengerId)

    if (!matchDocument) {
      return res.status(404).json({ ok: false, data: null, message: "No matches found for this passenger" })
    }

    return res.status(200).json({
      ok: true,
      data: matchDocument,
      message: "get matches successfully"
    })
  } catch (error) {
    return next(error)
  }
}
