# Update Profile Endpoint

## Overview
Allows authenticated users to update their personal information, including security credentials (password) and contact details (phone number and address).

## Endpoint
```http
PATCH /api/users/me
```

## Authentication
Requires a valid JWT token in the `Authorization` header.
- **Header:** `Authorization: Bearer <token>`

## Request Body
The request accepts the following fields. All are optional, but at least one must be provided.

```json
{
  "phone_number": "+573009876543",
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456",
  "address": "Calle 10 #45-12, Medellín"
}
```

| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| `phone_number` | string | 7–15 digits, optional `+` | New contact phone number. |
| `currentPassword` | string | min 6 characters | Required only if `newPassword` is provided. |
| `newPassword` | string | min 6 characters | The new password to set for the account. |
| `address` | string | min 1 character | New residential or contact address. |

## Responses

### 200 OK
Profile updated successfully. Returns the updated user object (without the password hash).

**Example Response:**
```json
{
  "user": {
    "user_id": 1,
    "full_name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "driver",
    "shift": "morning",
    "phone": "+573009876543",
    "address": "Calle 10 #45-12, Medellín",
    "created_at": "2026-03-12T10:00:00Z"
  }
}
```

### 400 Bad Request
- Validation error (e.g., phone number format incorrect).
- `newPassword` provided without `currentPassword`.

### 401 Unauthorized
- Missing or invalid authentication token.
- `currentPassword` does not match the stored password.

### 404 Not Found
- User account not found.

---

## Security Considerations
- Passwords are never returned in the response.
- `additionalProperties: false` is enforced in the schema to prevent unauthorized field updates (e.g., changing roles or emails via this endpoint).
- For drivers, changing the location (associated with the address) triggers a route recalculation with the OSRM API.
