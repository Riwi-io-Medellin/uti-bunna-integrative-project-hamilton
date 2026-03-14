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

export const updateDriverRoute = async (userId, route, route_bbox) => {
  const query = `
    UPDATE drivers
    SET route = ST_GeomFromGeoJSON($2),
        route_bbox = ST_GeomFromGeoJSON($3)
    WHERE user_id = $1
    RETURNING user_id, ST_AsGeoJSON(route) as route, ST_AsGeoJSON(route_bbox) as route_bbox, created_at
  `

  return pool.query(query, [userId, JSON.stringify(route), JSON.stringify(route_bbox)])
}
export const findUserById = async (userId) => {
  const query = `
    SELECT user_id, full_name, phone, role
    FROM users
    WHERE user_id = $1
    `
  return pool.query(query, [userId])
}

//recover
export const updatePassword = async (userId, passwordHash) => {

  const query = `
    UPDATE users
    SET password_hash = $2
    WHERE user_id = $1
    RETURNING user_id, email
  `

  return pool.query(query, [userId, passwordHash])
}


//--


// Fetches the full user row including password_hash.
// Used by the profile-update service to verify the current password.
export const findUserWithPasswordById = async (userId) => {
  const query = `
    SELECT *
    FROM users
    WHERE user_id = $1
  `
  return pool.query(query, [userId])
}

// Dynamically updates only the fields provided (phone and/or password_hash).
// Builds the SET clause at runtime to avoid overwriting fields that were not changed.
export const updateUserProfile = async (userId, fields) => {
  // fields: { phone?: string, password_hash?: string }
  const keys = Object.keys(fields)

  // Build parameterised SET clause: e.g. "phone = $2, password_hash = $3"
  const setClauses = keys.map((key, index) => `${key} = $${index + 2}`).join(", ")
  const values = [userId, ...keys.map((key) => fields[key])]

  const query = `
    UPDATE users
    SET ${setClauses}
    WHERE user_id = $1
    RETURNING user_id, full_name, email, role, shift, phone, address, created_at
  `

  return pool.query(query, values)
}