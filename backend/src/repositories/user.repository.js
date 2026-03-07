import pool from "../config/db.js"

export const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1
  `
  return pool.query(query,[email])
}

export const createUser = async (userData) => {
  const { fullName, email, passwordHash, role, shift, phone, address, location } = userData

  const query = `
    INSERT INTO users(full_name, email, password_hash, role, shift, phone, address, location)
    VALUES($1,$2,$3,$4,$5,$6,$7,ST_GeomFromGeoJSON($8))
    RETURNING user_id, full_name, email, role, shift, phone, address, ST_AsGeoJSON(location) as location, created_at
  `

  const values = [fullName, email, passwordHash, role, shift, phone, address, JSON.stringify(location)]

  return pool.query(query, values)
}
