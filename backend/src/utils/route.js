/**
 * Utility to get route information from OSRM API
 */

const OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1/driving'

/**
 * Fetches route information from OSRM API
 * @param {number} lon1 - Starting longitude
 * @param {number} lat1 - Starting latitude
 * @param {number} lon2 - Destination longitude
 * @param {number} lat2 - Destination latitude
 * @returns {Promise<{route: object, bbox: object}>} Route geometry and bounding box
 */
export const getRouteFromOSRM = async (lon1, lat1, lon2, lat2) => {
  const url = `${OSRM_BASE_URL}/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`
  
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`OSRM API error: ${response.status}`)
  }
  
  const data = await response.json()
  
  if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
    throw new Error('No route found')
  }
  
  const routeGeometry = data.routes[0].geometry
  
  // Calculate bounding box from the route coordinates
  const bbox = calculateBoundingBox(routeGeometry.coordinates)
  
  return {
    route: routeGeometry,
    bbox
  }
}

/**
 * Calculates bounding box from coordinates
 * @param {Array<Array<number>>} coordinates - Array of [lon, lat] pairs
 * @returns {object} Bounding box as GeoJSON Polygon
 */
const calculateBoundingBox = (coordinates) => {
  let minLon = Infinity
  let maxLon = -Infinity
  let minLat = Infinity
  let maxLat = -Infinity
  
  for (const [lon, lat] of coordinates) {
    minLon = Math.min(minLon, lon)
    maxLon = Math.max(maxLon, lon)
    minLat = Math.min(minLat, lat)
    maxLat = Math.max(maxLat, lat)
  }
  
  // Add a small buffer
  const buffer = 0.01
  minLon -= buffer
  maxLon += buffer
  minLat -= buffer
  maxLat += buffer
  
  // Return as GeoJSON Polygon
  return {
    type: 'Polygon',
    coordinates: [[
      [minLon, minLat],
      [maxLon, minLat],
      [maxLon, maxLat],
      [minLon, maxLat],
      [minLon, minLat]
    ]]
  }
}
