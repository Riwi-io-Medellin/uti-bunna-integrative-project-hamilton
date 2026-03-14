# Password Recovery Endpoints

## Overview

The password recovery flow allows users to reset their password via email. The process has two steps: sending a reset email with a secure JWT token, and using that token to set a new password. Tokens expire after 1 hour (JWT expiry).

## Flow

1. **Step 1**: User requests password reset → Email with reset link sent
2. **Step 2**: User clicks link → Uses token to set new password

## Endpoints

### 1. Request Reset Email
```
POST /api/auth/forgot-password
```

**Request Body**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User email address |

**Example Request**:
```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

**Success Response (200 OK)**:
```json
{
  "message": "Password reset email sent. Check your inbox."
}
```

**Note**: Always returns success even if email doesn't exist (security).

### 2. Reset Password with Token
```
POST /api/security/reset-password?token=YOUR_TOKEN
```

**Headers**: None (token in query param)

**Request Body**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| password | string | Yes | New password (min 6 chars) |

**Example Request**:
```bash
curl -X POST "http://localhost:3000/api/security/reset-password?token=eyJhbGciOiJIUzI1Ni..." \
  -H "Content-Type: application/json" \
  -d '{
    "password": "newSecurePassword123"
  }'
```

**Success Response (200 OK)**:
```json
{
  "message": "Password reset successfully"
}
```

## Complete Example Flow

```bash
# Step 1: Request reset email
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'

# Check inbox for email containing link like:
# http://localhost:3000/reset-password?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Step 2: Use token from email link to reset password
curl -X POST "http://localhost:3000/api/security/reset-password?token=TOKEN_FROM_EMAIL" \
  -H "Content-Type: application/json" \
  -d '{"password": "newPassword123"}'
```

## Error Responses

### Invalid Email Format (400)
```json
{
  "errors": [{"instancePath": "/email", "message": "must match format \"email\""}]
}
```

### Invalid/Expired Token (401)
```json
{
  "error": "No reset token provided"
}
# or
{
  "error": "Invalid or expired reset token"
}
```

### Wrong Token Type (401)
```json
{
  "error": "Invalid token type"
}
```

### Password Too Short (400)
```json
{
  "errors": [{"instancePath": "/password", "message": "must be longer than or equal to 6 characters"}]
}
```

## Frontend Integration

**Reset Link Handling**:
```javascript
// Parse token from URL params
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token) {
  // Show reset password form
  document.getElementById('resetForm').style.display = 'block';
}

// Submit form
fetch(`/api/security/reset-password?token=${token}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ password: newPassword })
});
```

## Email Template

Emails contain:
- Subject: "Password recovery"
- Link: `http://localhost:3000/reset-password?token=xxx` (update to prod URL)
- HTML styled with click link

## Security Features

1. **Stateless JWT Tokens**: Signed with `JWT_SECRET`, 1h expiry, type="password-reset" 
2. **No Database Storage**: Stateless - no token table needed
3. **No Leakage**: Forgot-password always "success" response (security)
4. **Rate Limited**: Inherits express-rate-limit config
5. **Validated**: Schema validation + JWT middleware

## Production Notes

1. Update `mailer.utils.js` resetUrl to production domain
2. Configure proper CORS for frontend origin
3. Monitor email delivery logs
4. Use HTTPS for token links
