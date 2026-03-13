# Match Mongo Endpoints

## Overview

This feature adds MongoDB as a secondary database for accepted passenger-driver matches.
PostgreSQL remains the primary database and is not replaced.

A match document is passenger-centric:

```json
{
  "user_id": "passenger_user_id",
  "matches": [
    {
      "driver_id": "driver_user_id",
      "full_name": "Driver Name",
      "phone": "+573001112233",
      "matched_at": "2026-03-11T20:00:00.000Z"
    }
  ]
}
```

## Reproducible Setup for New Clones

Use these steps so anyone cloning the repository can run the same MongoDB flow.

1. Install dependencies from lock file:

```bash
cd backend
npm ci
```

2. Create local environment file:

Create `backend/.env` with your local configuration.


3. Ensure `MONGODB_URI` points to local Docker Mongo:

```dotenv
MONGODB_URI=mongodb://localhost:27017/uti_bunna_matches
```

4. Start only MongoDB with compose:

```bash
docker compose -f docker-compose.mongo.yml up -d
```

5. Start backend:

```bash
npm start
```

The project does not require committed `node_modules`.
`package-lock.json` + `npm ci` ensure all users install the same dependency tree.

## Docker Compose (MongoDB Only)

A dedicated compose file was added to run only MongoDB:

- File: `backend/docker-compose.mongo.yml`

Start MongoDB:

```bash
docker compose -f docker-compose.mongo.yml up -d
```

Stop MongoDB:

```bash
docker compose -f docker-compose.mongo.yml down
```

Stop and remove volume data:

```bash
docker compose -f docker-compose.mongo.yml down -v
```

## API Endpoints

## POST `/api/matches/:passengerId/accept`

Accept a passenger by the authenticated driver and store the match in MongoDB.

Middlewares:

- `authMiddleware` — validates JWT and injects `req.user.id` (the driver's id)
- `driverMiddleware` — ensures the authenticated user has the `driver` role

Request params:

- `passengerId` (string) — the `user_id` of the passenger to accept

Request body: **none required**

The driver's `full_name` and `phone` are resolved automatically from PostgreSQL using the authenticated driver's id. Nothing needs to be sent in the body.

Example request (Postman):

- Method: `POST`
- URL: `{{BASE_URL}}/api/matches/:passengerId/accept`
- Authorization tab → **Bearer Token** → paste the JWT obtained from login
- Body: empty

Success response: `200 OK`

- Returns this payload:

```json
{
  "ok": true,
  "data": {
    "user_id": "5",
    "matches": [
      {
        "driver_id": 2,
        "full_name": "Driver Name",
        "phone": "+573001112233",
        "matched_at": "2026-03-12T10:00:00.000Z"
      }
    ]
  },
  "message": "match accepted successfully"
}
```

Possible business errors:

- `Driver not found`
- `Passenger not found`
- `Selected user is not a passenger`

Duplicate prevention:

- The repository uses this condition to avoid adding the same driver twice for the same passenger:

```javascript
{
  user_id: passengerId,
  "matches.driver_id": { $ne: driverData.driver_id }
}
```

This means the update only pushes a new match when that `driver_id` is not already in `matches`.

## GET `/api/matches/:passengerId`

Get all matches stored for a passenger.

Middlewares:

- `authMiddleware`

Request params:

- `passengerId` (string)

Success response: `200 OK`

- Returns this payload:

```json
{
  "ok": true,
  "data": {
    "user_id": "5",
    "matches": [
      {
        "driver_id": 2,
        "full_name": "Driver Name",
        "phone": "+573001112233",
        "matched_at": "2026-03-12T10:00:00.000Z"
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

Mongo route/middleware errors (for `/api/matches/*`) can return:

```json
{
  "success": false,
  "message": "..."
}
```

## Files Added and Integrated

MongoDB integration files:

- `src/config/mongodb.js`
  - Connects using `MONGODB_URI` with the native `mongodb` package.
  - Exposes `connectMongoDB()` and `getDb()`.
  - Ensures Mongo index creation on startup.

- `src/models/match.model.js`
  - Defines `MATCH_COLLECTION = "matches"`.
  - Exposes `ensureMatchIndexes(db)` to create a unique index on `user_id`.

- `src/repositories/match.mongo.repository.js`
  - `addMatchToPassenger(passengerId, driverData)`.
  - `getMatchesByPassenger(passengerId)`.
  - Uses `updateOne` with `upsert: true` and duplicate prevention by `matches.driver_id`.

- `src/services/match.mongo.service.js`
  - `acceptPassenger(driverId, passengerId)` — validates driver and passenger existence in PostgreSQL, checks passenger role, then calls the repository.
  - `getPassengerMatches(passengerId)`.

- `src/controllers/match.mongo.controller.js`
  - `acceptPassenger` — reads `driverId` from `req.user.id` and `passengerId` from `req.params`. No body required.
  - `getPassengerMatches` — reads `passengerId` from `req.params`.
  - Handles request validation, success responses, and error forwarding.

- `src/routes/match.mongo.routes.js`
  - `POST /:passengerId/accept`.
  - `GET /:passengerId`.
  - Applies `mongoNotFoundHandler` and `mongoErrorHandler` only for `/api/matches/*` routes.

- `src/middlewares/match.mongo.error.middleware.js`
  - Handles match Mongo route errors with `{ success, message, details? }`.

App wiring:

- `src/app.js`
  - Registers `app.use("/api/matches", matchMongoRoutes)`.
  - Calls `connectMongoDB()` at startup.

Dependency added:

- `mongodb` in `package.json`.
