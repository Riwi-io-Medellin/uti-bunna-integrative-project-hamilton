import { recoverPassword } from "../services/user.service.js"

export const updatePassword = async (req, res, next) => {
  try {
    const userId = req.user.id
    const newPassword = req.body.password

    const updatedUser = await recoverPassword(userId, newPassword)

    res.status(200).json({
      message: "Password updated successfully",
      user: updatedUser
    })
  } catch (error) {
    if (error.message === "Invalid current password" || error.message === "User not found") {
      return res.status(400).json({ error: error.message })
    }
    next(error)
  }
}