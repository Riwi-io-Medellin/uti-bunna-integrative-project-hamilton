# Uti Bunna

**Turning empty seats into opportunities.**

Uti Bunna is a community-based route matching platform designed for the Riwi ecosystem. It connects members of the community who travel similar routes to the training center, helping reduce transportation costs and strengthen collaboration.

The platform allows drivers to visualize their route and discover passengers located near it using geospatial technology. Instead of acting as a ride-sharing service, Uti Bunna simply facilitates the **initial contact between people who already share a similar path**.

> **Live:** `https://uti-bunna-integrative-project-hamilton-qrqj.onrender.com/#/landingPage`

---

## The Meaning Behind the Name

The name **Uti Bunna** comes from the Arhuaco language.

- **Uti** → *Star*
- **Bunna** → *Made of*

Together, the expression can be interpreted as:

> **"A path made of stars."**

Each member of the Riwi community represents a star, and this project aims to connect them to create a shared path toward opportunity and accessibility.

---

## The Problem

Many coders at Riwi live far from the training center and must pay for daily transportation. For some students, transportation costs become a real barrier to attendance. In certain cases, coders even pause their training to work as ride drivers in order to afford transportation expenses.

At the same time, other members of the community travel alone to the same destination with empty seats in their vehicles. Currently, there is no organized way to connect people who share similar routes. This leads to:

- Unnecessary transportation expenses
- Missed opportunities for collaboration
- Barriers to consistent attendance

---

##  The Solution

Uti Bunna connects drivers and passengers within the Riwi community through geospatial route matching. Drivers register their route to the Riwi training center, and passengers register their location. The system detects when a passenger is located close to a driver's route and allows the driver to contact them directly.

The platform **does not handle payments or transportation logistics**. Instead, it simply facilitates the initial contact through **WhatsApp**, allowing users to coordinate independently.

---

## Table of Contents

- [Core Features](#️-core-features)
- [How It Works](#️-how-it-works)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Backend Architecture](#-backend-architecture)
- [Frontend Architecture](#-frontend-architecture)
- [API Endpoints](#-api-endpoints)
- [How the Matching Algorithm Works](#-how-the-matching-algorithm-works)
- [Future Improvements](#-future-improvements)
- [Team](#-team)

---

## Core Features

**Geospatial Route Visualization** — Drivers can visualize their route toward the Riwi training center on an interactive map.

**Passenger Discovery** — Passengers located near a driver's route appear as map markers with contact information.

**Proximity-Based Matching** — Passengers are detected when they are within 1 km of the driver's actual street route, filtered by shift compatibility.

**Direct Communication** — Drivers can access passenger information and contact them directly via **WhatsApp**.

**Community-Based Model** — The platform does not manage payments. Users decide independently whether transportation will be collaborative, shared-cost, or free.

---

##  How It Works

1. A **driver registers their route** to Riwi — the system automatically calculates the real driving path using the OSRM routing API.
2. A **passenger registers their location** on the map.
3. The system detects passengers located near the driver's route using PostGIS spatial queries.
4. Passengers appear as markers on the driver's map.
5. The driver selects a passenger and **contacts them via WhatsApp** to coordinate the ride.
6. The passenger sees which drivers have accepted them in their **contact attempts** view.

---

## Tech Stack

### Backend
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (ES Modules) |
| Framework | Express 5 |
| Authentication | JWT — jsonwebtoken |
| Password hashing | bcrypt |
| Request validation | AJV + ajv-formats (JSON Schema) |
| Email service | Nodemailer + Gmail SMTP |
| Route calculation | OSRM public API |

### Database
| Database | Role |
|----------|------|
| PostgreSQL (Supabase) | Primary — users, auth, spatial data |
| PostGIS extension | Geospatial queries and route storage |
| MongoDB (Atlas) | Secondary — accepted match history |
| Mongoose ODM | MongoDB schema and query layer |

### Frontend
| Layer | Technology |
|-------|-----------|
| Bundler | Vite |
| Language | Vanilla JavaScript (no framework) |
| Styling | Tailwind CSS + Font Awesome |
| Maps (driver views) | Google Maps JavaScript API |
| Maps (registration) | Leaflet + OpenStreetMap |
| Geocoding | Google Places Autocomplete |
| Notifications | Toastify-js |

### Geospatial Data
- Driver routes stored as **LineStrings** (PostGIS geometry)
- Passenger locations stored as **Points** (PostGIS geometry)
- Route bounding boxes stored as **Polygons** (PostGIS geometry)
- All spatial data converted to **GeoJSON** for frontend visualization

---

##  Project Structure

```
uti-bunna/
├── backend/
│   ├── server.js                    # Entry point — starts Express server
│   ├── docs/                        # Per-endpoint Markdown documentation
│   └── src/
│       ├── app.js                   # App config, route mounting, MongoDB init
│       ├── config/
│       │   ├── db.js                # PostgreSQL connection pool (pg)
│       │   ├── mongodb.js           # Mongoose connection (MongoDB Atlas)
│       │   └── mailer.js            # Nodemailer transporter (Gmail SMTP)
│       ├── schemas/                 # AJV schemas for HTTP validation + Mongoose schema
│       ├── middlewares/             # Auth, driver guard, validation, error handlers
│       ├── utils/                   # JWT, bcrypt, OSRM, HTTP errors, mailer, reset token
│       ├── repositories/            # All database queries (pg SQL + Mongoose)
│       ├── services/                # Business logic — no Express, no HTTP
│       ├── controllers/             # HTTP handlers — thin layer, delegates to services
│       ├── models/                  # Mongoose models
│       └── routes/                  # Express routers
└── client/
    ├── index.html
    ├── app.js                       # Entry point — registers router on load/hashchange
    ├── style.css                    # Tailwind base
    └── src/
        ├── router/router.js         # Hash-based SPA router with role guards
        ├── views/                   # Page-level components (view string + init function)
        ├── components/              # Reusable UI pieces and map wrappers
        ├── services/                # fetch calls to the backend API
        └── utils/                   # Session helpers, map utilities, Google Maps loader
```

---

## Backend Architecture

### Layered Architecture

Every request travels through the same strict chain. No layer skips another:

```
HTTP Request
     │
     ▼
  Routes        →  defines URL + method + middleware chain
     │
     ▼
  Middlewares   →  authentication, role guard, schema validation
     │
     ▼
  Controllers   →  receives req/res, calls service, sends response
     │
     ▼
  Services      →  business logic, orchestrates repositories
     │
     ▼
  Repositories  →  all database queries (pg SQL or Mongoose)
     │
     ▼
  PostgreSQL / MongoDB
```

Controllers never touch the database directly. Services never know about Express or HTTP. Repositories only know how to query.

### Dual Database Design

```
PostgreSQL (Supabase)                    MongoDB (Atlas)
─────────────────────                    ──────────────
users table                              matchForUser collection
  · identity, credentials                  · one document per passenger
  · GeoJSON Point location                 · embedded array of accepted drivers
  · role (driver / passenger)              · driver name + phone denormalized
  · shift (morning / evening)

drivers table
  · route LineString (PostGIS)
  · route_bbox Polygon (PostGIS)
  · FK → users
```

**PostgreSQL** is the source of truth for users and authentication. **MongoDB** stores the accepted match history. When a driver accepts a passenger, the backend reads driver data from PostgreSQL and writes the match to MongoDB in a single atomic upsert — preventing duplicates automatically.

### Environment Variables

```env
# Server
PORT=3000

# PostgreSQL
DATABASE_URL=postgres://user:password@host:5432/database

# MongoDB
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=matchForUser

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d

# bcrypt
BCRYPT_ROUNDS=5

# Riwi destination coordinates
RIWI_LAT=6.219186319336883
RIWI_LON=-75.5836256336475

# Email (password recovery)
EMAIL=your_gmail@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password
```

### Running the Backend

```bash
cd backend
npm install
npm start
```

---

## Frontend Architecture

### Routing System

The frontend is a single-page application using **hash-based routing** (`#/route`). No framework — the router is a plain JavaScript function that runs on every `load` and `hashchange` event.

```
app.js
  ├── window.addEventListener('load', router)
  └── window.addEventListener('hashchange', router)
         │
         ▼
    router.js
      ├── Reads location.hash
      ├── Checks session in localStorage (token + user object)
      ├── Applies role guards (driver / passenger)
      └── Calls view() → render() → calls init()
```

**Route guards behavior:**
- Public routes (`landingPage`, `login`, `register`): redirect already logged-in users to their home view
- Private routes: redirect unauthenticated users to the landing page
- Role-specific routes: drivers cannot access passenger-only views and vice versa

**Session:** token and user object live in `localStorage`. `setSession()` writes both on login/register; `clearSession()` removes both on logout.

### Views

Each view exports two functions: a render function returning an HTML string, and an `init` function that attaches event listeners after the HTML is injected into the DOM.

| Route | View | Role | Description |
|-------|------|------|-------------|
| `#/landingPage` | `landingPages.js` | Public | Hero, features, CTA, embedded OpenStreetMap of Medellín |
| `#/login` | `login.js` | Public | Email/password form, toggle visibility, Toastify feedback |
| `#/register` | `RegisterForm.js` | Public | Full registration with Google Places autocomplete and draggable map marker |
| `#/matches` | `MatchesView.js` | Driver only | List of nearby passengers with skeleton loading |
| `#/myroute` | `PassengersNearby.js` | Driver only | Google Maps view with route drawn and passenger markers |
| `#/contact-attemps` | `ContactAttemps.js` | Passenger only | List of drivers who have accepted the passenger |
| `#/profileSettings` | `profileSettings.js` | Any | Edit phone, change password via modal, logout |

### Components

**`MapGoogle.js`** — Google Maps wrapper. Handles:
- `initGoogleMap()` — driver route view with Riwi marker
- `initGoogleMapRegister()` — registration form with draggable marker for location selection
- `drawMultipleMarkers()` — plots passengers on the map with info windows (avatar, address, WhatsApp button)
- `drawRouteGeoJSON()` — draws the driver's route as a blue polyline using `map.data.addGeoJson()`
- `updateMapPosition()` — recenters map after selecting an autocomplete result

**`Map.js`** — Leaflet-based map container used as a static placeholder during registration (before Google Maps loads).

**`ListMatches.js`** — renders match cards. Shared between the driver matches view and the passenger contact attempts view.

**`CardMatch.js`** — single match card with DiceBear avatar, name, phone, and WhatsApp link.

**`NavBar.js`** — bottom navigation bar for driver views (Matches list / Map view / Profile).

**`Header.js`** — top header with user greeting and profile link.

**`SkeletonListMatches.js`** — animated loading skeleton shown while fetch is in progress.

### Services & Utils

**`usersServices.js`** — `getMatches()`: calls `GET /api/drivers/matches` with the stored JWT.

**`geocodingService.js`** / **`getAddresService.js`** — wrap Google Geocoding API for address lookup by text query.

**`googleMapsLoader.js`** — `loadGoogleMaps()`: lazy-loads the Google Maps script only once using a module-level Promise singleton. Includes the Places library for autocomplete.

### Running the Frontend

```bash
cd client
npm install
npm run dev
```

Required environment variable in `client/.env`:
```env
VITE_API_KEY_MAPS=your_google_maps_api_key
```

---

## API Endpoints

**Base URL:** `https://uti-bunna-integrative-project-hamilton.onrender.com`

All protected endpoints require:
```
Authorization: Bearer <token>
```

---

### Authentication

#### `POST /api/auth/register`

Creates a new user account. If the role is `driver`, the system automatically calls OSRM to calculate the real driving route from the user's location to Riwi, then stores the route and its bounding box in PostgreSQL.

**Request body:**
```json
{
  "fullName": "Carlos Mendez",
  "email": "carlos@riwi.io",
  "password": "secure123",
  "role": "driver",
  "shift": "morning",
  "phone": "+573001234567",
  "address": "Calle 50 #70-10, Medellín",
  "location": {
    "type": "Point",
    "coordinates": [-75.567, 6.208]
  }
}
```

| Field | Type | Values |
|-------|------|--------|
| `role` | string | `"driver"` or `"passenger"` |
| `shift` | string | `"morning"` or `"evening"` |
| `coordinates` | `[lon, lat]` | Must be within Medellín bounds |

**Success `201`:**
```json
{
  "user": { "user_id": 5, "full_name": "Carlos Mendez", "role": "driver", "..." },
  "driver": { "route": { "type": "LineString", "..." }, "route_bbox": { "..." } },
  "token": "eyJhbGci..."
}
```
> `driver` is `null` for passengers. The returned token is ready to use immediately.

| Error | Status | Reason |
|-------|--------|--------|
| Validation failed | `400` | Missing field, wrong type, coordinates outside Medellín |
| Email already exists | `409` | Duplicate account |

---

#### `POST /api/auth/login`

Authenticates an existing user and returns a JWT.

**Request body:**
```json
{
  "email": "carlos@riwi.io",
  "password": "secure123"
}
```

**Success `200`:**
```json
{
  "user": { "user_id": 5, "full_name": "Carlos Mendez", "role": "driver", "..." },
  "token": "eyJhbGci..."
}
```

| Error | Status | Reason |
|-------|--------|--------|
| Invalid format | `400` | Bad email format or password under 6 chars |
| Wrong credentials | `401` | Email not found or wrong password — **same message for both by design** (prevents user enumeration) |

---

#### `POST /api/auth/forgot-password`

Sends a password reset email. Always returns success even if the email is not registered — this prevents user enumeration.

**Request body:**
```json
{ "email": "carlos@riwi.io" }
```

**Success `200`:**
```json
{ "message": "If the email is registered, check your inbox for instructions." }
```

The email contains a link like:
```
http://your-domain.com/reset-password?token=<jwt>
```
The token is a signed JWT with `type: "password-reset"` and **1-hour expiry**.

---

#### `POST /api/security/reset-password?token=TOKEN`

Uses the token from the reset email to set a new password. The token is passed as a **query parameter**, not a header.

**Request body:**
```json
{ "password": "new_secure_password" }
```

**Success `200`:**
```json
{ "message": "Password updated successfully" }
```

| Error | Status | Reason |
|-------|--------|--------|
| Password too short | `400` | Minimum 6 characters |
| Missing token | `401` | No `?token=` in query string |
| Invalid/expired token | `401` | JWT expired, malformed, or wrong type |

---

### Driver Matching

#### `GET /api/drivers/matches`

Returns passengers compatible with the authenticated driver. **Requires a driver JWT.**

The system runs a 4-step PostGIS spatial filter in a single SQL query:

1. `role = 'passenger'` — eliminates all drivers
2. `shift = driver's shift` — same morning or evening schedule
3. `ST_Within(location, route_bbox)` — inside the route bounding box (fast, uses GiST index)
4. `ST_DWithin(location, route, 1000)` — within 1 km of the actual street route (precise)

**Success `200`:**
```json
{
  "driverId": 5,
  "driverRoute": "{\"type\":\"LineString\",\"coordinates\":[...]}",
  "total": 3,
  "matches": [
    {
      "user_id": 12,
      "full_name": "Laura Gomez",
      "email": "laura@riwi.io",
      "phone": "+573009876543",
      "shift": "morning",
      "address": "Carrera 80 #45-20, Medellín",
      "location": "{\"type\":\"Point\",\"coordinates\":[-75.574,6.211]}"
    }
  ]
}
```

| Error | Status | Reason |
|-------|--------|--------|
| No/invalid token | `401` | Missing or expired JWT |
| Not a driver | `403` | Token belongs to a passenger |

---

###  MongoDB Matches

#### `POST /api/matches/:passengerId/accept`

A driver accepts a passenger. Verifies both users exist in PostgreSQL, then writes the match to MongoDB. **Idempotent** — calling it twice with the same driver and passenger will not create a duplicate entry.

**Path param:** `passengerId` — the `user_id` of the passenger from PostgreSQL.

**Success `200`:**
```json
{
  "ok": true,
  "data": {
    "_id": "67b2080d8a9106fa9c014acb",
    "user_id": 12,
    "matches": [
      {
        "driver_id": 5,
        "full_name": "Carlos Mendez",
        "phone": "+573001234567",
        "matched_at": "2026-03-11T20:00:00.000Z"
      }
    ]
  },
  "message": "match accepted successfully"
}
```

| Error | Status | Reason |
|-------|--------|--------|
| No/invalid token | `401` | Missing or expired JWT |
| Not a driver | `403` | Token does not belong to a driver |
| User not found | `500` | Passenger or driver does not exist in PostgreSQL |

---

#### `GET /api/matches/me`

Returns all accepted matches for the **authenticated passenger**. The passenger ID comes from the JWT — it is impossible to query another user's matches.

**Success `200`:**
```json
{
  "ok": true,
  "data": {
    "_id": "67b2080d8a9106fa9c014acb",
    "user_id": 12,
    "matches": [
      {
        "driver_id": 5,
        "full_name": "Carlos Mendez",
        "phone": "+573001234567",
        "matched_at": "2026-03-11T20:00:00.000Z"
      }
    ]
  },
  "message": "get matches successfully"
}
```

| Error | Status | Reason |
|-------|--------|--------|
| No/invalid token | `401` | Missing or expired JWT |
| Not a passenger | `403` | Token belongs to a driver |
| No matches yet | `404` | No driver has accepted this passenger yet |

---

###  User Profile

#### `PATCH /api/users/me`

Updates the authenticated user's phone number and/or password. Only these two fields are accepted — any other field is **rejected by schema validation** (`additionalProperties: false`).

**Request body (at least one field required):**
```json
{
  "phone_number": "+573001234567",
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

| Field | Required | Rules |
|-------|----------|-------|
| `phone_number` | No | 7–15 digits, optional `+` prefix |
| `currentPassword` | Only if changing password | Minimum 6 chars |
| `newPassword` | No | Minimum 6 chars, requires `currentPassword` |

**Success `200`:**
```json
{
  "user": {
    "user_id": 5,
    "full_name": "Carlos Mendez",
    "email": "carlos@riwi.io",
    "role": "driver",
    "phone": "+573001234567"
  }
}
```

| Error | Status | Reason |
|-------|--------|--------|
| Empty body or invalid field | `400` | AJV validation failed |
| `newPassword` without `currentPassword` | `400` | Business rule validation |
| Current password wrong | `401` | bcrypt comparison failed |
| User not found | `404` | Account no longer exists |

---

##  How the Matching Algorithm Works

When a driver calls `GET /api/drivers/matches`, a single PostgreSQL query applies four sequential spatial filters optimized for performance:

```
All users in the database
         │
         ▼  1. WHERE role = 'passenger'
         │     Eliminates all drivers instantly (indexed column)
         │
         ▼  2. AND shift = driver's shift
         │     Only compatible schedule — resolved via subquery (no extra round-trip)
         │
         ▼  3. AND ST_Within(passenger.location, driver.route_bbox)
         │     Rectangle pre-filter using GiST spatial index — very fast
         │
         ▼  4. AND ST_DWithin(passenger.location, driver.route, 1000)
         │     Precise check: is passenger within 1 km of the actual street route?
         │
         ▼
    Compatible passengers
```

Each filter reduces the dataset before passing candidates to the next, more expensive filter. The **bounding box** (step 3) is a rectangle stored at registration time — it acts as a cheap first spatial gate before the precise `ST_DWithin` calculation on the full route geometry.

The driver's route is **calculated once at registration** via OSRM, not on each query, keeping match responses fast regardless of route complexity.

---

##  Future Improvements

- Trust and reputation system
- In-app messaging
- Push notification system
- Expansion to other educational institutions or workplaces
- Mobile app
- Improve security with only institutional emails acceptance
---

##  Potential Impact

If implemented at scale, Uti Bunna could:

- Reduce transportation costs for students and workers
- Improve access to education
- Strengthen collaborative communities
- Reduce unused transportation capacity
- Create new opportunities for mutual support

The concept is applicable not only to educational institutions but to any organization where people commute daily to a shared destination.

---

##  License

This project was developed for educational purposes within the Riwi training program.