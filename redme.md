# Schema Reference App

A full-stack application built with **React, Express.js, MongoDB, and Mongoose** to demonstrate how one Mongoose schema can reference another schema.

## 📌 Project Overview

This project demonstrates a relationship between two MongoDB collections:

* **User** — stores user information.
* **Post** — stores post information and references a User using MongoDB's ObjectId.

Mongoose's `populate()` method is used to retrieve the related user information along with posts.

## 🚀 Technologies Used

### Frontend

* React
* Vite
* JavaScript
* CSS
* Fetch API

### Backend

* Node.js
* Express.js
* Mongoose
* MongoDB
* CORS
* dotenv
* Nodemon

## 📂 Project Structure

```text
schema-reference/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   └── package.json
│
└── README.md
```

## 🗄️ Database Schemas

### User Schema

The User schema stores:

```text
name
email
```

Example:

```json
{
  "name": "Aman",
  "email": "aman@gmail.com"
}
```

### Post Schema

The Post schema stores:

```text
title
content
user
```

The `user` field contains a reference to the User schema:

```js
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}
```

## 🔗 Schema Referencing

The main concept of this project is referencing the User schema from the Post schema.

```text
User
 │
 ├── _id
 ├── name
 └── email
       ↑
       │
       │ reference
       │
Post
 ├── _id
 ├── title
 ├── content
 └── user
```

Mongoose `populate()` is used to retrieve user information:

```js
Post.find()
    .populate("user", "name email")
```

This allows the application to display the post together with the user's name and email.

## 🔌 API Routes

### Create User

```http
POST /users
```

Request body:

```json
{
  "name": "Aman",
  "email": "aman@gmail.com"
}
```

### Create Post

```http
POST /posts
```

Request body:

```json
{
  "title": "My First Post",
  "content": "Hello MongoDB",
  "user": "USER_ID"
}
```

The `user` value should be the `_id` of an existing user.

### Get All Posts

```http
GET /posts
```

This route retrieves all posts and populates the related user information.

## 💻 Frontend Features

The React frontend provides:

* Create User form
* Create Post form
* User selection dropdown
* API integration with Express backend
* Display all posts
* Display related user information
* Refresh posts and users
* Success and error messages

## ⚙️ Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/schema_reference
```

## 📦 Installation

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

### 2. Open the project

```bash
cd schema-reference
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

## ▶️ Run the Application

The backend and frontend need to run separately.

### Start Backend

Inside the `backend` folder:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

You should see:

```text
MongoDB connected successfully
Server running on http://localhost:5000
```

### Start Frontend

Inside the `frontend` folder:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173/
```

Open this URL in your browser.

## 🔄 Application Flow

```text
React Frontend
      ↓
Fetch API
      ↓
Express.js Backend
      ↓
Mongoose
      ↓
MongoDB
```

### Creating a User

```text
User Form
    ↓
POST /users
    ↓
Express
    ↓
Mongoose
    ↓
MongoDB
```

### Creating a Post

```text
Post Form
    ↓
Select User
    ↓
POST /posts
    ↓
Post stores User ObjectId
    ↓
MongoDB
```

### Displaying Posts

```text
GET /posts
    ↓
Post.find()
    ↓
.populate("user", "name email")
    ↓
React
    ↓
Posts + User Information
```

## 🎯 Assignment Requirements

| Requirement               | Status |
| ------------------------- | ------ |
| MongoDB connection        | ✅      |
| Mongoose                  | ✅      |
| User Schema               | ✅      |
| Post Schema               | ✅      |
| User reference in Post    | ✅      |
| POST /users               | ✅      |
| POST /posts               | ✅      |
| GET /posts                | ✅      |
| Populate user information | ✅      |
| React frontend            | ✅      |
| User input form           | ✅      |
| Post input form           | ✅      |
| Submit data               | ✅      |
| Display posts             | ✅      |

## 🧑‍💻 Author

**Aman Kushwaha**

B.Tech Computer Science & Engineering

## 📄 License

This project was created for educational and assignment purposes.
