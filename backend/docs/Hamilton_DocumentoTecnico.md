# Uti Bunna — Minimum Technical Document

**Team:** Hamilton  
**Date:** March 2026  
**Category:** RIWI Use Case — Community Transportation

---

## Team Members

| Name | Role |
|------|------|
| Juan Esteban Holguín | Tech Lead |
| Santiago Piedrahita Corrales | Product Owner |
| Maribel Castañeda | Frontend Developer |
| Antonio Pulgarín | Scrum Master |
| Juan Esteban Gómez | Backend Developer |

## 1. Project Name

**Uti Bunna** — Community-Based Route Matching Platform

---

## 2. Epics & User Stories

### EPIC 1: User Management and Geolocation

#### US-1.1: User Registration (Auth)
**As a** new user,  
**I want to** create an account by entering my email, password, phone number, and full name,  
**So that** I can access the application's features.

**Acceptance Criteria:**
1. The system must not allow two users with the same email address.
2. The password must be stored encrypted (hashed) in the database — never as plain text.
3. The phone number must contain only digits and be 10 characters long.
4. Upon successful registration, a JWT token is returned or the user is redirected to the login screen.

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
1. A user can only have one active role at a time (for this MVP).
2. If the user selects "Driver," it is mandatory to provide: car model and license plate.
3. If the user selects "Passenger," no vehicle information is required.
4. The role must be persisted in the users table.

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
1. The system must convert the written address into coordinates (latitude/longitude).
2. The location must be stored using the PostGIS `GEOGRAPHY` data type.
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
**So that** the system knows which roads I will travel along.

**Acceptance Criteria:**
1. The driver only enters their origin.
2. The system must obtain the route geometry (the polyline displayed on the map).
3. The route must be stored as a spatial line (`LINESTRING`) in the database.

**Technical Tasks:**
* [API] Consume Routing API (OSRM) to get the polyline.
* [DB] Create `driver_routes` table with `GEOGRAPHY(LINESTRING)` column.
* [Back] Create endpoint `POST /api/driver/route`.
* [Front] Draw route on the driver's map for visual confirmation.

---

### EPIC 2: Spatial Matching Engine

#### US-2.1: Matching Query (Matchmaking)
**As a** backend system,  
**I want to** identify which passengers are located within 1 km of a driver's route,  
**So that** they can be presented as viable candidates.

**Acceptance Criteria:**
1. The search must be spatial: distance between the driver's `LINESTRING` and the passenger's `POINT`.
2. The maximum radius is 1,000 meters.
3. Only passengers who are actively seeking transportation should be returned.

**Technical Tasks:**
* [DB] Write Spatial SQL query using `ST_DWithin`.
* [DB] Create Spatial Index (GIST) on location columns.
* [Back] Implement endpoint `GET /api/driver/matches`.

---

#### US-2.2: Precise Distance Calculation
**As a** driver,  
**I want to** see the exact distance in meters that picking up a passenger would add to my route,  
**So that** I can evaluate whether the detour is convenient.

**Acceptance Criteria:**
1. The matches endpoint must return a `distance_in_meters` field.
2. The list of passengers must be ordered from nearest to farthest.

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
1. If no passengers are found, display a message: "No nearby passengers found."
2. Each card must display: name, distance, and a "Contact" button.
3. The design must be responsive (Mobile First).

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
1. The button must be a link with `target="_blank"` using the format `https://wa.me/57{phone}`.
2. Upon clicking, the system must register that the passenger has already been contacted.

**Technical Tasks:**
* [Back] Create endpoint `POST /api/matches/{passengerId}/contact`.
* [Front] `handleContact` function to call API and open WhatsApp.

---

#### US-3.3: Notifications (Simple)
**As a** passenger,  
**I want to** see an on-screen alert if a driver has decided to contact me,  
**So that** I can check my phone.

**Acceptance Criteria:**
1. The passenger must have a "Notifications" section.
2. The notification must display: "Driver [Name] wants to give you a ride."

**Technical Tasks:**
* [DB] Create `notifications` table.
* [Back] Endpoint `GET /api/notifications` (simple polling).
* [Front] Create alert component or header badge.

---

## 7. SCRUM Methodology Evidence

Official SCRUM Board: [Jira - Project SCRUM](https://juanesteban29433.atlassian.net/jira/software/projects/SCRUM/boards/1)

### 7.1 Team Roles

| Role | Responsible | Responsibilities |
|------|-------------|------------------|
| **Tech Lead** | Juan Esteban Holguín | Technical leadership, architecture decisions, code reviews |
| **Product Owner** | Santiago Piedrahita Corrales | Manages backlog, defines priorities, validates acceptance criteria |
| **Frontend Developer** | Maribel Castañeda | UI/UX implementation, SPA views, map integration |
| **Scrum Master** | Antonio Pulgarín | Facilitates ceremonies, removes blockers, ensures SCRUM practices |
| **Backend Developer** | Juan Esteban Gómez | Backend API, MongoDB integration, deployment |

### 7.2 Sprint Structure

The project followed an iterative development approach organized in 4-week sprints with feature branches and pull requests:

| Sprint | Focus | Duration |
|--------|-------|----------|
| **Sprint 1** | Planning, analysis, and core architecture | Week 0–1 (Feb 09 – Feb 20) |
| **Sprint 2** | Design and development kickoff | Week 2 (Feb 23 – Feb 27) |
| **Sprint 3** | Development and testing | Week 3 (Mar 02 – Mar 06) |
| **Sprint 4** | Delivery preparation and presentation | Week 4 (Mar 09 – Mar 13) |

### 7.3 Feature Branch Workflow

Development was organized using a Git branching model with clear naming conventions:

```
main ← develop ← feature/*
         ↑          ↑
      backend    frontend
```

---

*© 2026 Uti Bunna — Team Hamilton. All rights reserved.*
