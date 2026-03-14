import jwt from "jsonwebtoken"

export const generateResetToken = (userId) => {
  return jwt.sign(
    {
      userId,
      type: "password-reset"
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  )
}