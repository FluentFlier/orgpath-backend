# OrgPath — Project Handover

**Prepared:** 2026-04-24
**Repository:** https://github.com/FluentFlier/orgpath
**Audience:** Sponsor / next development team taking over the project

This document is the single source of truth for picking up OrgPath. It covers what the app does today, how to run it, where the code lives, what is incomplete, and what to build next. The existing `README.md` is developer-quickstart focused and partly out of date — where the two disagree, this document is authoritative.

---

## 1. What OrgPath Is

OrgPath is an **AI-driven succession and organizational effectiveness platform**. It is intended to help organizations:

- Collect employee, team-lead, and company-level **assessment** data
- Score and visualize that data on **role-based dashboards**
- Eventually run **ML/algorithms** to predict org effectiveness and succession readiness

The current codebase is an early working prototype. Authentication, assessment CRUD, and a basic analytics dashboard are implemented end-to-end. Team management, ML, payments, and integrations are not.

---

## 2. High-Level Architecture

```
Browser (static HTML/JS frontend)
  │
  ├── (intended) Akamai Edge CDN + EdgeWorkers — JWT validation, static hosting
  │
  └── Node.js / Express API  (http://localhost:8080)
        ├── /api/auth        → register, login, /me
        ├── /api/assessment  → create + list assessments (JWT-protected)
        ├── /api/dashboard   → aggregated stats for logged-in user
        │
        └── PostgreSQL 15 (Docker, host port 5433)
              ├── users
              ├── assessments
              └── dashboards  (table exists, currently unused)
```

**Deploy target (intended, not yet built):** Akamai Connected Cloud / Linode with Linode Kubernetes Engine (LKE). Only local Docker Compose is wired up today.

---

## 3. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Backend runtime | Node.js 20+ | ES modules (`"type": "module"`) |
| Backend framework | Express 4.19 | |
| DB | PostgreSQL 15 | via `pg` Pool |
| Auth | JWT (`jsonwebtoken`) | 1-hour token expiry |
| Password hashing | `bcryptjs` | 12 salt rounds |
| Frontend | Vanilla HTML/CSS/JS | No framework, no build step |
| Charts | Chart.js 4.4 | Line + bar charts |
| Containerization | Docker + Docker Compose | API + Postgres |
| CORS | `cors` middleware | Allow-list via `CORS_ORIGIN` env |

---

## 4. Repository Layout

```
orgpath/
├── README.md                  # Quickstart (partly stale — see §10)
├── HANDOVER.md                # This document
├── .gitignore
│
├── backend/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── .env.example
│   ├── package.json           # scripts: start, dev
│   ├── server.js              # Express entry point
│   ├── db/
│   │   └── init.sql           # Schema — auto-run on first DB boot
│   └── src/
│       ├── config.js          # Reads env vars
│       ├── db.js              # Shared pg Pool
│       ├── routes/
│       │   ├── auth.js        # /api/auth/*
│       │   ├── assessment.js  # /api/assessment/*
│       │   └── dashboard.js   # /api/dashboard
│       └── utils/
│           └── authMiddleware.js  # JWT verify
│
└── frontend/
    ├── index.html                  # Login/Register (tabbed)
    ├── employee-dashboard.html     # Role "employee" (ref code starts with A)
    ├── teamlead-dashboard.html     # Role "lead"     (ref code starts with B)
    ├── company-dashboard.html      # Role "company"  (ref code starts with C)
    ├── css/styles.css
    ├── js/
    │   ├── app.js              # Auth forms + role-based redirect
    │   └── dashboard.js        # Fetches /api/dashboard, renders Chart.js
    └── assets/                 # Logos + reCAPTCHA image (mock)
```

---

## 5. How to Run It (Local)

**Prereqs:** Docker Desktop, free ports `8080` (API) and `5433` (DB).

```bash
git clone https://github.com/FluentFlier/orgpath.git
cd orgpath/backend
cp .env.example .env
docker-compose up --build
```

Verify:
```bash
curl http://localhost:8080
# → OrgPath API is running 🚀
```

**Frontend:** There is no bundler. Serve `frontend/` with any static server on port `3000` (that origin is allow-listed by default):
```bash
cd ../frontend && python3 -m http.server 3000
# then open http://localhost:3000
```

**DB shell:**
```bash
docker exec -it orgpath-db psql -U orgpath -d orgpath
```

**Scripts (`backend/package.json`):**
- `npm start` — `node server.js`
- `npm run dev` — `nodemon server.js`

---

## 6. Environment & Configuration

Loaded in `backend/src/config.js`:

| Var | Purpose | Default |
|---|---|---|
| `DATABASE_URL` | Postgres connection string | `postgresql://orgpath:orgpath@db:5432/orgpath` |
| `JWT_SECRET` | Signs JWTs — **must be rotated before prod** | `your-super-secret-jwt-key-here` (placeholder) |
| `NODE_ENV` | `development` relaxes CORS to allow any origin | `development` |
| `PORT` | API port | `8080` |
| `CORS_ORIGIN` | Comma-separated allow-list | `http://localhost:3000,http://localhost:8080` |

Generate a real JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**⚠️ Note:** `README.md` references `ALLOWED_ORIGIN` — that is stale. The code reads `CORS_ORIGIN` (`backend/src/config.js:11`, `backend/server.js:14`).

---

## 7. API Reference

All protected endpoints require `Authorization: Bearer <jwt>`.

### `POST /api/auth/register` — `backend/src/routes/auth.js:65`
Body: `{ firstName, lastName, email, password, referralCode }`
- Password: min 8 chars, ≥1 letter + ≥1 digit
- Referral code **first letter** determines role:
  - `A*` → `employee`
  - `B*` → `lead`
  - `C*` → `company`
- Returns `{ token, user }`

### `POST /api/auth/login` — `backend/src/routes/auth.js:149`
Body: `{ identifier, password }` (identifier = email or username)
Returns `{ token, user }`

### `GET /api/auth/me` — `backend/src/routes/auth.js:214`
Returns decoded JWT payload.

### `POST /api/assessment` — `backend/src/routes/assessment.js:13`
Body: `{ responses: object, score: number (0–100) }`

### `GET /api/assessment` — `backend/src/routes/assessment.js:65`
Returns all assessments for the authenticated user.

### `GET /api/dashboard` — `backend/src/routes/dashboard.js:11`
Returns `{ user, assessments, stats: { total, average, latest, trend } }`.

---

## 8. Database Schema

Defined in `backend/db/init.sql` and auto-applied on first Postgres boot.

```sql
users         (id, first_name, last_name, username UNIQUE,
               email UNIQUE, password_hash, referral_code,
               role DEFAULT 'employee', created_at)

assessments   (id, user_id → users.id, responses JSONB,
               score NUMERIC, created_at)

dashboards    (id, user_id → users.id, data JSONB, created_at)
              -- table exists, no route reads or writes it yet
```

**Migrations:** None. There is no migration framework — schema changes today mean editing `init.sql` and wiping the volume. **Adding a migration tool (e.g. `node-pg-migrate` or Prisma Migrate) should be one of the first tasks.**

---

## 9. Deployment

| Aspect | State |
|---|---|
| Local Docker Compose | ✅ Working |
| Dockerfile (prod-grade) | ⚠️ Functional but not optimized (no multi-stage, no non-root user) |
| CI/CD | ❌ No GitHub Actions workflows |
| Linode / LKE configs | ❌ Not written |
| Akamai EdgeWorker | ❌ Not written |
| Secrets management | ❌ `.env` only |
| Frontend hosting | ❌ Not deployed; intended for S3-compatible Object Storage |

Target architecture (per `README.md`): Linode-managed Postgres, API on LKE, static frontend on Linode Object Storage, Akamai Edge CDN + EdgeWorkers for JWT validation at the edge. **None of this is set up.**

---

## 10. Testing

**There are no automated tests** — no Jest, Mocha, Cypress, Playwright, or similar. All validation has been manual (curl + browser).

Validation that *is* implemented (at the application layer, not in tests):
- Email format regex, password strength — `backend/src/routes/auth.js:12–31`
- Assessment score range 0–100 — `backend/src/routes/assessment.js:34–39`
- JWT verification middleware — `backend/src/utils/authMiddleware.js`

**Recommended first testing pass:**
1. Jest + Supertest for the Express API (auth flow, assessment CRUD, dashboard aggregation).
2. Playwright for a happy-path frontend smoke test (register → login → submit assessment → see dashboard).
3. GitHub Actions to run both on PR.

---

## 11. Known Gaps & TODOs

### Explicit TODOs in code
- `frontend/js/app.js:195` — *"TODO: replace with your real start route"*. The "Start" button on session/pricing tiles only `console.log`s; it does not navigate to an assessment.

### Unfinished features (sponsor should know)
1. **Assessment flow** — No questionnaire UI. `POST /api/assessment` works, but the frontend has no form to call it.
2. **Team / org management** — Team-lead and company dashboards render the *same* individual-user data as the employee dashboard. There are no backend endpoints for team members, org hierarchy, or role-based data aggregation.
3. **Role-based authorization** — JWT carries a `role` claim, but no route enforces role checks. A user with role `employee` can call every endpoint a `company` user can.
4. **Payments** — `frontend/index.html` shows a pricing modal with "PAY NOW" buttons; nothing is wired to Stripe or any processor.
5. **reCAPTCHA** — `assets/recaptcha-logo.png` and the checkbox on the auth page are purely cosmetic. No Google reCAPTCHA integration.
6. **Notifications, Integrations (HRIS/Excel), ML algorithms** — listed in `README.md` as future; zero implementation.
7. **`dashboards` table** — Created in schema, never read or written. Either wire it up or drop it.
8. **Frontend state** — Uses `sessionStorage`, so a tab close logs the user out. Consider `localStorage` or refresh tokens.

### Security items already addressed (commit `c6c726c`)
- JWT secret + DB creds moved to env vars
- CORS tightened (was `*`)
- Email + password strength validation added

### Security items still open
- No rate limiting on `/api/auth/*` (brute-force risk)
- No refresh tokens; 1-hour hard expiry, no revocation mechanism
- No `helmet` middleware
- No audit log for assessment/admin actions

---

## 12. Recent Git History (context for the incoming team)

```
11877e6  Merge PR #1: review of Abdullah's branch
c6c726c  Fix critical security issues and add missing functionality
c442f39  Integrate database schema and add dashboard visualizations
70f7ab8  Delete server.js              ← top-level cleanup
0b54364  Delete Dockerfile             ← top-level cleanup
ae139b7  Delete package.json           ← top-level cleanup
21438bd  Delete docker-compose.yml     ← top-level cleanup
40c6dc3  Cleanup: remove duplicate top-level db/src folders
7f1ef49  Initial working version of OrgPath (frontend + backend unified)
```

**Takeaway:** The repo was recently consolidated — everything backend-related now lives under `backend/`. If you find references to top-level `server.js` / `Dockerfile` / `db/` in old docs or screenshots, they are gone.

**Prior contributors:**
- Anirudh Manjesh — Backend Engineer
- Abdullah Alzoabi — Backend Engineer

---

## 13. Suggested First 2 Weeks for the Next Team

Rough priority order — adjust to sponsor goals.

1. **Stand up the environment** — clone, `docker-compose up`, register a user per role, click through all three dashboards. Confirm everything in §5 actually works for you.
2. **Add a migration tool** (`node-pg-migrate` or Prisma) and convert `init.sql` into the first migration. Schema changes are otherwise going to hurt.
3. **Add role-based authorization** — extend `authMiddleware.js` with a `requireRole(...)` helper and apply it per route. This is both a security gap and a prerequisite for team features.
4. **Build the assessment questionnaire UI** and wire the "Start" button (`frontend/js/app.js:195`) to it. This closes the biggest user-visible loop.
5. **Introduce tests + CI** — Jest + Supertest for `auth.js` and `assessment.js`, a GitHub Actions workflow, and a lint step (there is currently no linter).
6. **Team/org data model** — design the tables (teams, memberships, org units) and the endpoints the team-lead and company dashboards actually need. The existing dashboards are placeholders until this lands.
7. **Deploy target decision** — commit to Linode/LKE (per `README.md`) or pick a simpler target (Linode + single-VM Docker, Fly.io, Render). Write the IaC/workflow for it.
8. **Rotate `JWT_SECRET`** and move `.env` into a real secret store before any non-local deploy.

---

## 14. Quick Reference — Files You Will Touch First

| If you need to… | Open |
|---|---|
| Add/modify an API route | `backend/src/routes/*.js` + `backend/server.js` |
| Change the DB schema | `backend/db/init.sql` (and add a migration tool!) |
| Change auth logic | `backend/src/routes/auth.js`, `backend/src/utils/authMiddleware.js` |
| Change env handling | `backend/src/config.js`, `backend/.env.example` |
| Change CORS / middleware | `backend/server.js` |
| Build an assessment form | `frontend/js/app.js`, new HTML page |
| Change dashboard charts | `frontend/js/dashboard.js`, `*-dashboard.html` |
| Change Docker setup | `backend/Dockerfile`, `backend/docker-compose.yml` |

---

*End of handover document.*
