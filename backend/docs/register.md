# Register Endpoint

## Overview

The register endpoint allows new users to create an account in the system. Users can register as either a `driver` or a `passenger`. 

When a user registers with `role = "driver"`, the system automatically creates a driver profile with placeholder route data. The route can be updated later using the update driver endpoint.

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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> **Note:** When registering as a driver, the system automatically creates a driver profile with placeholder route data. Use the update driver endpoint to set the actual route later.

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
| location | GeoJSON Point with [longitude, latitude] coordinates  |

## Coordinate Format

All geographic coordinates follow the GeoJSON standard:
- **Point**: `[longitude, latitude]`

Example coordinates (New York City):
- Longitude: -74.006 (range: -180 to 180)
- Latitude: 40.7128 (range: -90 to 90)


