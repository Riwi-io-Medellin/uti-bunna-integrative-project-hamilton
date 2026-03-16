# Uti Bunna — Technical Documentation

## 1. Project Name

**Uti Bunna** — Community-Based Route Matching Platform

> *"Uti"* means *star* and *"Bunna"* means *made of* in the Arhuaco language. Together: **"a path made of stars."**

---

## 2. General Objective

Design and develop a community-based web platform that connects drivers and passengers within the Riwi training ecosystem by matching shared commuting routes, thereby reducing transportation costs and strengthening community collaboration.

---

## 3. Specific Objectives

1. Implement a user registration and authentication system that differentiates between **driver** and **passenger** roles using JWT-based session management.
2. Integrate geospatial route calculation using the **OSRM API** and persist route data with **PostGIS** to enable proximity-based matching.
3. Develop a real-time matching algorithm that identifies passengers located within **1 km** of a driver's calculated route, filtered by schedule compatibility.
4. Provide a direct communication channel via **WhatsApp** deep-links so matched users can coordinate rides independently.
5. Persist accepted match records in **MongoDB** to maintain a history of driver–passenger connections.
6. Build a responsive, mobile-first Single Page Application (SPA) with interactive map components for location selection and route visualization.

---

## 4. Problem Statement

Transportation represents one of the hidden barriers to education within the Riwi community. Many coders face significant economic pressure when paying for daily transportation — some require multiple bus transfers, and certain members have paused their training to work as ride drivers to cover commuting costs. Meanwhile, other community members drive to the training center daily with empty seats in their vehicles.

Currently, there is no organized or simple mechanism to connect these two groups of people who share similar routes and schedules. As a result:

- Transportation costs remain unnecessarily high for passengers.
- Available vehicle seats go unused by drivers.
- Opportunities for community-level collaboration are lost.

---

## 5. Project Scope

### In Scope

| Area | Description |
|------|-------------|
| **User Management** | Registration (driver/passenger), login, profile updates (phone, password) |
| **Route Matching** | Geospatial detection of passengers within 1 km of a driver's route, filtered by shift (morning/evening) |
| **Match Persistence** | Accepted matches stored in MongoDB with driver contact information |
| **Communication** | Direct WhatsApp deep-link integration for matched users |
| **Frontend** | SPA with landing page, authentication flows, matches dashboard, profile settings, and interactive map |
| **Deployment** | Backend deployed on Render; frontend built with Vite for static hosting |

### Out of Scope

| Area | Description |
|------|-------------|
| **Payment Processing** | No financial transactions are managed within the platform |
| **Ride Logistics** | No trip tracking, scheduling, or ride management |
| **In-App Messaging** | Communication is delegated to external platforms (WhatsApp) |
| **Push Notifications** | Not implemented in the current version |
| **Trust/Reputation System** | No rating or review mechanism exists yet |

---

## 6. User Stories

### EPIC 1: User Management and Geolocation

#### US-1.1: User Registration (Auth)
**As a** new user,  
**I want to** create an account by entering my email, password, phone number, and full name,  
**So that** I can access the application's features.

**Acceptance Criteria:**
1. The system must not allow two users with the same email.
2. The password must be stored encrypted (Hash) in the database — never as plain text.
3. The phone number must contain only numbers and be 10 characters long.
4. Upon successful registration, return a Token (JWT) or redirect to Login.

**Technical Tasks:**
* [DB] Create `users` table: id (UUID PK), email (VARCHAR UNIQUE), password (VARCHAR Hashed), phone (VARCHAR), full_name (VARCHAR).
* [Back] Install encryption library (e.g., Bcrypt).
* [Back] Create endpoint `POST /api/auth/register`.
* [Front] Create form with input validation.
* [Front] Connect form with endpoint and handle errors.

---

#### US-1.2: Role Definition (Onboarding)
**As a** registered user,  
**I want to** select my role (Driver or Passenger) during my first login,  
**So that** the application activates the corresponding features for me.

**Acceptance Criteria:**
1. The user can only have one active role at a time (for this MVP).
2. If selecting "Driver," car model and license plate are mandatory.
3. If selecting "Passenger," no vehicle data is required.
4. The role must be stored in the users table.

**Technical Tasks:**
* [DB] Add `role` column (ENUM) and vehicle columns (`car_model`, `plate`) to `users` table.
* [Back] Create endpoint `PATCH /api/users/{id}/role`.
* [Front] Create selection screen ("How will you travel today?").
* [Front] Conditional logic: show vehicle inputs only if `role === 'driver'`.

---

#### US-1.3: Location Registration (Passenger Side)
**As a** passenger,  
**I want to** enter my current address or select a point on the map,  
**So that** the system saves my pickup coordinates.

**Acceptance Criteria:**
1. The system must convert the written address into coordinates (Latitude/Longitude).
2. Location must be stored using PostGIS `GEOGRAPHY` type.
3. The location must be associated with the user's ID.

**Technical Tasks:**
* [API] Configure Maps API Key (Google/OSM).
* [DB] Enable PostGIS extension.
* [DB] Create `passenger_locations` table with `GEOGRAPHY(POINT)` column.
* [Back] Create endpoint `POST /api/passenger/location`.
* [Front] Integrate map (Leaflet) to capture user click or text input.

---

#### US-1.4: Route Registration (Driver Side)
**As a** driver,  
**I want** the system to calculate my route from my origin to "Riwi",  
**So that** the system knows which path I will travel.

**Acceptance Criteria:**
1. Driver enters only their origin.
2. System must obtain the route geometry (polyline).
3. Route must be stored as a spatial line (`LINESTRING`) in the database.

**Technical Tasks:**
* [API] Consume Routing API (OSRM) to get the polyline.
* [DB] Create `driver_routes` table with `GEOGRAPHY(LINESTRING)` column.
* [Back] Create endpoint `POST /api/driver/route`.
* [Front] Draw route on the driver's map for visual confirmation.

---

### EPIC 2: Spatial Matching Engine

#### US-2.1: Matching Query (Matchmaking)
**As a** backend system,  
**I want to** identify which passengers are located within 1km of a driver's route,  
**So that** they can be presented as viable candidates.

**Acceptance Criteria:**
1. Search must be spatial: distance between driver's LINE and passenger's POINT.
2. Maximum radius is 1000 meters.
3. Return only passengers actively seeking transportation.

**Technical Tasks:**
* [DB] Write Spatial SQL query using `ST_DWithin`.
* [DB] Create Spatial Index (GIST) on location columns.
* [Back] Implement endpoint `GET /api/driver/matches`.

---

#### US-2.2: Precise Distance Calculation
**As a** driver,  
**I want to** see the exact distance in meters that picking up a passenger adds to my route,  
**So that** I can evaluate convenience.

**Acceptance Criteria:**
1. Matches endpoint must return `distance_in_meters`.
2. Sort passengers from nearest to farthest.

**Technical Tasks:**
* [Back] Refine SQL query using `ST_Distance` with geography casting for exact meters.
* [Front] Show distance in a visible badge or label on the passenger card.

---

### EPIC 3: Match Management and Contact

#### US-3.1: Results Dashboard
**As a** driver,  
**I want to** see a list of cards with information about matched passengers,  
**So that** I can easily select one to contact.

**Acceptance Criteria:**
1. If no passengers found, show "No nearby passengers found".
2. Each card must show: Name, Distance, and "Contact" button.
3. Responsive design (Mobile First).

**Technical Tasks:**
* [Front] Create `MatchCard` component.
* [Front] Implement `useEffect` to call matches API.
* [Front] Add loading state (Skeleton/Spinner).

---

#### US-3.2: WhatsApp Integration and State Change
**As a** driver,  
**I want** clicking "Contact" to open WhatsApp with the passenger's phone number,  
**So that** I can send them a quick message.

**Acceptance Criteria:**
1. Button must be a link with `https://wa.me/57{phone}`.
2. System must register the passenger as contacted.

**Technical Tasks:**
* [Back] Create endpoint `POST /api/matches/{passengerId}/contact`.
* [Front] `handleContact` function to call API and open WhatsApp.

---

#### US-3.3: Notifications (Simple)
**As a** passenger,  
**I want to** see an alert on my screen if a driver decided to contact me,  
**So that** I can check my phone.

**Acceptance Criteria:**
1. Passenger must have a "Notifications" section.
2. Show "Driver [Name] wants to take you".

**Technical Tasks:**
* [DB] Create `notifications` table.
* [Back] Endpoint `GET /api/notifications` (simple polling).
* [Front] Create alert component or header badge.

---

## 7. SCRUM Methodology Evidence

Official SCRUM Board: [Jira - Project SCRUM](https://juanesteban29433.atlassian.net/jira/software/projects/SCRUM/boards/1)

### Sprint Structure

The project followed an iterative development approach organized around feature branches and pull requests, as evidenced by the Git history:

| Sprint Focus | Key Branches | PR Evidence |
|--------------|-------------|-------------|
| **Authentication & Core API** | `backend`, `feature/login-f`, `feature/register-f` | PR #12, PR #14, PR #15 |
| **Geospatial Matching** | `feature/get-routes`, `feature/nearby-passenger-map` | PR #17, PR #19 |
| **MongoDB Match Persistence** | `feature/mongo-match-b`, `feature/mongo-to-mongoose-b` | PR #21, PR #23, PR #26 |
| **Frontend Views** | `frontend`, `feature/landing-page-f`, `feature/matches-view` | PR #6, PR #17, PR #20 |
| **Profile Management** | `feature/profile-f`, `feature/profileConfig-f`, `feature/update-profile` | PR #19, PR #24 |
| **Contact & Communication** | `feature/contact-attempts`, `feature/contact-attempts-f` | PR #22 |
| **Bug Fixes** | `feature/matches-fix-b`, `feature/recover-password-b` | PR #14, PR #21 |

### Branch Strategy

```
main ← develop ← feature/*
         ↑          ↑
      backend    frontend
```

- **`main`**: Production-ready code. Only receives merges from `develop`.
- **`develop`**: Integration branch for completed features.
- **`backend`**: Backend-specific base branch.
- **`frontend`**: Frontend-specific base branch.
- **`feature/*`**: Individual feature branches following naming conventions:
  - Suffix `-b` for backend features (e.g., `feature/mongo-match-b`)
  - Suffix `-f` for frontend features (e.g., `feature/login-f`)

### Total Branches: 33 (local + remote)

---

## 8. Technology Stack

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | — | Server runtime environment |
| **Express** | 5.2.1 | HTTP framework and REST API |
| **PostgreSQL + PostGIS** | — | Relational database with geospatial extensions |
| **MongoDB** | 7.1.0 (native driver) | NoSQL storage for match history |
| **bcrypt** | 6.0.0 | Password hashing (configurable salt rounds) |
| **jsonwebtoken** | 9.0.3 | JWT-based authentication |
| **AJV** | 8.18.0 | JSON Schema validation |
| **ajv-formats** | 3.0.1 | Additional AJV format validators (email, etc.) |
| **cors** | 2.8.6 | Cross-Origin Resource Sharing |
| **dotenv** | 17.3.1 | Environment variable management |
| **pg** | 8.20.0 | PostgreSQL client for Node.js |

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Vite** | 7.3.1 | Build tool and development server |
| **Tailwind CSS** | 4.2.0 | Utility-first CSS framework |
| **Leaflet.js** | 1.9.4 | Interactive maps (CDN) |
| **Font Awesome** | 6.0.0 | Icon library (CDN) |
| **Toastify-js** | 1.12.0 | Toast notification library |

### External APIs

| API | Purpose |
|-----|---------|
| **OSRM (Open Source Routing Machine)** | Route calculation from driver location to Riwi destination |
| **Nominatim (OpenStreetMap)** | Forward and reverse geocoding for address lookup |
| **Google Maps API** | Embedded map display in profile settings view |
| **OpenStreetMap Tiles** | Map tile rendering via Leaflet |
| **DiceBear** | Random avatar generation for user profiles |
| **WhatsApp API** | Deep-link integration for rider communication |

### Deployment

| Component | Platform |
|-----------|----------|
| Backend API | [Render](https://uti-bunna-integrative-project-hamilton.onrender.com) |
| Frontend | Vite-built static assets (deployable to Netlify / GitHub Pages) |

---

## 9. System Architecture

### 9.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (SPA)                        │
│  Vite + Tailwind CSS + Leaflet.js                       │
│  Hash-based routing (#/login, #/register, #/matches)    │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS (REST API)
                       ▼
┌─────────────────────────────────────────────────────────┐
│                 BACKEND (Express 5)                     │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │  Auth    │  │ Drivers  │  │ Matches  │  │ Users  │  │
│  │ /api/auth│  │/api/driv.│  │/api/match│  │/api/us.│  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘  │
│       │             │             │             │       │
│  ┌────▼─────────────▼─────────────▼─────────────▼────┐  │
│  │              Service Layer                        │  │
│  └────┬─────────────┬─────────────┬─────────────┬────┘  │
│       │             │             │             │       │
│  ┌────▼─────────────▼────┐  ┌─────▼─────────────▼────┐  │
│  │   PostgreSQL + PostGIS│  │       MongoDB           │  │
│  │   (Users, Drivers,    │  │   (Match History)       │  │
│  │    Geospatial Data)   │  │                         │  │
│  └───────────────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                       │
                       ▼
           ┌───────────────────┐
           │   OSRM API        │
           │ (Route Calculation)│
           └───────────────────┘
```

### 9.2 Backend Layered Architecture

The backend follows a **Controller → Service → Repository** pattern with clear separation of concerns:

```
Routes (Express Router)
  │
  ▼
Middlewares (Auth, Driver, Validation, Error Handling)
  │
  ▼
Controllers (HTTP request/response handling)
  │
  ▼
Services (Business logic)
  │
  ▼
Repositories (Database queries)
  │
  ▼
Database Drivers (pg Pool, MongoDB Client)
```

### 9.3 Hybrid Persistence Model

| Database | Data Stored | Justification |
|----------|-------------|---------------|
| **PostgreSQL + PostGIS** | Users, drivers, routes, geospatial coordinates | Relational integrity for user data; PostGIS enables spatial queries (`ST_Within`, `ST_DWithin`, `ST_GeomFromGeoJSON`) |
| **MongoDB** | Accepted match history per passenger | Flexible document model for the growing `matches` array; avoids join overhead for read-heavy match lookups |

---

## 10. Project Structure

```
uti-bunna-integrative-project-hamilton/
│
├── backend/
│   ├── server.js                          # Entry point — loads env and starts Express
│   ├── package.json                       # Backend dependencies and scripts
│   ├── docs/                              # API endpoint documentation
│   │   ├── backend-readme.md
│   │   ├── login.md
│   │   ├── register.md
│   │   ├── match.md
│   │   └── matchMongo.md
│   └── src/
│       ├── app.js                         # Express app configuration, routes, CORS, MongoDB init
│       ├── config/
│       │   ├── db.js                      # PostgreSQL connection pool (pg)
│       │   └── mongodb.js                 # MongoDB client connection + index setup
│       ├── controllers/
│       │   ├── auth.controller.js         # Register and login handlers
│       │   ├── match.controller.js        # Get nearby passengers (SQL/PostGIS)
│       │   ├── match.mongo.controller.js  # Accept and retrieve matches (MongoDB)
│       │   └── user.controller.js         # Profile update handler
│       ├── middlewares/
│       │   ├── auth.middleware.js          # JWT verification → populates req.user
│       │   ├── driver.middleware.js        # Role-based guard (driver-only access)
│       │   ├── error.middleware.js         # Global error handler
│       │   ├── match.mongo.error.middleware.js  # MongoDB-specific error handler
│       │   └── validation.middleware.js    # AJV schema validation
│       ├── models/
│       │   ├── match.model.js             # MongoDB collection name + index definitions
│       │   └── user.model.js              # (Empty — schema defined at DB level)
│       ├── repositories/
│       │   ├── match.repository.js        # PostGIS spatial queries for match detection
│       │   ├── match.mongo.repository.js  # MongoDB CRUD for match documents
│       │   └── user.repository.js         # PostgreSQL user CRUD operations
│       ├── routes/
│       │   ├── auth.routes.js             # POST /register, POST /login
│       │   ├── match.routes.js            # GET /matches (driver matches via SQL)
│       │   ├── match.mongo.routes.js      # POST /:passengerId/accept, GET /me
│       │   └── user.routes.js             # PATCH /me (profile update)
│       ├── schemas/
│       │   ├── register.schema.js         # AJV schema — registration validation
│       │   ├── login.schema.js            # AJV schema — login validation
│       │   └── update-profile.schema.js   # AJV schema — profile update validation
│       └── utils/
│           ├── hash.js                    # bcrypt hash and verify wrappers
│           ├── httpError.js               # Custom HttpError class (statusCode, message, details)
│           ├── jwt.js                     # JWT token generation
│           └── route.js                   # OSRM API integration + bounding box calculation
│
├── client/
│   ├── index.html                         # SPA entry point (Leaflet CDN, Font Awesome CDN)
│   ├── app.js                             # Router initialization (load + hashchange)
│   ├── style.css                          # Tailwind CSS + Toastify imports
│   ├── vite.config.js                     # Vite + Tailwind plugin configuration
│   ├── package.json                       # Frontend dependencies and scripts
│   └── src/
│       ├── assets/
│       │   └── utibunna-icon-transparent.png  # App logo/favicon
│       ├── core/
│       │   └── render.js                  # DOM renderer (injects HTML into #app)
│       ├── router/
│       │   └── router.js                  # Hash-based SPA router with auth guards
│       ├── views/
│       │   ├── landingPages.js            # Public landing page (hero, steps, CTA, footer)
│       │   ├── login.js                   # Login form with Toastify feedback
│       │   ├── RegisterForm.js            # Registration form with map + geocoding
│       │   ├── MatchesView.js             # Driver dashboard — nearby passengers list
│       │   ├── profileSettings.js         # Profile settings with embedded Google Maps
│       │   └── views.js                   # (Empty barrel file)
│       ├── components/
│       │   ├── Map.js                     # Leaflet map component wrapper
│       │   ├── components.js              # (Empty barrel file)
│       │   └── Driver/
│       │       ├── CardMatch.js           # Individual passenger match card (WhatsApp link)
│       │       ├── ListMatches.js         # Renders list of CardMatch components
│       │       └── SkeletonListMatches.js # Loading skeleton UI for matches
│       ├── services/
│       │   └── usersServices.js           # (Empty — API calls inline in views)
│       └── utils/
│           └── utils.js                   # Session mgmt, map utils, Nominatim geocoding
│
└── *.postman_collection.json              # Postman collections for API testing
```

---

## 11. API Reference

### Base URL

```
https://uti-bunna-integrative-project-hamilton.onrender.com
```

### 11.1 Authentication

#### `POST /api/auth/register`

Creates a new user account. Drivers receive automatic route calculations.

**Request Body:**

```json
{
  "fullName": "Juan Pérez",
  "email": "juan@example.com",
  "password": "securepass123",
  "role": "driver",
  "shift": "morning",
  "phone": "+573001234567",
  "address": "Calle 10 #45-12, Medellín",
  "location": {
    "type": "Point",
    "coordinates": [-75.5672, 6.2084]
  }
}
```

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `fullName` | string | Yes | min 2 characters |
| `email` | string | Yes | Valid email format |
| `password` | string | Yes | min 6 characters |
| `role` | string | Yes | `"driver"` or `"passenger"` |
| `shift` | string | Yes | `"morning"` or `"evening"` |
| `phone` | string | Yes | Non-empty string |
| `address` | string | Yes | Non-empty string |
| `location` | GeoJSON Point | Yes | Coordinates within Medellín bounding box |

**Location Bounding Box (Medellín):**
- Longitude: `-75.6832` to `-75.5115`
- Latitude: `6.1212` to `6.3930`

**Responses:**

| Status | Description |
|--------|-------------|
| `201` | User created. Returns `{ user, driver (if applicable), token }` |
| `400` | Validation error (AJV schema violations) |
| `409` | Email already registered |

---

#### `POST /api/auth/login`

Authenticates an existing user and returns a JWT token.

**Request Body:**

```json
{
  "email": "juan@example.com",
  "password": "securepass123"
}
```

**Responses:**

| Status | Description |
|--------|-------------|
| `200` | Login successful. Returns `{ user, token }` |
| `400` | Validation error |
| `401` | Invalid credentials |

---

### 11.2 Driver Matches (PostgreSQL/PostGIS)

#### `GET /api/drivers/matches`

Retrieves passengers near the authenticated driver's route.

**Headers:** `Authorization: Bearer <driver_token>`

**Middleware Chain:** `authMiddleware` → `driverMiddleware` → `controller`

**Matching Algorithm (4 sequential filters):**

1. **Role Filter** — Only users with `role = 'passenger'`
2. **Shift Filter** — Passengers sharing the same shift as the driver
3. **Bounding Box Filter** — `ST_Within(passenger.location, driver.route_bbox)`
4. **Distance Filter** — `ST_DWithin(passenger.location, driver.route, 1000)` (< 1 km)

**Responses:**

| Status | Description |
|--------|-------------|
| `200` | Returns `{ driverId, driverRoute, total, matches[] }` |
| `401` | No token or invalid token |
| `403` | Not a driver |

---

### 11.3 Match History (MongoDB)

#### `POST /api/matches/:passengerId/accept`

Accepts a passenger match, persisting the record in MongoDB.

**Headers:** `Authorization: Bearer <driver_token>`

**Middleware Chain:** `authMiddleware` → `driverMiddleware` → `controller`

**Responses:**

| Status | Description |
|--------|-------------|
| `200` | Match accepted. Returns `{ ok, data, message }` |
| `401` | No token or invalid token |
| `403` | Not a driver |
| `500` | Passenger or driver not found |

**Duplicate Handling:** Same driver–passenger pair is never duplicated. If the match already exists, the current document is returned without modification.

---

#### `GET /api/matches/me`

Retrieves accepted matches for the authenticated passenger.

**Headers:** `Authorization: Bearer <passenger_token>`

**Middleware Chain:** `authMiddleware` → `controller` (role check inline)

**Responses:**

| Status | Description |
|--------|-------------|
| `200` | Returns `{ ok, data: { user_id, matches[] }, message }` |
| `403` | Not a passenger |
| `404` | No matches found |

---

### 11.4 User Profile

#### `PATCH /api/users/me`

Updates the authenticated user's phone number and/or password.

**Headers:** `Authorization: Bearer <token>`

**Middleware Chain:** `authMiddleware` → `validate(updateProfileSchema)` → `controller`

**Request Body (all fields optional, at least one required):**

```json
{
  "phone_number": "+573009876543",
  "currentPassword": "oldpass123",
  "newPassword": "newpass456"
}
```

| Field | Type | Validation |
|-------|------|------------|
| `phone_number` | string | 7–15 digits, optional `+` prefix |
| `currentPassword` | string | min 6 chars (required if changing password) |
| `newPassword` | string | min 6 chars |

**Responses:**

| Status | Description |
|--------|-------------|
| `200` | Profile updated. Returns `{ user }` (without `password_hash`) |
| `400` | Validation error or `newPassword` without `currentPassword` |
| `401` | Current password incorrect |
| `404` | User not found |

> **Note:** `additionalProperties: false` in the schema ensures only whitelisted fields are accepted: no address, email, or name changes are permitted through this endpoint.

---

## 12. Database Schema

### 12.1 Entity-Relationship Diagram

```mermaid
erDiagram
    users {
        int4 user_id PK
        text full_name
        citext email UK
        text password_hash
        user_role role
        user_shift shift
        text phone
        text address
        geography location
        timestamp created_at
    }

    drivers {
        int4 user_id PK
        geography route
        geography route_bbox
        timestamp created_at
    }

    spatial_ref_sys {
        int4 srid PK
        varchar auth_name
        int4 auth_srid
        varchar srtext
        varchar proj4text
    }

    users ||--o| drivers : "user_id (FK)"
```

---

## 13. setup and Execution Instructions

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL with PostGIS extension enabled
- MongoDB instance (local or cloud)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```dotenv
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/utibunna
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=matchForUser
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
BCRYPT_ROUNDS=10
RIWI_LAT=6.219186319336883
RIWI_LON=-75.5836256336475
```

Start the server:

```bash
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

The frontend development server will start on `http://localhost:5173`.

---

## 14. Credits

### Team Hamilton

| Name | Role |
|------|------|
| Juan Esteban Holguín | Tech Lead |
| Santiago Piedrahita Corrales | Product Owner |
| Maribel Castañeda | Frontend Developer |
| Antonio Pulgarín | Scrum Master |
| Juan Esteban Gómez | Backend Developer |

---

**Riwi Training Center** — Medellín, Colombia

---

*© 2026 Uti Bunna. All rights reserved.*
