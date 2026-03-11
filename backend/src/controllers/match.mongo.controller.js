import * as matchMongoService from "../services/match.mongo.service.js"

export const acceptPassenger = async (req, res, next) => {
  const driverId = req.user.id
  const passengerId = req.params.passengerId
  const { full_name, phone } = req.body

  if (!full_name || !phone) {
    return res.status(400).json({ error: "full_name and phone are required" })
  }

  try {
    const matchDocument = await matchMongoService.acceptPassenger(
      driverId,
      passengerId,
      { full_name, phone }
    )

    return res.status(200).json(matchDocument)
  } catch (error) {
    return next(error)
  }
}

export const getPassengerMatches = async (req, res, next) => {
  const passengerId = req.params.passengerId

  try {
    const matchDocument = await matchMongoService.getPassengerMatches(passengerId)

    if (!matchDocument) {
      return res.status(404).json({ error: "No matches found for this passenger" })
    }

    return res.status(200).json(matchDocument)
  } catch (error) {
    return next(error)
  }
}
