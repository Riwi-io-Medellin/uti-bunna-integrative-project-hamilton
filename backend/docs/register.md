# Register Endpoint

## Overview

The register endpoint allows new users to create an account in the system. Users can register as either a `driver` or a `passenger`.

The request body is the same for both roles. The driver profile is created and updated automatically by the backend:

When a user registers with `role = "driver"`:
1. A driver profile is automatically created via database trigger
2. The system calculates the route from the user's location to the RIWI destination using OSRM API
3. The driver record is updated with the calculated route and bounding box

The route is calculated automatically using:
- User's `location` coordinates from the request
- RIWI destination coordinates from environment variables (`RIWI_LAT` and `RIWI_LON`)

> **Note:** No additional parameters are needed for drivers. The driver profile is handled entirely by the backend.

## Endpoint

```
POST /api/auth/register
```

## Request Body

| Field    | Type   | Required | Description                              |
|----------|--------|----------|------------------------------------------|
| fullName | string | Yes      | User's full name (min 2 characters)     |
| email    | string | Yes      | User's email address (valid format)     |
| password | string | Yes      | User's password (min 6 characters)      |
| role     | string | Yes      | User role: "driver" or "passenger"     |
| shift    | string | Yes      | User shift: "morning" or "evening"     |
| phone    | string | Yes      | User's phone number                      |
| address  | string | Yes      | User's address                           |
| location | object | Yes      | User's location (GeoJSON Point)         |

### Location Object Structure
```json
{
  "type": "Point",
  "coordinates": [longitude, latitude]
}
```

## Example Requests

### Register as Passenger

#### cURL
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "passenger",
    "shift": "morning",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country",
    "location": {
      "type": "Point",
      "coordinates": [-74.006, 40.7128]
    }
  }'
```

#### JavaScript (fetch)
```javascript
fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fullName: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'passenger',
    shift: 'morning',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
    location: {
      type: 'Point',
      coordinates: [-74.006, 40.7128]
    }
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
```

#### JSON Body
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "passenger",
  "shift": "morning",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country",
  "location": {
    "type": "Point",
    "coordinates": [-74.006, 40.7128]
  }
}
```

### Register as Driver

#### cURL
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "password": "securepass456",
    "role": "driver",
    "shift": "evening",
    "phone": "+0987654321",
    "address": "456 Oak Ave, City, Country",
    "location": {
      "type": "Point",
      "coordinates": [-73.985, 40.748]
    }
  }'
```

#### JavaScript (fetch)
```javascript
fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    password: 'securepass456',
    role: 'driver',
    shift: 'evening',
    phone: '+0987654321',
    address: '456 Oak Ave, City, Country',
    location: {
      type: 'Point',
      coordinates: [-73.985, 40.748]
    }
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
```

#### JSON Body
```json
{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "password": "securepass456",
  "role": "driver",
  "shift": "evening",
  "phone": "+0987654321",
  "address": "456 Oak Ave, City, Country",
  "location": {
    "type": "Point",
    "coordinates": [-73.985, 40.748]
  }
}
```

## Successful Responses

### Passenger Registration - 201 Created
```json
{
  "user": {
    "user_id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "role": "passenger",
    "shift": "morning",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country",
    "location": {
      "type": "Point",
      "coordinates": [-74.006, 40.7128]
    },
    "created_at": "2024-01-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Driver Registration - 201 Created
```json
{
  "user": {
    "user_id": 2,
    "full_name": "Jane Smith",
    "email": "jane@example.com",
    "role": "driver",
    "shift": "evening",
    "phone": "+0987654321",
    "address": "456 Oak Ave, City, Country",
    "location": {
      "type": "Point",
      "coordinates": [-73.985, 40.748]
    },
    "created_at": "2024-01-15T10:30:00.000Z"
  },
  "driver": {
    "user_id": 2,
    "route": {
      "type": "LineString",
      "coordinates": [
        [-73.985, 40.748],
        [-73.99, 40.75],
        [-73.995, 40.752],
        [-75.583, 6.219]
      ]
    },
    "route_bbox": {
      "type": "Polygon",
      "coordinates": [[
        [-74.0, 40.74],
        [-73.98, 40.74],
        [-73.98, 40.76],
        [-74.0, 40.76],
        [-74.0, 40.74]
      ]]
    },
    "created_at": "2024-01-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Error Responses

### Validation Error - 400 Bad Request
```json
{
  "errors": [
    {
      "instancePath": "/fullName",
      "schemaPath": "#/properties/fullName/minLength",
      "keyword": "minLength",
      "params": { "limit": 2 },
      "message": "must NOT have fewer than 2 characters"
    }
  ]
}
```

### Invalid Role - 400 Bad Request
```json
{
  "errors": [
    {
      "instancePath": "/role",
      "schemaPath": "#/properties/role/enum",
      "keyword": "enum",
      "params": { "allowedValues": ["driver", "passenger"] },
      "message": "must be one of the allowed values"
    }
  ]
}
```

### User Already Exists - 400 Bad Request
```json
{
  "message": "User already exists"
}
```

## Validation Rules

| Field    | Rules                                                    |
|----------|----------------------------------------------------------|
| fullName | String, minimum 2 characters                            |
| email    | Valid email format                                      |
| password | String, minimum 6 characters                            |
| role     | Must be "driver" or "passenger"                        |
| shift    | Must be "morning" or "evening"                         |
| phone    | String, not empty                                      |
| address  | String, not empty                                      |
| location | GeoJSON Point with [longitude, latitude] coordinates    |

## Coordinate Format

All geographic coordinates follow the GeoJSON standard:
- **Point**: `[longitude, latitude]`

Example coordinates (New York City):
- Longitude: -74.006 (range: -180 to 180)
- Latitude: 40.7128 (range: -90 to 90)
