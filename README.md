# ÀJỌ- Community Savings Circle Management Platform

ÀJỌ is a digital rotational savings circle (susu/ajo) platform, built for a fullstack development course with CBF Academy. It's designed to bring transparency and accountability to informal community savings groups, letting members create circles, join via invite code, track contributions, and follow the payout rotation, all in one place.


---

## Project vision

The original goal (see `BRD.md` / project brief) was a full platform supporting:

- User registration and login
- Creating and joining savings circles via a unique invite code
- Submitting and approving contributions each cycle
- Automatic payout rotation, based on each member's position
- An activity feed logging circle events
- Stretch features: trust scores, circle health indicators, payment reminders, proof-of-payment uploads, waiting lists

## What's actually built (current scope)

Given the time available, I made a deliberate call to build **one feature end-to-end, fully** Circles- rather than build every entity partially. Full CRUD for Circles is implemented and working, on both backend and frontend, and User registration is implemented on the backend.

**Backend (Spring Boot + MySQL):**
- `User` - registration only (entity, repository, service, controller, DTOs, custom exception for duplicate emails)
- `Circle` - full CRUD (create, read all, read by id, update, delete), with DTOs, auto-generated invite codes, and seed data
- Swagger/OpenAPI documentation, live at `/swagger-ui/index.html`

**Frontend (React + TypeScript + Chakra UI):**
- Multi-page navigation (home, create, detail, edit) using React state — no router library, by design, given time constraints
- Home page: grid list of all circles, fetched live from the API
- Create circle form, with client-side validation (name, amount, member count, date)
- Click a circle to view its full detail (via a genuine `GET /circle/{id}` call, not just reused list data — a deliberate choice, made on my mentor's advice)
- Edit circle (reuses the create form, pre-filled)
- Delete circle
- Typed API client (`api.ts`) wrapping all backend calls

**Infrastructure:**
- Docker Compose with three services: `frontend` (nginx), `backend` (Spring Boot), `db` (MySQL) isolated network, persistent volume for the database, environment variables via `.env` (not hardcoded), and a healthcheck gating the database's readiness before the backend starts
- Seed data for both users and circles, so a fresh container shows a populated app immediately

## What's not built yet (known gaps)

Being upfront about these, since I'd rather state the scope clearly than have it discovered:

- **`CircleMember`, `Contribution`, `Payout`, `ActivityLog`** — not built. These are the entities that would implement the actual "rotational savings" logic (joining a circle, submitting contributions, the payout rotation itself). Circle currently exists as a standalone entity with no members attached.
- **Password hashing** - passwords are currently stored in plaintext. BCrypt hashing was planned but not yet wired in.
- **Real authentication** - there's no login endpoint, and Spring Security is currently configured to permit all requests (`SecurityConfig.java`), purely to unblock local development and testing. This is a known, deliberate placeholder, not an oversight — real endpoint protection (public register/login, authenticated everything else) is a planned next step.
- **Circle organiser** - the `Circle` entity has an `organiser` field (a `@ManyToOne` relationship to `User`), but it's never populated in the current CRUD flow, since building real login/session handling was out of scope for this pass.

## What I'd do with more time

1. Build `CircleMember` (joining a circle via invite code) and wire up the organiser relationship properly
2. Build `Contribution` and `Payout`, including the actual rotation logic (`((cycleNumber - 1) % totalMembers) + 1`)
3. Add BCrypt password hashing and a real login endpoint, then replace the temporary permissive `SecurityConfig` with proper route protection
4. Add the `ActivityLog` feed
5. Consider client-side routing (`react-router-dom`) for real URLs, if the app grows further

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
│   │   ├── circle/   # Circle entity, repository, service, controller, DTOs
│   │   ├── user/     # User entity, repository, service, controller, DTOs
│   │   ├── config/   # Security config
│   │   └── exception/
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

### Option A- Docker Compose (recommended)

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

### Option B- running locally, without Docker

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
| POST | `/ajo/circle/createcircle` | Create a new circle |
| GET | `/ajo/circle` | Get all circles |
| GET | `/ajo/circle/{id}` | Get a circle by id |
| PUT | `/ajo/circle/{id}` | Update a circle |
| DELETE | `/ajo/circle/{id}` | Delete a circle |

## Seed data

`data.sql` seeds a few starter users and circles automatically on first startup (or after `docker compose down -v`), so the app shows real, populated data immediately rather than an empty list.
