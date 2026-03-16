# Profile Update Endpoint

## Overview

The profile update endpoint allows authenticated users to update their phone number and/or password. The endpoint requires JWT authentication and validates the request against a strict schema that only allows `phone_number`, `currentPassword`, and `newPassword`.

**Key Security Features:**
- Password changes require verification of the current password
- Phone number follows strict format validation (digits only, 7-15 chars)
- No other fields (like email, name, or address) can be updated through this endpoint

## Endpoint

```
PATCH /api/users/me
```

**Authorization:** `Bearer <JWT_TOKEN>`

## Request Headers

| Header              | Value                  | Description                  |
|---------------------|------------------------|------------------------------|
| Authorization       | Bearer <token>         | JWT token from login/register |
| Content-Type        | application/json       | JSON request body            |

## Request Body

| Field          | Type   | Required¹ | Description                                      |
|----------------|--------|-----------|--------------------------------------------------|
| phone_number   | string | No        | New phone number (+ optional, 7-15 digits)       |
| currentPassword| string | No²       | Current password (required if changing password) |
| newPassword    | string | No²       | New password (min 6 characters)                  |

¹ At least one field must be provided  
² `newPassword` requires `currentPassword`

## Example Requests

### Update Phone Number Only

#### cURL
```bash
curl -X PATCH http://localhost:3000/api/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "+1234567890"
  }'
```

#### JavaScript (fetch)
```javascript
fetch('http://localhost:3000/api/users/me', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    phone_number: '+1234567890'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
```

### Update Password (Requires Current Password)

#### cURL
```bash
curl -X PATCH http://localhost:3000/api/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "oldpassword123",
    "newPassword": "newsecure456"
  }'
```

#### JavaScript (fetch)
```javascript
fetch('http://localhost:3000/api/users/me', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    currentPassword: 'oldpassword123',
    newPassword: 'newsecure456'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
```

### Update Both Phone and Password

#### JSON Body
```json
{
  "phone_number": "+0987654321",
  "currentPassword": "oldpassword123",
  "newPassword": "newsecure456"
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
    "updated_at": "2024-01-15T12:00:00.000Z"
  }
}
```

## Error Responses

### Validation Error - 400 Bad Request
```json
{
  "errors": [
    {
      "instancePath": "/phone_number",
      "schemaPath": "#/properties/phone_number/pattern",
      "keyword": "pattern",
      "params": { "pattern": "^\\\\+?[0-9]{7,15}$" },
      "message": "must match pattern \"^\\\\+?[0-9]{7,15}$\""
    }
  ]
}
```

### Missing Current Password - 400 Bad Request
```json
{
  "message": "currentPassword is required to set a new password"
}
```

### Invalid Current Password - 401 Unauthorized
```json
{
  "message": "Current password is incorrect"
}
```

### User Not Found - 404 Not Found
```json
{
  "message": "User not found"
}
```

### Unauthorized - 401 Unauthorized (No/Invalid Token)
```json
{
  "message": "Unauthorized"
}
```

## Validation Rules

| Field          | Rules                                           |
|----------------|-------------------------------------------------|
| phone_number   | Optional, `+` prefix optional, 7-15 digits only |
| currentPassword| Required when `newPassword` provided, ≥6 chars |
| newPassword    | ≥6 characters, requires `currentPassword`      |

**Phone Pattern:** `^\+?[0-9]{7,15}$`  
**Examples:** `+1234567890`, `1234567890`, `+5511999999999`

## Security Features

1. **JWT Authentication Required** - `authMiddleware` verifies token and sets `req.user.id`
2. **Password Hashing** - New passwords hashed with bcrypt before storage
3. **Current Password Verification** - `bcrypt.compare()` validates old password
4. **Strict Schema** - `additionalProperties: false` blocks unauthorized fields
5. **No Password Exposure** - Response excludes `password_hash`

## Implementation Flow

```
1. authMiddleware → verifies JWT → sets req.user.id
2. validate(updateProfileSchema) → AJV validation
3. userController.updateProfile() → calls service
4. userService.updateProfile() →
   a. Fetch user with password_hash
   b. Verify currentPassword (if provided)
   c. Hash newPassword (if provided)
   d. Update phone/password_hash
   e. Return user without password_hash
5. res.status(200).json(result)
