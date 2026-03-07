import * as userRepository from "../repositories/user.repository.js"
import {hashPassword} from "../utils/hash.js"
import {generateToken} from "../utils/jwt.js"

export const register = async (userData) => {
  const { fullName, email, password, role, shift, phone, address, location } = userData

  const existingUser = await userRepository.findUserByEmail(email)

  if(existingUser.rowCount > 0){
     throw new Error("User already exists")
  }

  const hashedPassword = await hashPassword(password)

  const user = await userRepository.createUser({
    fullName,
    email,
    passwordHash: hashedPassword,
    role,
    shift,
    phone,
    address,
    location
  })

  const token = generateToken({
     id: user.rows[0].user_id,
     role: user.rows[0].role
  })

  return {
    user: user.rows[0],
    token
  }
}

