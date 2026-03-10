# Logout Endpoint

## Overview

The logout endpoint allows authenticated users to log out of the system. It invalidates the JWT token by adding it to a blacklist, preventing future use of that token even if it hasn't expired.

## Endpoint

```
POST /api/auth/logout
```

## Headers

| Field          | Required | Description                        |
|----------------|----------|------------------------------------|
| Authorization  | Yes      | Bearer token (JWT)                |

## Example Requests

### cURL

```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### JavaScript (fetch)

```javascript
const logout = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:3000/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (response.ok) {
    // Remove token from client storage
    localStorage.removeItem('token');
    console.log('Logout successful');
  }
};

logout();
```

### JavaScript (axios)

```javascript
import axios from 'axios';

const logout = async () => {
  const token = localStorage.getItem('token');
  
  try {
    await axios.post('http://localhost:3000/api/auth/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Remove token from client storage
    localStorage.removeItem('token');
    console.log('Logout successful');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

logout();
```

## Successful Response - 200 OK

```json
{
  "message": "Logout successful"
}
```

## Error Responses

### Missing Token - 200 OK

```json
{
  "message": "Logout successful"
}
```

Note: Even if no token is provided, the endpoint returns 200 OK. The token will be removed from client storage regardless.

### Server Error - 500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

## How to Test

### Using Postman

1. **Login first** to get a valid token:
   - Send a POST request to `http://localhost:3000/api/auth/login`
   - With body: `{ "email": "user@example.com", "password": "password123" }`
   - Copy the `token` from the response

2. **Test the logout**:
   - Create a new POST request to `http://localhost:3000/api/auth/logout`
   - Go to the "Headers" tab
   - Add a new header:
     - Key: `Authorization`
     - Value: `Bearer <paste_your_token_here>`
   - Click "Send"

3. **Verify it works**:
   - You should receive: `{ "message": "Logout successful" }`
   - The token is now blacklisted on the server

4. **Try to use the token** (optional test):
   - Try to access a protected endpoint with the same token
   - The server will reject it because it's now blacklisted

### Using cURL

1. **Login and save token**:
   ```bash
   TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com","password":"password123"}' | jq -r '.token')
   ```

2. **Logout**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/logout \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $TOKEN"
   ```

3. **Expected response**:
   ```json
   {
     "message": "Logout successful"
   }
   ```

### Using JavaScript Console (in browser)

If your frontend is running:

```javascript
// Get the token
const token = localStorage.getItem('token');

// Make the logout request
fetch('http://localhost:3000/api/auth/logout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
})
.then(response => response.json())
.then(data => {
  console.log(data); // { message: "Logout successful" }
  localStorage.removeItem('token'); // Remove from client
})
.catch(error => console.error('Error:', error));
```

## Security Notes

1. **Token is blacklisted on server**: Even if someone steals the token, they cannot use it after logout
2. **Client-side token removal**: Always remove the token from localStorage/sessionStorage on the client side
3. **Blacklist is in-memory**: The current implementation stores blacklisted tokens in memory. They will be lost if the server restarts. For production, consider using Redis or database storage.
4. **Token expiration**: The token will still expire at its scheduled time (1 day by default), but logging out immediately invalidates it

## Token Blacklist Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   Server    │────▶│ Blacklist   │
│             │     │  /logout    │     │   (Set)     │
│ Sends token │     │ Add to list │     │  token.js   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│   Remove    │     │   Response  │
│ local token │     │   "success" │
└─────────────┘     └─────────────┘
```

