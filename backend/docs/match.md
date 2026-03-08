# Match Endpoint

## Overview

The match endpoint finds compatible passengers for a specific driver based on geographic and schedule criteria. The system applies sequential filters to ensure only the most relevant matches are returned.

Matching is based on:
- Role (passengers only)
- Matching shift (morning/evening)
- Location within driver's route area (bounding box)
- Distance less than 1 km from the driver's route

## Endpoint

```
GET /api/drivers/:driverId/matches
```

## URL Parameters

| Parameter | Type    | Required | Description                              |
|-----------|---------|----------|------------------------------------------|
| driverId  | integer | Yes      | The ID of the driver to find matches for |

## Example Requests

### Get Matches for Driver

#### cURL
```bash
curl -X GET http://localhost:3000/api/drivers/1/matches
```

#### JavaScript (fetch)
```javascript
fetch('http://localhost:3000/api/drivers/1/matches')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
```

#### Axios
```javascript
import axios from 'axios';

const getMatches = async (driverId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/drivers/${driverId}/matches`);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
};

// Usage
const matches = await getMatches(1);
```

## Successful Response

### Matches Found - 200 OK
```json
{
  "driverId": 1,
  "total": 3,
  "matches": [
    {
      "user_id": 5,
      "full_name": "Maria Gonzalez",
      "email": "maria@example.com",
      "phone": "+1234567891",
      "shift": "morning",
      "location": "{\"type\":\"Point\",\"coordinates\":[-75.583,6.219]}"
    },
    {
      "user_id": 8,
      "full_name": "Juan Perez",
      "email": "juan@example.com",
      "phone": "+1234567892",
      "shift": "morning",
      "location": "{\"type\":\"Point\",\"coordinates\":[-75.584,6.220]}"
    },
    {
      "user_id": 12,
      "full_name": "Ana Lopez",
      "email": "ana@example.com",
      "phone": "+1234567893",
      "shift": "morning",
      "location": "{\"type\":\"Point\",\"coordinates\":[-75.582,6.218]}"
    }
  ]
}
```

### No Matches Found - 200 OK
```json
{
  "driverId": 1,
  "total": 0,
  "matches": []
}
```

## Error Responses

### Invalid Driver ID - 400 Bad Request
```json
{
  "error": "Invalid driver id"
}
```

### Driver Not Found - 200 OK
```json
{
  "driverId": 999,
  "total": 0,
  "matches": []
}
```

Note: If the driver doesn't exist or has no route configured, the endpoint returns an empty matches array rather than an error.

## How It Works

The matching algorithm applies 4 sequential filters to find compatible passengers:

```
1. ROLE FILTER
   ↓ Only users with role = 'passenger'
   
2. SHIFT FILTER
   ↓ Only passengers with the same shift as the driver
   
3. AREA FILTER (BBOX)
   ↓ Only passengers within the route's rectangular area
   
4. DISTANCE FILTER
   ↓ Only passengers less than 1 km from the actual route
   
FINAL RESULT: List of compatible passengers
```

## How It Works

The matching algorithm applies 4 sequential filters to find compatible passengers:

### Step 1: Role Filter
```sql
WHERE u.role = 'passenger'
```
Filters out all drivers from the results, leaving only passengers.

### Step 2: Shift Filter
```sql
AND u.shift = (SELECT shift FROM users WHERE user_id = $1)
```
Only includes passengers whose shift (morning/evening) matches the driver's shift. This ensures drivers and passengers are available at the same time.

### Step 3: Bounding Box Filter
```sql
AND ST_Within(u.location::geometry, driver.route_bbox::geometry)
```
Checks if the passenger's location falls within the rectangular bounding box of the driver's route. This is a fast spatial filter that eliminates passengers outside the general route area.

### Step 4: Distance Filter
```sql
AND ST_DWithin(u.location, driver.route, 1000)
```
Calculates the actual distance between the passenger's location and the driver's route. Only passengers within 1000 meters (1 km) of the route are included.

### Result
The final result contains passengers who pass all four filters, ordered by user_id.

## Location Data Format

The `location` field in the response is a GeoJSON string that needs to be parsed:

```javascript
// Parse the location field
const passenger = matches[0];
const locationData = JSON.parse(passenger.location);

// Extract coordinates
const [longitude, latitude] = locationData.coordinates;

console.log(`${passenger.full_name} is at:`, latitude, longitude);
```

For use with mapping libraries:
```javascript
// Leaflet
L.marker([latitude, longitude]).addTo(map);

// Google Maps
new google.maps.Marker({
  position: { lat: latitude, lng: longitude },
  map: map
});
```

## Frontend Implementation Examples

### React Component with useState

### React Component with useState

```jsx
import { useState, useEffect } from 'react';

function MatchList({ driverId }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMatches() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/drivers/${driverId}/matches`
        );
        
        if (!response.ok) {
          throw new Error('Failed to load matches');
        }
        
        const data = await response.json();
        setMatches(data.matches);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    loadMatches();
  }, [driverId]);

  if (loading) return <div>Loading matches...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Compatible Passengers ({matches.length})</h2>
      {matches.length === 0 ? (
        <p>No matches found for this driver.</p>
      ) : (
        <ul>
          {matches.map(match => {
            const location = JSON.parse(match.location);
            const [lng, lat] = location.coordinates;
            
            return (
              <li key={match.user_id}>
                <strong>{match.full_name}</strong>
                <br />
                Email: {match.email}
                <br />
                Phone: {match.phone}
                <br />
                Shift: {match.shift}
                <br />
                Location: {lat.toFixed(4)}, {lng.toFixed(4)}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MatchList;
```

## Code Architecture

The match endpoint follows the standard layered architecture:

```
src/
├── repositories/
│   └── match.repository.js      → Database queries with PostGIS functions
│
├── services/
│   └── match.service.js         → Business logic layer
│
├── controllers/
│   └── match.controller.js      → Request/response handling and validation
│
└── routes/
    └── match.routes.js          → Route definitions
```

### Data Flow
```
Client Request
    ↓
Route (match.routes.js)
    ↓
Controller (validates driverId)
    ↓
Service (calls repository)
    ↓
Repository (executes SQL query)
    ↓
PostgreSQL + PostGIS
    ↓
Result.rows (array of matches)
    ↓
Service (returns rows)
    ↓
Controller (formats response)
    ↓
Client Response (JSON)
```

## Database Requirements

### Required Extensions
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

### Required Tables

#### users table
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('driver', 'passenger')),
  shift VARCHAR(50) NOT NULL CHECK (shift IN ('morning', 'evening')),
  phone VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### drivers table
```sql
CREATE TABLE drivers (
  user_id INTEGER PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
  route GEOGRAPHY(LINESTRING, 4326),
  route_bbox GEOGRAPHY(POLYGON, 4326),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Spatial Indexes (Recommended for Performance)
```sql
CREATE INDEX idx_users_location ON users USING GIST (location);
CREATE INDEX idx_drivers_route ON drivers USING GIST (route);
CREATE INDEX idx_drivers_route_bbox ON drivers USING GIST (route_bbox);
```

## Testing the Endpoint

### Prerequisites
1. Server running on port 3000 (use `npm start`)
2. Database connection configured in `.env`
3. At least one driver with a route in the database
4. Some passengers registered in the system

### Test Case 1: Driver with Matches
```bash
curl http://localhost:3000/api/drivers/1/matches
```

Expected: 200 OK with array of matched passengers

### Test Case 2: Driver without Matches
```bash
curl http://localhost:3000/api/drivers/999/matches
```

Expected: 200 OK with empty matches array

### Test Case 3: Invalid Driver ID
```bash
curl http://localhost:3000/api/drivers/abc/matches
```

Expected: 400 Bad Request with error message

## Notes

### Performance Considerations
- The bounding box filter (Step 3) uses spatial indexes for fast filtering
- Distance calculations (Step 4) are only performed on passengers within the bbox
- Consider adding pagination for drivers with many potential matches

### Coordinate System
- SRID 4326: WGS84 (standard GPS coordinates)
- Coordinates format: [longitude, latitude]
- Distance calculations are in meters

### Configuration
- Default search radius: 1000 meters (1 km)
- Can be adjusted in `match.repository.js` line 28
- Modify the `ST_DWithin` function's third parameter

### Error Handling
- Invalid driver IDs return 400 Bad Request
- Database errors are caught and passed to error middleware
- Non-existent drivers return empty matches array (not an error)

## Future Enhancements

- Add pagination support for large result sets
- Allow custom search radius via query parameter
- Include calculated distance to route in response
- Add time-based filtering (specific pickup times)
- Implement result caching for frequently queried drivers
- Add sorting options (by distance, alphabetically, etc.)
