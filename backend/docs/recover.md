# Password Recovery Endpoints

## Overview

Updated flow requires authentication: users must be logged in (valid JWT auth token), provide their email in body, reset token (query), and new password. Ensures only account owner can reset password.

Tokens expire after 1h (JWT expiry).

## Flow

1. **Login** → Get auth JWT token
2. **Step 1**: Request reset email: `POST /api/auth/forgot-password` (body: email)
3. **Step 2**: Use auth token + reset token from email + email + new password: `POST /api/security/reset-password?token=...`

## Endpoints

### 1. Request Reset Email **(now requires auth)**
```
POST /api/auth/forgot-password
```
**Headers**: `Authorization: Bearer <auth-token>`

**Body**: `{ "email": "user@example.com" }`
*(email verified against logged-in user)*

### 2. Reset Password with Token + Auth
```
POST /api/security/reset-password?token=YOUR_RESET_TOKEN
```

**Headers**:
| Header | Value | Required |
|--------|-------|----------|
| Authorization | `Bearer YOUR_JWT_AUTH_TOKEN` | Yes |

**Request Body**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User's email (verified against auth user) |
| password | string | Yes | New password (min 6 chars) |

**Example**:
```bash
curl -X POST "http://localhost:3000/api/security/reset-password?token=eyJhbGciOiJIUzI1Ni..." \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1Ni...AUTH_TOKEN" \
  -d '{
    "email": "user@example.com",
    "password": "newSecurePassword123"
  }'
```

**Success (200)**:
```json
{
  "message": "Password updated successfully",
  "user": { ... }
}
```

## Security

- **Auth Token**: Verifies logged-in user owns reset token
- **Reset Token**: Query param, type-checked, matches auth user ID
- **Email**: Body param, verified belongs to user
- Stateless JWTs

## Frontend Example

```javascript
// User logged in, has authToken from login

// Step 1: forgot password
await fetch('/api/auth/forgot-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
  body: JSON.stringify({ email })
});

// Later, with resetToken from email
await fetch(`/api/security/reset-password?token=${resetToken}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  },
  body: JSON.stringify({ email, password: newPassword })
});
```

## Errors (examples)

- No/missing auth: `{ "error": "No token provided" }` (401)
- Invalid auth: `{ "error": "Invalid token" }` (401)
- Reset token mismatch: `{ "error": "Reset token not for this user" }` (401)
- Invalid email: `{ "error": "Invalid email" }` (400)
