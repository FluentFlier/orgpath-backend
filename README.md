
# 🧱 OrgPath Backend

OrgPath is an AI-driven **succession and organizational effectiveness** platform.  
This backend powers authentication, assessment data collection, and analytics APIs — built for **Akamai Connected Cloud (Linode)** and designed for global scalability with **Akamai EdgeWorkers**.

---

## 🌐 Architecture Overview

Browser (Frontend)
│
├── Akamai Edge CDN
│    ├─ Serves static frontend (Object Storage)
│    ├─ Validates JWT via EdgeWorker
│    └─ Routes /api/* to Linode API origin
│
└── Linode Backend (Docker/Kubernetes)
├─ Node.js (Express API)
│   ├─ /auth        → registration & login
│   ├─ /assessment  → data collection
│   ├─ /dashboard   → analytics dashboard
│   └─ /algorithms  → future ML modules
├─ PostgreSQL (Managed on Linode)
├─ Object Storage (S3-compatible)
└─ Future: ML microservices for org analytics

````

---

## ⚙️ Tech Stack

| Component | Technology |
|------------|-------------|
| Runtime | Node.js 20+ |
| Framework | Express.js |
| Database | PostgreSQL |
| Containerization | Docker & Docker Compose |
| Hosting | Akamai Connected Cloud (Linode) |
| Auth | JWT (validated via Akamai EdgeWorkers) |
| Future | Linode Kubernetes Engine (LKE) |

---

## 🚀 Quick Start (Local Development)

### **1️⃣ Prerequisites**
- Install **Docker Desktop** (Mac/Windows/Linux)
- Ensure ports **8080** (API) and **5433** (DB) are available  
  > Note: we use port `5433` on host to avoid conflict with local PostgreSQL.

---

### **2️⃣ Clone & Setup**
```bash
git clone https://github.com/fluentflier/orgpath-backend.git
cd orgpath-backend
cp .env.example .env
````

Edit `.env` as needed:

```env
PORT=8080
DATABASE_URL=postgres://orgpath:orgpath@db:5432/orgpath
JWT_SECRET=change-this-secret
ALLOWED_ORIGIN=http://localhost:3000
```

---

### **3️⃣ Run with Docker Compose**

```bash
docker-compose up --build
```

This will:

* Start a PostgreSQL 15 container
* Build and start the Node.js API
* Run DB migrations from `db/init.sql`

You’ll see:

```
✅ OrgPath backend running on port 8080
```

Check it:

```
curl http://localhost:8080
# → "OrgPath API is running 🚀"
```

---

### **4️⃣ Test API Endpoints**

#### Register a user

```bash
curl -X POST http://localhost:8080/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username":"anirudh","email":"a@b.com","password":"secret"}'
```

#### Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"a@b.com","password":"secret"}'
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "username": "anirudh", "email": "a@b.com" }
}
```

Use this JWT token in `Authorization: Bearer <token>` for subsequent requests.

---

## 🧠 Database Commands

To enter the database shell:

```bash
docker exec -it orgpath-backend-db-1 psql -U orgpath -d orgpath
```

List tables:

```
\dt
```

---

## ⚠️ Troubleshooting Docker

### 🔹 **Port already allocated (5432)**

If you see:

```
Bind for 0.0.0.0:5432 failed: port is already allocated
```

It means your Mac already has Postgres running.

Fix by editing `docker-compose.yml`:

```yaml
ports:
  - "5433:5432"
```

Then rebuild:

```bash
docker-compose down
docker-compose up --build
```

### 🔹 **Container not running**

If a container stopped unexpectedly:

```bash
docker ps -a
docker logs <container_name>
```

To restart everything cleanly:

```bash
docker-compose down
docker-compose up -d --build
```

---

## 🧱 Database Schema (from `db/init.sql`)

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assessments (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  responses JSONB,
  score NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dashboards (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
---

## 📈 Future Modules

| Module                 | Description                                      |
| ---------------------- | ------------------------------------------------ |
| **Algorithms**         | Predict org effectiveness & succession readiness |
| **Integrations**       | HRIS / Excel / third-party connectors            |
| **Analytics**          | Employee, Manager, and Org dashboards            |
| **Notifications**      | Email/SMS for insights and events                |
| **EdgeKV Integration** | Store lightweight configs & revoked tokens       |

---

## 🧑‍💻 Contributors

| Role             | Name                 |
| ---------------- | -------------------- |
| Backend Engineer     | **Anirudh Manjesh**  |
| Backend Engineers        | **Abdullah Alzoabi** |

---
