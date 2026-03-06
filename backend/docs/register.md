# Register Endpoint

## Overview

The register endpoint allows new users to create an account in the system. Users can register as either a `driver` or a `passenger`.

## Endpoint

```
POST /api/auth/register
```

## Request Body

| Field    | Type   | Required | Description                          |
|----------|--------|----------|--------------------------------------|
| name     | string | Yes      | User's full name (min 2 characters) |
| email    | string | Yes      | User's email address (valid format) |
| password | string | Yes      | User's password (min 6 characters)  |
| role     | string | Yes      | User role: "driver" or "passenger"  |

## Example Request

### cURL

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "driver"
  }'
```

### JavaScript (fetch)

```javascript
fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'driver'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
```

### JSON Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "driver"
}
```

## Successful Response

**Status: 201 Created**

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "driver"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Error Responses

### Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "instancePath": "/name",
      "schemaPath": "#/properties/name/minLength",
      "keyword": "minLength",
      "params": { "limit": 2 },
      "message": "must NOT have fewer than 2 characters"
    }
  ]
}
```

### User Already Exists (400 Bad Request)

```json
{
  "message": "User already exists"
}
```

## Validation Rules

- **name**: Must be a string with minimum 2 characters
- **email**: Must be a valid email format
- **password**: Must be a string with minimum 6 characters
- **role**: Must be either "driver" or "passenger"


