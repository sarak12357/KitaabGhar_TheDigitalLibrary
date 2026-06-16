# 📚 KitaabGhar – Digital Library & Interactive Reading Platform

![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Express](https://img.shields.io/badge/Express.js-API-lightgrey)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

## 🌟 Overview

KitaabGhar is a full-stack MERN-based digital library platform designed to provide an engaging reading experience through book discovery, interactive quizzes, quotes, and a credit-based unlocking system.

The platform allows users to browse books across multiple genres, read inspiring quotes, maintain a personal reading list, and unlock book content using credits earned through quizzes.

---

## 🎯 Project Objectives

- Create a modern digital library experience.
- Encourage reading through gamification.
- Provide a personalized user experience.
- Implement secure authentication and user management.
- Demonstrate full-stack web development using the MERN stack.

---

# 🏗️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Context API
- Axios
- CSS / Inline Styling

## Backend
- Node.js
- Express.js
- JWT Authentication
- Bcrypt Password Hashing

## Database
- MongoDB
- Mongoose ODM

---

# 🚀 Features

## 👤 User Authentication

### Registration
- User registration
- Email validation
- Password validation
- Duplicate user prevention
- Password hashing using bcrypt

### Login
- Secure JWT-based authentication
- Session persistence using localStorage
- Protected routes

---

## 📖 Book Management

### Browse Books
Users can explore books by category:

- Trending Books
- Romance
- Fantasy
- Classics
- Self-Growth

### Book Details
Each book contains:

- Title
- Author
- Cover Image
- Synopsis
- Full Content

---

## 💰 Credit-Based Unlocking System

Users can unlock:

| Content Type | Credits Required |
|-------------|------------------|
| Synopsis | 5 Credits |
| Full Book | 20 Credits |

### Unlock Features
- Credit deduction
- Unlock history storage
- Prevent duplicate unlocks
- Real-time credit updates

---

## 🎮 Interactive Quiz System

A gamified quiz module where users compete against the system.

### Quiz Features

- Multiple Genres
- Easy / Medium / Hard Difficulty
- Countdown Timer
- Score Tracking
- Round-Based Gameplay
- Win/Loss Results
- Continue or Quit Options
- Credit Rewards

### Available Quiz Categories

- Fantasy
- Romance
- Classics
- Self-Growth

---

## 💬 Quotes Section

Discover literary quotes from various books.

### Features

- Random quote generation
- Book cover preview
- Author information
- Direct access to associated books

---

## 📚 Personal Reading List

Users can:

- Save books
- Track reading progress
- Access previously saved books

---

## 🔐 Protected Routes

The following features require authentication:

- Unlock Synopsis
- Unlock Full Books
- Reading List
- Credit Management

Unauthorized users are redirected to login.

---

## 🎨 UI Features

### Modern Design

- Glassmorphism effects
- Responsive layout
- Hover animations
- Modal-based interactions
- Gradient backgrounds

### Components

- Navbar
- Hero Section
- BookShelf
- Book Cards
- Book Modal
- Login Modal
- Register Page
- Popup Notifications
- Footer

---

# 📂 Project Structure

```bash
KitaabGhar/
│
├── client/
│   ├── public/
│   │   └── covers/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── data/
│   │   └── assets/
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── config/
│
└── README.md
```

---

# 🗃️ Database Design

## User Schema

```javascript
{
  name,
  email,
  password,
  role,
  credits,
  unlockedBooks,
  readlist
}
```

## Book Schema

```javascript
{
  title,
  author,
  category,
  synopsis,
  content,
  cover,
  isTrending
}
```

---

# 🔄 Application Workflow

### Registration

User → Register → Validation → MongoDB → Account Created

### Login

User → Login → JWT Token Generated → Stored in localStorage

### Unlock Book

User → Select Book → Check Credits → Deduct Credits → Unlock Content

### Quiz

User → Start Quiz → Answer Questions → Earn Credits → Unlock Books

---

# 🔐 Authentication Flow

1. User logs in.
2. JWT token generated.
3. Token stored in localStorage.
4. Protected APIs verify token.
5. Authorized access granted.

---

# 📈 Future Enhancements

### Planned Features

- Admin Dashboard
- Book Search API Integration
- AI Book Recommendations
- User Profiles
- Leaderboards
- Reading Statistics
- Dark / Light Theme
- Cloud Deployment
- Google Authentication
- Redux Toolkit Integration
- Book Reviews & Ratings

---

# 💡 Key Learning Outcomes

This project helped in understanding:

- MERN Stack Architecture
- REST API Development
- MongoDB Data Modeling
- JWT Authentication
- Password Security
- State Management using Context API
- Component-Based Design
- Full-Stack Integration
- Error Handling & Validation
- User Experience Design

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/kitaabghar.git
```

### Frontend

```bash
cd client
npm install
npm start
```

### Backend

```bash
cd server
npm install
npm run dev
```

---

# 🌐 Environment Variables

Create a `.env` file in the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

# 👩‍💻 Author

**Sara Nehaluddin Khan**

MCA Student | MERN Stack Developer | Aspiring Cloud Architect

GitHub: https://github.com/sarak12357

LinkedIn: https://linkedin.com/in/81aaa0262

---

# 📜 License

This project is developed for educational and portfolio purposes.
