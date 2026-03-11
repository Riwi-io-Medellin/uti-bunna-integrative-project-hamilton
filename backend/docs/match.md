# Match Endpoint

## Overview

The match endpoint finds compatible passengers for a driver based on geographic and schedule criteria. The system applies sequential filters: role (passengers only), matching shift, location within driver's route area (bounding box), and distance less than 1 km from the driver's route.

## Endpoint

```
GET /api/drivers/matches
```

## Headers

| Header             | Required | Description                          |
|--------------------|----------|--------------------------------------|
| Authorization      | Yes      | Bearer token (JWT)                   |

## Example Requests

### cURL
```bash
curl -X GET http://localhost:3000/api/drivers/matches \
  -H "Authorization: Bearer <token>"
```

### JavaScript (fetch)
```javascript
fetch('http://localhost:3000/api/drivers/matches', {
  headers: {
    'Authorization': 'Bearer <token>'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
```

## Successful Response - 200 OK

### Matches Found
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
    }
  ]
}
```

### No Matches Found
```json
{
  "driverId": 1,
  "total": 0,
  "matches": []
}
```

## Error Responses

### No Token - 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### Invalid Token - 401 Unauthorized
```json
{
  "error": "Invalid token"
}
```

### Access Denied (Not a Driver) - 403 Forbidden
```json
{
  "error": "Access denied. Drivers only."
}
```

### Invalid Driver - 400 Bad Request
```json
{
  "error": "Invalid driver id"
}
```

## Matching Algorithm

The algorithm applies 4 sequential filters:

1. **Role Filter**: Only users with role = 'passenger'
2. **Shift Filter**: Only passengers with the same shift as the driver (morning/evening)
3. **Area Filter**: Only passengers within the route's bounding box
4. **Distance Filter**: Only passengers less than 1 km from the driver's route

## Location Data Format

The `location` field is a GeoJSON string that needs to be parsed:

```javascript
const locationData = JSON.parse(match.location);
const [longitude, latitude] = locationData.coordinates;
```

## Security Notes

1. The driver ID is extracted from the JWT token, not from the URL
2. Only users with role = 'driver' can access this endpoint
3. Tokens expire after the configured time (JWT_EXPIRES_IN)

