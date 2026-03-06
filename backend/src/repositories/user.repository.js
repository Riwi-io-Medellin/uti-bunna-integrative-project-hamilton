export const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1
  `
  return pool.query(query,[email])
}

export const createUser = async (name,email,password,role) => {

  const query = `
    INSERT INTO users(name,email,password,role)
    VALUES($1,$2,$3,$4)
    RETURNING id,name,email,role
  `

  return pool.query(query,[name,email,password,role])
}