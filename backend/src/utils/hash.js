import bcrypt from "bcrypt"

export const hashPassword = async (password) => {
  const saltRounds = Number(process.env.BCRYPT_ROUNDS)
  return bcrypt.hash(password, saltRounds)
}

export const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword)
}
