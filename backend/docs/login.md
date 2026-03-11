# Login Endpoint

## Overview

The login endpoint allows existing users to authenticate into the system. It validates the user's credentials and returns a JWT token for subsequent authenticated requests.

## Endpoint

```
POST /api/auth/login
```

## Request Body

| Field   | Type   | Required | Description                          |
|---------|--------|----------|--------------------------------------|
| email   | string | Yes      | User's email address (valid format) |
| password| string | Yes      | User's password (min 6 characters)  |

## Example Requests

### cURL
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### JavaScript (fetch)
```javascript
fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
```

### JSON Body
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Successful Response - 200 OK

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

## Error Responses

### Validation Error - 400 Bad Request

```json
{
  "errors": [
    {
      "instancePath": "/email",
      "schemaPath": "#/properties/email/format",
      "keyword": "format",
      "params": { "format": "email" },
      "message": "must match format \"email\""
    }
  ]
}
```

### Invalid Credentials - 401 Unauthorized

```json
{
  "message": "Invalid credentials"
}
```

## Validation Rules

| Field   | Rules                                         |
|---------|-----------------------------------------------|
| email   | Valid email format                            |
| password| String, minimum 6 characters                  |

## Using the Token

The returned JWT token must be included in the `Authorization` header for subsequent requests:

```
Authorization: Bearer <token>
```

Example:
```bash
curl -X GET http://localhost:3000/api/protected-endpoint \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Token Details

- **Algorithm**: HS256
- **Expiration**: 1 day (configured via `JWT_EXPIRES_IN`)
- **Payload contains**:
  - `id`: User's unique identifier
  - `role`: User's role (driver or passenger)

## Security Notes

1. Passwords are stored as bcrypt hashes in the database
2. Login compares the provided password with the stored hash using `bcrypt.compare()`
3. Tokens expire after 1 day and must be renewed by logging in again

