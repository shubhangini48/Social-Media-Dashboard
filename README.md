# Social Media Management & Analytics Platform

A full-stack web application for managing social media content, scheduling posts, and analyzing publishing activity through a centralized dashboard.

## 🚀 Features

* JWT-based user authentication
* Secure password hashing with bcrypt
* Protected REST APIs
* Create, edit, delete and view posts
* Support for Instagram, Twitter/X, LinkedIn and Facebook
* Schedule posts for future publishing
* Automated background scheduling with `node-cron`
* Dashboard with publishing statistics
* Platform-wise analytics
* Post activity and status charts
* PostgreSQL relational database
* Request validation with `express-validator`
* Parameterized SQL queries
* React-based dashboard

> The current scheduler uses simulated publishing. Platform-specific social-media API integrations can be added through OAuth/API services.

## 📸 Screenshots

### Login

![Login](screenshots/login.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Posts Management

![Posts](screenshots/posts.png)

### Scheduler

![Scheduler](screenshots/scheduler.png)

### Analytics

![Analytics](screenshots/analytics.png)

## 🛠️ Tech Stack

**Frontend**

* React.js
* Vite
* React Router
* Axios
* Recharts
* Lucide React

**Backend**

* Node.js
* Express.js
* JWT
* bcryptjs
* express-validator
* node-cron

**Database**

* PostgreSQL

**Tools**

* Git
* GitHub
* VS Code
* pgAdmin

## 🏗️ Architecture

```text
React + Vite
      │
      │ REST API
      ▼
Node.js + Express
      │
      ├── Authentication
      ├── Post Management
      ├── Scheduler
      └── Analytics
      │
      ▼
PostgreSQL

node-cron
      │
      ▼
Scheduled Post Processing
```

## 📁 Project Structure

```text
Social-Media-Dashboard/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── service/
│   └── package.json
│
├── database/
│   └── schema.sql
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── db.js
│   ├── scheduler.js
│   ├── index.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── README.md
└── ...
```

## 🗄️ Database

Main tables:

* `users`
* `social_accounts`
* `posts`
* `analytics`

Relationships:

```text
users
 ├── posts
 └── social_accounts
          └── analytics
```

## 🔌 REST API

### Authentication

| Method | Endpoint            | Purpose                   |
| ------ | ------------------- | ------------------------- |
| POST   | `/api/auth/signup`  | Register user             |
| POST   | `/api/auth/login`   | Login                     |
| GET    | `/api/auth/profile` | Get authenticated profile |

### Posts

| Method | Endpoint         | Purpose          |
| ------ | ---------------- | ---------------- |
| POST   | `/api/posts`     | Create post      |
| GET    | `/api/posts`     | Get user's posts |
| GET    | `/api/posts/:id` | Get post         |
| PUT    | `/api/posts/:id` | Update post      |
| DELETE | `/api/posts/:id` | Delete post      |

### Scheduler

| Method | Endpoint                | Purpose               |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/scheduler/create` | Schedule post         |
| GET    | `/api/scheduler`        | View scheduled posts  |
| DELETE | `/api/scheduler/:id`    | Cancel scheduled post |

### Analytics

| Method | Endpoint                 | Purpose             |
| ------ | ------------------------ | ------------------- |
| GET    | `/api/metrics/dashboard` | Dashboard metrics   |
| GET    | `/api/metrics/status`    | Status distribution |
| GET    | `/api/metrics/activity`  | Post activity       |

### Health Check

```text
GET /api/health
```

Checks API and PostgreSQL connectivity.

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/shubhangini48/Social-Media-Dashboard.git
cd Social-Media-Dashboard
```

### 2. Create the PostgreSQL database

Create:

```text
social_media_dashboard
```

Then run:

```text
database/schema.sql
```

### 3. Configure the backend

```bash
cd server
npm install
```

Create `server/.env` using `server/.env.example`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/social_media_dashboard
JWT_SECRET=your_secure_jwt_secret
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

### 4. Configure the frontend

Open another terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## 🔐 Security

* bcrypt password hashing
* JWT authentication
* Protected routes
* Input validation
* Parameterized SQL queries
* User-specific database access
* CORS configuration
* Environment variables for secrets
* `.env` excluded from Git

For production social-media integrations, access and refresh tokens should also be encrypted and stored using secure secrets management.

## 🧪 Tested Functionality

* User registration and login
* Protected profile API
* Post CRUD operations
* Post scheduling
* Automated scheduled-post processing
* Dashboard metrics
* Analytics charts
* PostgreSQL connectivity
* Frontend/backend integration

## 📈 Future Enhancements

* Instagram Graph API integration
* LinkedIn API integration
* X/Twitter API integration
* Facebook Graph API integration
* OAuth account connection
* Real social-media publishing
* Media uploads
* AI caption generation
* Hashtag recommendations
* Advanced engagement analytics
* Redis-based job queue
* Docker deployment
* CI/CD pipeline
* Cloud deployment
* Automated unit and integration tests

## 👩‍💻 Project Highlights

**Role:** Full-Stack Developer

This project demonstrates practical experience with:

* Full-stack application architecture
* React development
* REST API design
* JWT authentication
* PostgreSQL database design
* CRUD operations
* Background job scheduling
* Analytics aggregation
* Data visualization
* Git/GitHub workflows
* Environment-based configuration

## 📌 Project Status

**Functional full-stack portfolio project**

The current scheduler simulates social-media publishing while the architecture is designed for future platform API integrations.

## 📄 License

Educational and portfolio project.
