import pool from "../config/db.js"

export const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1
  `
  return pool.query(query,[email])
}

export const createUser = async (name,email,passwordHash,role) => {

  const query = `
    INSERT INTO users(name,email,password_hash,role)
    VALUES($1,$2,$3,$4)
    RETURNING id,name,email,role
  `

  return pool.query(query,[name,email,passwordHash,role])
}
