 # 🎓 UniHang
### Connect • Plan • Hangout

![MERN](https://img.shields.io/badge/MERN-Stack-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

UniHang is a full stack MERN web application that helps students create hangout plans, join meetups, and chat with participants in one platform.

It provides a simple and interactive way for college students to organize group activities and manage plans efficiently.

---

# ✨ Features

## User Features
- User Signup and Login (Authentication)
- Create Hangout Plans
- Join existing plans
- Withdraw from joined plans
- Delete plans created by user
- Upload image for hangout
- View participants list

## Plan Details
Each plan includes:
- Title
- Description
- Location
- Date and Time
- Group Type (Girls / Boys / Anyone)
- Plan Image

Users can:
- View all upcoming plans
- View plans created by them
- View joined plans

## Smart Filters
Plans can be filtered by:
- Group type (Girls / Boys / Anyone)
- Created Plans
- Joined Plans

Past plans are automatically hidden.

## Chat Feature
Each hangout includes a chat section where participants can communicate easily.

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Axios

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Other Tools
- JWT Authentication
- REST APIs
- Git & GitHub

---

# 📂 Folder Structure

UniHang
│
├── frontend
│   ├── components
│   ├── pages
│   ├── api
│   └── App.js
│
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   └── server.js
│
└── README.md

---

# 🔗 API Endpoints

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/plans | Get all plans |
| POST | /api/plans | Create new plan |
| PUT | /api/plans/join | Join plan |
| PUT | /api/plans/withdraw | Withdraw from plan |
| DELETE | /api/plans/:id | Delete plan |
| GET | /api/chat/:planId | Get chat messages |

Total APIs used: 7+ REST APIs

---

# ⚙️ Installation

## Clone repository

git clone https://github.com/your-username/unihang.git
cd unihang

## Install dependencies

### frontend

cd frontend
npm install
npm start

### backend

cd backend
npm install
npm run dev

---

# 🔑 Environment Variables

Create a .env file inside backend folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Important: Do not upload .env file on GitHub.

---

# 🧠 Concepts Used

- REST API integration
- CRUD operations
- Authentication and Authorization
- React Hooks (useState, useEffect)
- Conditional rendering
- Protected routes
- Filtering logic
- Component based architecture
- MongoDB schema design

---

# 🚀 Future Improvements

- Real-time chat using Socket.io
- Notification system
- Profile customization
- Mobile responsive improvements
- Plan recommendation feature

---

# 👩‍💻 Author

Harshita Sharma  
B.E Computer Science Student  
Full Stack Developer

---

# ⭐ Support

If you like this project, give it a star on GitHub.
