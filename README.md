# 🧱 OrgPath - Succession & Organizational Effectiveness Platform

OrgPath is a full-stack, AI-driven web application designed to support structured promotion planning, talent mapping, and organizational analytics. 

This repository contains both the **React Frontend** and the **Node.js/PostgreSQL Backend**.

---

## ⚙️ Tech Stack

| Component | Technology |
|------------|-------------|
| **Frontend UI** | React, Vite, Tailwind CSS, Shadcn UI, Recharts |
| **Backend API** | Node.js (v20+), Express.js |
| **Database** | PostgreSQL |
| **Containerization** | Docker & Docker Compose |
| **Authentication** | JWT & bcrypt |

---

## 🚀 Quick Start (Local Development)

This guide will walk you through starting both the backend API and the frontend UI on your local machine.

### **1️⃣ Prerequisites**
* Install **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (Must be open and running in the background)
* Install **[Node.js](https://nodejs.org/en)** (Version 18 or higher)
* Ensure ports **8080** (Backend API), **5432** (Database), and **5173** (Frontend) are available.

---

### **2️⃣ Clone the Repository**
Open your terminal and run:
```bash
git clone [https://github.com/fluentflier/orgpath-backend.git](https://github.com/fluentflier/orgpath-backend.git)
cd orgpath-backend

3️⃣ Start the Backend & Database (Docker)
The backend and database run entirely inside Docker containers, so no local database installation is required.

Make sure you are in the root folder (orgpath-backend), then run these exact commands:
# 1. Stop and remove any old, running containers
docker-compose down

# 2. Rebuild the images and start the containers in the background
docker-compose up -d --build

# 3. Check the logs to make sure the server connected and started successfully
docker logs orgpath-api -f
(You should see ✅ Server running on port 8080 in the logs. Press Ctrl + C to exit the logs).

4️⃣ Start the Frontend UI (Vite)
Now that the backend is running, open a new terminal tab or window, navigate into the frontend folder, and start the React app:
# 1. Navigate into the frontend directory
cd react-frontend

# 2. Install the necessary dependencies (First time only)
npm install

# 3. Start the Vite development server
npm run dev -- --host

Your terminal will display a local network link (usually http://localhost:3000). Click that link to open OrgPath in your browser!

🧪 Testing the Deployment
Once the app is running in your browser, you can log in using the pre-seeded demo accounts:

Executive Dashboard (9-Box Matrix)

Email: arthur@orgpath.io

Password: test123

Team Lead Dashboard (Evaluation Wizard)

Email: ld@gmail.com

Password: test123

🧠 Database Management
The database schema and demo users are automatically created on startup via the init.sql file.

If you need to enter the database shell to view or modify data manually:

docker exec -it orgpath-db psql -U orgpath -d orgpath

(Type \dt to list tables, or \q to exit).

⚠️ Troubleshooting
🔹 Frontend says "Loading Employee Record..." indefinitely
If the frontend hangs on a loading screen, it means it cannot reach the backend database.

Ensure Docker Desktop is running.

Run docker-compose down followed by docker-compose up -d in the root folder to wake the backend back up.

🔹 Port already allocated (5432)
If Docker fails to start the database with a port is already allocated error, it means you have a local version of PostgreSQL running on your machine.

Open docker-compose.yml and change the database port mapping from 5432:5432 to 5433:5432.