
<h1 align="center">
  <br>
  <img src="/public/assets/readme/MythicDashboard.webp" width="180">
  <br>
  Mythic Dashboard
  <br>
</h1>

<p align="center">
  <b>An adaptable RPG character management platform built with Next.js and React.</b>
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-technologies">Technologies</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-24.x-brightgreen?logo=node.js" alt="Node"/>
  <img src="https://img.shields.io/badge/next.js-12.x-black?logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/prisma-6.x-2D3748?logo=prisma" alt="Prisma"/>
  <img src="https://img.shields.io/badge/postgresql-16-336791?logo=postgresql" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License"/>
</p>

<br>

![screenshot](/public/assets/readme/Preview.gif)

---

## 📖 Overview

**Mythic Dashboard** is an adaptable RPG platform for creating customized character sheets. The game master (GM) gets a dashboard with a live overview of all characters — health, sanity, and portraits — and full CRUD control. Players manage their own sheets in real time via Socket.io.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🎭 **Custom Character Sheets** | Tailored sheets for any RPG system |
| 🧙 **Game Master Dashboard** | Live overview of all characters with health and sanity tracking |
| ⚡ **Real-Time Updates** | Instant sync between GM and players via Socket.io |
| 🎲 **Dice Roller** | Built-in dice rolling system with history per character |
| 🗂️ **Inventory & Combat** | Full inventory and combat item management |

---

## 🛠️ Technologies

| Layer | Technology | Version |
|---|---|---|
| Frontend | React | 18.3.1 |
| Framework | Next.js | 12.x |
| ORM | Prisma | 6.x |
| Database | PostgreSQL | 16 |
| Real-time | Socket.io | 4.x |
| UI | Material UI (MUI) | 5.x |
| State | Zustand | 4.x |
| Runtime | Node.js | 24.x |

---

## 🚀 Getting Started

### Prerequisites

- [Git](https://git-scm.com)
- [Node.js 24.x](https://nodejs.org/en/download/)
- A PostgreSQL database (cloud or local — see options below)

---

### Step 1 — Set up PostgreSQL

Choose one of the options below:

<details>
<summary><b>☁️ Option A — Neon (recommended · free tier)</b></summary>

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard:
   ```
   postgresql://user:password@host.neon.tech/dbname?sslmode=require
   ```

</details>

<details>
<summary><b>☁️ Option B — Railway (free tier)</b></summary>

1. Create a free account at [railway.app](https://railway.app)
2. Create a new project → add a **PostgreSQL** service
3. Go to the service → **Connect** tab → copy the connection string

</details>

<details>
<summary><b>🐳 Option C — Local Docker</b></summary>

```bash
docker run --name dashrpg-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=rpg \
  -p 5432:5432 \
  -d postgres:16
```

Connection string: `postgresql://postgres:password@localhost:5432/rpg`

</details>

---

### Step 2 — Clone and Configure

```bash
# Clone the repository
git clone https://github.com/c-Bruno/dashrpg.git
cd dashrpg

# Install dependencies
npm install
```

Create a `.env` file at the project root:

```env
DB_PROVIDER_URL=postgresql://user:password@host/dbname
```

> Paste the connection string from Step 1.

---

### Step 3 — Run Migrations and Start

```bash
# Apply database migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Start the application
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Step 4 — Initial Data Setup

Run this once to populate default configurations:

```bash
curl -X POST http://localhost:3000/api/setup
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ for RPG players</p>

