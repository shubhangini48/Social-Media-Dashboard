# 📊 Social Media Dashboard

A full-stack web application that allows users to track, analyze, and schedule posts across social media platforms like **Twitter** and **Instagram**.

## 🚀 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js (Express.js)
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token)
- **Scheduling:** node-cron
- **APIs:** Twitter API, Instagram Graph API (future integration)

---

## 🧩 Features

- 🔐 User authentication and profile management
- 📈 Analytics with dynamic charts
- 📅 Schedule posts for future publishing
- 📤 Post simulation using cron jobs (API integration upcoming)

---

## 📁 Project Structure
project-root/
├── client/ # React frontend
│ └── src/pages/ # Pages: Dashboard, Login, Signup, Scheduler, Analytics
│
├── server/ # Node backend
│ ├── controllers/ # Auth and Scheduler logic
│ ├── routes/ # Route handlers
│ ├── db.js # PostgreSQL connection
│ └── index.js # Express server entry
│
└── .env # Environment variables
