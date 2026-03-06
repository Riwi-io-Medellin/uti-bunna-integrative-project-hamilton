const existingUser = await userRepository.findUserByEmail(email)

if(existingUser.rowCount > 0){
   throw new Error("User already exists")
}

const hashedPassword = await hashPassword(password)

const user = await userRepository.createUser(
   name,email,hashedPassword,role
)

const token = generateToken({
   id: user.rows[0].id,
   role: user.rows[0].role
})