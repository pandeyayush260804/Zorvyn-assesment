# 💰 Financial Data Management And Acces Control Backend API

A modular backend system built using **Node.js, Express, and MongoDB** for managing users, financial records, and analytics with **JWT Authentication** and **Role-Based Access Control (RBAC)**.

---

## 🚀 Features

* 🔐 JWT Authentication (Register/Login)
* 🔒 Role-Based Access Control (Admin / Analyst / Viewer)
* 👤 User Management (Admin only)
* 💰 Financial Records (CRUD + Filtering)
* 📊 Dashboard Analytics (Summary, Trends, Insights)
* 🧱 Clean Architecture (Route → Controller → Service → Model)

---

## 🧠 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Tokens (JWT)
* bcrypt

---

## 📁 Project Structure

```
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

All protected routes require:

```
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

### 🔍 Filtering Options

You can filter records using query parameters:

```
GET /api/v1/records?type=income
GET /api/v1/records?category=food
GET /api/v1/records?startDate=2026-01-01&endDate=2026-12-31
GET /api/v1/records?type=expense&category=rent
```

---

## 📊 Dashboard Module

| Method | Endpoint            | Access                 | Description             |
| ------ | ------------------- | ---------------------- | ----------------------- |
| GET    | `/api/v1/dashboard` | Admin, Analyst, Viewer | Get dashboard analytics |

---

### 📈 Dashboard Includes

* Total Income
* Total Expense
* Net Balance
* Category-wise totals
* Recent activity
* Monthly trends
* Weekly trends

---

## 🔒 Role-Based Access Control (RBAC)

| Action                | Admin | Analyst | Viewer |
| --------------------- | ----- | ------- | ------ |
| Register/Login        | ✅     | ✅       | ✅      |
| Manage Users          | ✅     | ❌       | ❌      |
| Create Records        | ✅     | ❌       | ❌      |
| View Records          | ✅     | ✅       | ❌      |
| Update/Delete Records | ✅     | ❌       | ❌      |
| Dashboard Access      | ✅     | ✅       | ✅      |

---

## 🧪 Sample API Requests

### 🔹 Login

```
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

```
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

```
PORT=5555
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

## ▶️ Run Locally

```
npm install
npm run dev
```

---

## 🧠 Key Design Decisions

* Clean separation of concerns (Controller / Service / Model)
* JWT-based authentication for scalability
* Role-based middleware for secure access
* MongoDB aggregation for analytics

---

## 🎯 Conclusion

This project demonstrates:

* Secure backend design
* Scalable architecture
* Real-world financial data handling
* Advanced querying and analytics

---

## 👨‍💻 Author

Ayush Pandey
