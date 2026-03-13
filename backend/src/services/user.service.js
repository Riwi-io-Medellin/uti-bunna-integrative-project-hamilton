import * as userRepository from "../repositories/user.repository.js"
import { hashPassword, verifyPassword } from "../utils/hash.js"



export const recoverPassword = async (userId, newPassword) => {
  const user = await userRepository.findUserById(userId)
  
  if (user.rowCount === 0) {
    throw new Error("User not found")
  }


  const hashedPassword = await hashPassword(newPassword)
  const result = await userRepository.updatePassword(userId, hashedPassword)

  return result.rows[0]
}