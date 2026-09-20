# ÀJỌ - A Community Savings Circle Management Platform

ÀJỌ is a digital rotational savings circle (/ajo/pardna/susu) platform, built for a fullstack development course with CBF. It's designed to bring transparency and accountability to informal community savings groups, letting members create circles, join via invite code, track contributions, and follow the payout rotation, all in one place.

---

## Project vision

The original goal was a full platform supporting:

- User registration and login
- Creating and joining savings circles via a unique invite code
- Submitting and approving contributions each cycle
- Automatic payout rotation, based on each member's position
- An activity feed logging circle events
- Stretch features: trust scores, circle health indicators, payment reminders, proof-of-payment uploads, waiting lists

## What's actually built (current scope)

Given the time available, I made a deliberate call to build a smaller set of features **end-to-end, fully** - login, circles, and circle membership, rather than build every entity from the original BRD partially.

**Backend (Spring Boot + MySQL):**
- `User`- registration and login, with a custom exception for duplicate emails and one for invalid login attempts (deliberately returning the same "invalid email or password" message for both a wrong email and a wrong password, so the API never reveals which one was incorrect)
- `Circle`- full CRUD (create, read all, read by id, update, delete), with DTOs, auto-generated invite codes, and seed data. Each circle has an `organiser` (a `User`), and a `GET /ajo/circle/user/{userId}` endpoint returns only the circles a specific user organises or has joined
- `CircleMember` - a join entity linking `User` and `Circle` (a real many-to-many relationship, implemented as two many-to-one relationships on this middle entity), enabling users to join a circle via invite code
- `GlobalExceptionHandler` (`@RestControllerAdvice`) — converts custom exceptions into proper HTTP status codes: `409 Conflict` for a duplicate email, `401 Unauthorized` for an invalid login
- Swagger/OpenAPI documentation, live at `/swagger-ui/index.html`

**Frontend (React + TypeScript + Chakra UI):**
- Multi-page navigation (landing, login, home, create, join, detail, edit) using React state with no router library, by design and given time constraints.
- A landing page and login form gate the rest of the app, nothing else is reachable until a user logs in
- Home page: grid list of circles the logged-in user organises or has joined, fetched live from the API
- Create circle form, with client-side validation (name, amount, member count, date), automatically attaching the logged-in user as organiser
- Join circle form, with client-side format validation on the invite code (`AJO-####`) before it's ever sent to the backend
- Click a circle to view its full detail (via a genuine `GET /circle/{id}` call, not just reused list data a delibrate choice to avoid the browser showing stale data)
- Edit circle (reuses the create form, pre-filled) and delete circle
- Typed API client (`api.ts`) wrapping all backend calls

**Infrastructure:**
- Docker Compose with three services: `frontend` (nginx), `backend` (Spring Boot), `db` (MySQL) - isolated network, persistent volume for the database, environment variables via `.env` (not hardcoded), and a healthcheck gating the database's readiness before the backend starts
- Seed data for users and circles, so a fresh container shows a populated app immediately. `invite_code` has a unique database constraint, so seed data can never silently duplicate across restarts

## What's not built yet (known gaps)

Being upfront about these, since I'd rather state the scope clearly than have it discovered:

- **`Contribution`, `Payout`, `ActivityLog`** -
 not built. These are the entities that would implement the actual "rotational savings" logic - submitting and approving contributions each cycle, and the payout rotation itself. `CircleMember` records who belongs to a circle, but nothing yet tracks contributions or payouts.
- **Password hashing** — passwords are currently stored in plaintext. Login works by direct string comparison. BCrypt hashing was planned but not yet wired in.
- **Real endpoint protection** — Spring Security is currently configured to permit all requests (`SecurityConfig.java`), purely to unblock local development and testing. "Login" in this app is a real, working check against stored credentials, but it doesn't yet protect API endpoints themselves, anyone could call `/ajo/circle/createcircle` directly without having logged in first. 

- **Login doesn't persist across a page reload** — the logged-in user is only held in React state, in memory. Refreshing the browser returns you to the landing page. Persisting this (e.g. via `localStorage`) is a planned next step.
- **Possible duplicate circles in the "my circles" list** — `GET /ajo/circle/user/{userId}` combines circles a user organises with circles they've joined via `CircleMember`, but doesn't currently de-duplicate. If a user were ever both the organiser and a `CircleMember` of the same circle, it would appear twice.
- **Landing page is functional, not yet styled** — the routing/gating logic is complete; visual design and any animation are still to be done.

## What I'd do with more time

1. Build `Contribution` and `Payout`, including the actual rotation logic (`((cycleNumber - 1) % totalMembers) + 1`), and the `ActivityLog` feed
2. Add BCrypt password hashing, and lock down API endpoints properly (public register/login, authenticated everything else)
3. Persist login across page reloads
4. De-duplicate the combined "organised + joined" circle list
5. Design and polish the landing page
6. Consider client-side routing (`react-router-dom`) for real URLs, if the app grows further

---

## Tech stack

- **Frontend:** React (TypeScript), Vite, Chakra UI
- **Backend:** Java 21, Spring Boot 4.1.0, Spring Data JPA, Lombok
- **Database:** MySQL 8
- **Infrastructure:** Docker, Docker Compose
- **API docs:** springdoc-openapi (Swagger UI)

## Project structure

```
project/
├── backend/          # Spring Boot app
│   ├── src/main/java/com/ajo/
│   │   ├── circle/       # Circle entity, repository, service, controller, DTOs
│   │   ├── circlemember/ # CircleMember join entity, repository, service, controller
│   │   ├── user/         # User entity, repository, service, controller, DTOs
│   │   ├── config/       # Security config
│   │   └── exception/    # Custom exceptions + GlobalExceptionHandler
│   └── Dockerfile
├── frontend/          # React app
│   ├── src/
│   │   ├── components/  # CircleForm, CircleList, CircleCard
│   │   ├── api/          # Typed API client
│   │   └── types/        # Shared TypeScript types/interfaces
│   └── Dockerfile
├── docker-compose.yml
└── .env               # Local environment variables (not committed)
```

---

## Running the project

### Option A — Docker Compose (recommended)

This runs all three services together, with a fresh, seeded database.

1. Create a `.env` file at the project root:
   ```
   MYSQL_DATABASE=ajo
   MYSQL_USER=ajo
   MYSQL_PASSWORD=your_password
   MYSQL_ROOT_PASSWORD=your_root_password
   ```
2. From the project root, run:
   ```bash
   docker compose up --build
   ```
3. Open:
   - Frontend: [http://localhost:8081](http://localhost:8081)
   - Backend API: [http://localhost:8080/ajo/circle](http://localhost:8080/ajo/circle)
   - Swagger docs: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

To reset the database back to its seeded starting state:
```bash
docker compose down -v
docker compose up --build
```

### Option B — running locally, without Docker

**Backend:**
```bash
cd backend
./mvnw spring-boot:run
```
Requires a local MySQL instance running on port 3306, with credentials matching `src/main/resources/application.properties`.

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Runs on [http://localhost:5173](http://localhost:5173) by default.

---

## API overview

Full interactive documentation is available via Swagger UI once the backend is running (`/swagger-ui/index.html`). Summary of the main endpoints:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/ajo/user/register` | Register a new user |
| POST | `/ajo/user/login` | Log in with email and password |
| POST | `/ajo/circle/createcircle` | Create a new circle |
| GET | `/ajo/circle` | Get all circles |
| GET | `/ajo/circle/{id}` | Get a circle by id |
| GET | `/ajo/circle/user/{userId}` | Get circles a user organises or has joined |
| PUT | `/ajo/circle/{id}` | Update a circle |
| DELETE | `/ajo/circle/{id}` | Delete a circle |
| POST | `/ajo/circlemember/join` | Join a circle by invite code |

## Seed data

`data.sql` seeds a few starter users and circles automatically on first startup (or after `docker compose down -v`), so the app shows real, populated data immediately rather than an empty list.
