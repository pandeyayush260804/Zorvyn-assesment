# 💰 Financial Data Management & Access Control Backend API

A scalable backend system built with **Node.js, Express, and MongoDB** to manage financial records, enforce access control, and provide analytics for a finance dashboard.

---

## 🌐 Live API

👉 https://zorvyn-assesment-kx9x.onrender.com/

---

## ✨ Highlights

* 🔐 Secure authentication using JWT
* 🔒 Role-Based Access Control (RBAC)
* 💰 Financial records with advanced filtering
* 📊 Dashboard analytics using MongoDB aggregation
* 🧱 Clean modular architecture
* 🌐 Deployed and production-ready

---

## 🚀 Features

* 🔐 Authentication (Register/Login)
* 🔒 Role-Based Access Control (Admin / Analyst / Viewer)
* 👤 User Management (Admin only)
* 💰 Financial Records (CRUD + Filtering)
* 📊 Dashboard Analytics (Summary, Trends, Insights)

---

## 🧠 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Tokens (JWT)
* bcrypt

---

## 📁 Project Structure

```bash
backend/
├── config/
├── controllers/
├── services/
├── models/
├── middlewares/
├── api/v1/routes/
├── server.js
```

---

## 🔐 Authentication

### 🔓 Public Routes

| Method | Endpoint                 | Description                              |
| ------ | ------------------------ | ---------------------------------------- |
| POST   | `/api/v1/users/register` | Register new user (default role: viewer) |
| POST   | `/api/v1/users/login`    | Login user (returns JWT token)           |

---

### 🔒 Protected Routes

All protected endpoints require:

```bash
Authorization: Bearer <JWT_TOKEN>
```

---

## 👤 User Module (Admin Only)

| Method | Endpoint            | Access | Description   |
| ------ | ------------------- | ------ | ------------- |
| GET    | `/api/v1/users`     | Admin  | Get all users |
| PUT    | `/api/v1/users/:id` | Admin  | Update user   |
| DELETE | `/api/v1/users/:id` | Admin  | Delete user   |

---

## 💰 Record Module

| Method | Endpoint              | Access         | Description   |
| ------ | --------------------- | -------------- | ------------- |
| POST   | `/api/v1/records`     | Admin          | Create record |
| GET    | `/api/v1/records`     | Admin, Analyst | Get records   |
| PUT    | `/api/v1/records/:id` | Admin          | Update record |
| DELETE | `/api/v1/records/:id` | Admin          | Delete record |

---

### 🔍 Filtering Examples

```bash
GET /api/v1/records?type=income
GET /api/v1/records?category=food
GET /api/v1/records?startDate=2026-01-01&endDate=2026-12-31
GET /api/v1/records?type=expense&category=rent
```

---

## 📊 Dashboard Module

| Method | Endpoint            | Access                 | Description         |
| ------ | ------------------- | ---------------------- | ------------------- |
| GET    | `/api/v1/dashboard` | Admin, Analyst, Viewer | Dashboard analytics |

---

### 📈 Dashboard Insights

* Total Income
* Total Expenses
* Net Balance
* Category-wise totals
* Recent activity
* Monthly trends
* Weekly trends

---

## 🔒 Role-Based Access Control (RBAC)

| Action           | Admin | Analyst | Viewer |
| ---------------- | ----- | ------- | ------ |
| Register/Login   | ✅     | ✅       | ✅      |
| Manage Users     | ✅     | ❌       | ❌      |
| Create Records   | ✅     | ❌       | ❌      |
| View Records     | ✅     | ✅       | ❌      |
| Update/Delete    | ✅     | ❌       | ❌      |
| Dashboard Access | ✅     | ✅       | ✅      |

---

## 🧪 Sample Requests

### 🔹 Login

```bash
POST /api/v1/users/login
```

```json
{
  "username": "admin01",
  "password": "123456"
}
```

---

### 🔹 Create Record

```bash
POST /api/v1/records
```

```json
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "description": "Monthly salary"
}
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```bash
PORT=5555
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

## ▶️ Run Locally

```bash
npm install
npm run dev
```

---

## 🧠 Design & Architecture

* Route → Controller → Service → Model
* Centralized error handling
* Middleware-based authentication & RBAC
* Aggregation pipelines for analytics

---

## 🔐 Security

* Passwords hashed using bcrypt
* JWT-based authentication
* Role-based authorization enforced at route level
* Sensitive data (like passwords) excluded from responses

---

## 📌 Assumptions

* New users are assigned the **viewer** role by default
* Only admins can manage users and records
* Analysts can view records and insights
* Viewers can access only dashboard data

---

## 🧪 Demo Instructions

1. Login using provided credentials
2. Copy JWT token
3. Use token in headers:

   ```
   Authorization: Bearer <token>
   ```
4. Test records and dashboard endpoints

---

## 🎯 Conclusion

This project demonstrates:

* Strong backend architecture
* Secure authentication & authorization
* Real-world financial data processing
* Clean, maintainable, and scalable design

---

## 👨‍💻 Author

**Ayush Pandey**
