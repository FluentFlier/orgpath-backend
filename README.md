# OrgPath Backend

OrgPath is an AI-driven succession and organizational effectiveness platform.  
This backend provides authentication, assessment data collection, analytics, and dashboard APIs — built for **Akamai Connected Cloud (Linode)** and integrated with **Akamai EdgeWorkers** for global scalability.

---


### 🧩 Module Mapping
| Function | Backend Module | Description |
|-----------|----------------|--------------|
| Login/Onboarding | `/auth` | JWT-based user registration & login |
| Assessments | `/assessment` | Store and retrieve survey data |
| Dashboards | `/dashboard` | Fetch organization, team, and employee KPIs |
| Algorithms | `/algorithms` (future) | Org effectiveness, succession prediction |
| Integrations | `/integrations` (future) | HRIS, Excel, or 3rd-party connectors |

---

## ⚙️ Tech Stack
- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Database:** PostgreSQL (Managed by Linode)
- **Auth:** JWT (validated via Akamai EdgeWorker)
- **Containerization:** Docker & Docker Compose
- **Hosting:** Linode Kubernetes (LKE)
- **Storage:** Linode Object Storage (S3 compatible)

---

## 🧠 Quick Start

### 1. Clone & Setup
```bash
git clone https://github.com/yourusername/orgpath-backend.git
cd orgpath-backend
cp .env.example .env

