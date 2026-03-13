# Mongo Match API Guide

## What This Feature Does

This module stores accepted passenger-driver matches in MongoDB.

- PostgreSQL remains the source of truth for users and authentication.
- MongoDB stores the accepted match history for each passenger.
- Each document is grouped by passenger `user_id` and contains a `matches` array.

Example Mongo document:

```json
{
  "user_id": 103,
  "matches": [
    {
      "driver_id": 104,
      "full_name": "Driver Name",
      "phone": "+573001112233",
      "matched_at": "2026-03-11T20:00:00.000Z"
    }
  ]
}
```

## Environment Assumptions

This guide assumes your infrastructure is already deployed in the cloud.

Before testing, make sure:

1. The backend is already deployed or running.
2. PostgreSQL is reachable from the backend deployment.
3. MongoDB is reachable from the backend deployment.
4. The environment variables are configured in your deployment platform.

Minimum environment variables example:

```dotenv
PORT=3000
DATABASE_URL=postgres://user:password@host:5432/database
MONGODB_URI=mongodb://host:27017
MONGODB_DB_NAME=matchForUser
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

If you run the backend locally against cloud services, the usual command is:

```bash
cd backend
npm install
npm start
```

## Base URL

Replace the base URL with your deployed backend domain when testing from Postman or cURL.

Examples:

```text
http://localhost:3000
https://your-backend-domain.com
```

## Endpoints

### 1) Accept Passenger Match

`POST /api/matches/:passengerId/accept`

Use this endpoint when an authenticated driver accepts a passenger.

Auth requirements:

- `Authorization: Bearer <driver_token>`
- The authenticated user must have role `driver`

Path parameter:

- `passengerId`: passenger user ID from PostgreSQL

Request body:

```json
{}
```

Note:

- This endpoint does not currently require any body fields.
- Driver data is taken from the authenticated user in PostgreSQL.

Success response: `200 OK`

```json
{
  "ok": true,
  "data": {
    "_id": "69b2080d8a9106fa9c014acb",
    "user_id": 103,
    "matches": [
      {
        "driver_id": 104,
        "full_name": "Driver Name",
        "phone": "+573001112233",
        "matched_at": "2026-03-11T20:00:00.000Z"
      }
    ]
  },
  "message": "match accepted successfully"
}
```

Auth errors:

`401 Unauthorized`

```json
{
  "error": "No token provided"
}
```

```json
{
  "error": "Invalid token"
}
```

`403 Forbidden`

```json
{
  "error": "Access denied. Drivers only."
}
```

Business errors:

`500 Internal Server Error`

```json
{
  "success": false,
  "message": "Passenger not found"
}
```

Duplicate behavior:

- The same driver is not added twice for the same passenger.
- If the match already exists, the endpoint still returns the current Mongo document for that passenger.

### 2) Get Authenticated Passenger Matches

`GET /api/matches/me`

Use this endpoint to read the matches of the authenticated passenger only.

Auth requirements:

- `Authorization: Bearer <passenger_token>`
- Authenticated role must be `passenger`

Security behavior:

- The passenger ID is not taken from the URL.
- The backend reads the ID directly from the JWT via `req.user.id`.
- An authenticated user cannot replace a path parameter to read another passenger's matches.

Success response: `200 OK`

```json
{
  "ok": true,
  "data": {
    "_id": "69b2080d8a9106fa9c014acb",
    "user_id": 103,
    "matches": [
      {
        "driver_id": 104,
        "full_name": "Driver Name",
        "phone": "+573001112233",
        "matched_at": "2026-03-11T20:00:00.000Z"
      }
    ]
  },
  "message": "get matches successfully"
}
```

Not found response: `404 Not Found`

```json
{
  "ok": false,
  "data": null,
  "message": "No matches found for this passenger"
}
```

Auth errors:

`401 Unauthorized`

```json
{
  "error": "No token provided"
}
```

```json
{
  "error": "Invalid token"
}
```

`403 Forbidden`

```json
{
  "ok": false,
  "data": null,
  "message": "Only passengers can view matches"
}
```

## End-to-End Testing Flow

Use this sequence in Postman or cURL.

1. Register a passenger with `POST /api/auth/register`.
2. Register a driver with `POST /api/auth/register`.
3. Log in as the driver with `POST /api/auth/login` and copy the driver token.
4. Log in as the passenger with `POST /api/auth/login` and copy the passenger token.
5. Copy the passenger `user_id` from register or login data.
6. Call `POST /api/matches/:passengerId/accept` using the driver token.
7. Call `GET /api/matches/me` using the passenger token.
8. Confirm the returned Mongo document contains the accepted driver inside `data.matches`.

### Example cURL Flow

Accept a passenger as driver:

```bash
curl -X POST https://your-backend-domain.com/api/matches/103/accept \
  -H "Authorization: Bearer DRIVER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

Read the authenticated passenger matches:

```bash
curl -X GET https://your-backend-domain.com/api/matches/me \
  -H "Authorization: Bearer PASSENGER_TOKEN"
```

## How Data Is Saved Internally

When you call `POST /api/matches/:passengerId/accept`:

1. The JWT is validated.
2. The backend verifies that the authenticated user is a driver.
3. The driver is loaded from PostgreSQL.
4. The passenger is loaded from PostgreSQL.
5. MongoDB runs `updateOne(..., { upsert: true })` on the `matchForUser` collection.
6. If the passenger document does not exist, it is created.
7. A new object is appended to `matches`.
8. If the same `driver_id` already exists, it is not duplicated.

## Quick Troubleshooting

- `MONGODB_URI is not defined`: your deployment is missing the Mongo connection string.
- `No token provided`: the `Authorization` header is missing or not using `Bearer <token>` format.
- `Invalid token`: the JWT is malformed, expired, or signed with a different `JWT_SECRET`.
- `Access denied. Drivers only.`: you are trying to accept a passenger with a non-driver token.
- `Only passengers can view matches`: you are calling `GET /api/matches/me` with a token that is not passenger.
- `No matches found for this passenger`: that authenticated passenger still has no accepted matches stored in MongoDB.
- `Passenger not found` or `Driver not found`: the relational user record does not exist in PostgreSQL.
