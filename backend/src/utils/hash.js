import bcrypt from "bcrypt"

export const hashPassword = async (password) => {
  const saltRounds = Number(process.env.BCRYPT_ROUNDS)
  return bcrypt.hash(password, saltRounds)
}
