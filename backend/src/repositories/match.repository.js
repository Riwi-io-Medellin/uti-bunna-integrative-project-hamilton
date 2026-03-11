import pool from "../config/db.js"

export async function findMatchesForDriver(driverId) {
  const query = `
    SELECT 
      u.user_id,
      u.full_name,
      u.email,
      u.phone,
      u.shift,
      ST_AsGeoJSON(u.location) AS location
    FROM 
      users u
    WHERE 
      u.role = 'passenger'
      AND u.shift = (
        SELECT us.shift 
        FROM users us 
        WHERE us.user_id = $1
      )
      AND ST_Within(
        u.location::geometry,
        (SELECT d.route_bbox::geometry FROM drivers d WHERE d.user_id = $1)
      )
      AND ST_DWithin(
        u.location,
        (SELECT d.route FROM drivers d WHERE d.user_id = $1),
        1000
      )
    ORDER BY u.user_id
  `
  
  return pool.query(query, [driverId])
}
