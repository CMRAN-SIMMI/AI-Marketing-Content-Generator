# 🚀 AI Marketing Content Generator for Food Processing Businesses

## 🌐 Live Demo

**Frontend:** https://ai-marketing-content-generator-8jqq-eight.vercel.app

**Backend:** https://ai-marketing-content-generator.onrender.com

## 📌 Project Overview

AI Marketing Content Generator is a full-stack web application designed to help **food processing businesses** create professional and engaging marketing content using Artificial Intelligence.

The platform enables users to provide product information through structured forms, voice input, or an AI-powered chatbot and automatically generates marketing materials tailored for digital platforms.

The application includes:

- 🔐 Secure User Authentication
- 🔑 Google OAuth Login
- 🤖 AI-powered Content Generation using the Groq API
- 💬 AI Marketing Assistant Chatbot
- 📂 Content History Management
- 🌙 Dark / Light Mode
- 📱 Responsive User Interface

The primary goal of this project is to help small and medium-scale food processing businesses improve their digital presence while reducing the effort required to create marketing content.

---

# 🎯 Problem Statement

Many food processing businesses struggle to create attractive and effective marketing content because of:

- Limited marketing expertise
- Time constraints
- Lack of digital marketing tools

This project leverages Artificial Intelligence to automatically generate professional marketing content from simple product information.

---

# ✨ Key Features

## 🔐 Authentication

- User Registration
- User Login
- Google OAuth Login
- JWT Authentication
- Protected Routes

---

## 📝 Product Information Form

Users can enter:

- Product Name
- Product Category
- Marketing Prompt

---

## 🤖 AI Marketing Content Generation

Generate:

- Product Descriptions
- Promotional Content
- Social Media Captions
- Marketing Taglines
- Marketing Hashtags

---

## 💬 AI Marketing Assistant

- AI-powered chatbot
- Previous conversation history
- New Chat functionality
- Delete conversations
- Voice Input (Speech-to-Text)

---

## 📚 Content History

Users can:

- Save generated content
- View previous content
- Edit content
- Regenerate content using AI
- Delete content
- Copy generated content
- Search content

---

## 📊 Dashboard

- User-specific dashboard
- Protected using JWT Authentication

---

## 🎨 User Experience

- Responsive Design
- Dark / Light Mode
- Toast Notifications
- Loading Indicators
- Delete Confirmation Modals
- Error Boundary

---

# ⚙️ System Workflow

1. User logs into the application.
2. Product information is entered using the Generate page, chatbot, or voice input.
3. The backend sends the prompt to the Groq API.
4. AI generates marketing content.
5. Generated content is displayed to the user.
6. Content is securely stored in MongoDB Atlas.
7. Users can later edit, regenerate, copy, or delete the generated content.

---

# 🎯 Expected Outcomes

- Faster marketing content creation
- AI-assisted product promotion
- Improved digital marketing support
- User-friendly AI assistant
- Secure cloud-based storage
- Better online visibility for food businesses

---

# 🛠 Technologies Used

## Frontend

- React.js
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast
- Lucide React Icons

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Passport.js
- Google OAuth

---

## Artificial Intelligence

- Groq API (LLM)

---

## Other Libraries

- CORS
- Dotenv

---

# 🗄 Database

The application uses **MongoDB Atlas** as its cloud-hosted NoSQL database.

MongoDB Atlas was selected because marketing content is document-oriented and flexible, making it ideal for storing prompts, generated content, users, and chat conversations.

---

# 📑 Database Collections

## Content Collection

| Field | Type | Description |
|------|------|-------------|
| _id | ObjectId | Unique identifier |
| user | ObjectId | Authenticated user |
| productName | String | Product name |
| category | String | Product category |
| prompt | String | User prompt |
| generatedContent | String | AI-generated content |
| hashtags | Array<String> | Generated hashtags |
| createdAt | Date | Created timestamp |
| updatedAt | Date | Updated timestamp |

---

## Chat Collection

| Field | Type | Description |
|------|------|-------------|
| _id | ObjectId | Chat ID |
| user | ObjectId | Authenticated user |
| title | String | Chat title |
| messages | Array | User & AI conversation |
| createdAt | Date | Created timestamp |
| updatedAt | Date | Updated timestamp |

---

## User Collection

Stores:

- User Information
- Authentication Details
- Google OAuth Information

---

## Schema Diagram

![Schema Diagram](./assets/W5_SchemaDiagram_TBI-26100863.png)

---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| GET | `/api/auth/google` |
| GET | `/api/auth/google/callback` |

---

## Marketing Content

| Method | Endpoint |
|---------|----------|
| GET | `/api/content` |
| GET | `/api/content/:id` |
| POST | `/api/content` |
| PUT | `/api/content/:id` |
| DELETE | `/api/content/:id` |

---

## AI

| Method | Endpoint |
|---------|----------|
| POST | `/api/ai/generate` |

---

## AI Assistant

| Method | Endpoint |
|---------|----------|
| GET | `/api/chat` |
| POST | `/api/chat/message` |
| DELETE | `/api/chat/:id` |

---

# 🔐 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

GROQ_API_KEY=your_groq_api_key
```

---

# 💻 Installation

## 1. Clone Repository

```bash
git clone https://github.com/CMRAN-SIMMI/AI-Marketing-Content-Generator.git
```

---

## 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Build Project

```bash
cd frontend
npm run build
```

---

# 🌐 Live Deployment

## Live Frontend
https://ai-marketing-content-generator-8jqq-eight.vercel.app

## Live Backend
https://ai-marketing-content-generator.onrender.com

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- Google OAuth
- Passport.js

### AI
- Groq API (LLM)

## Features
- User Authentication
- Google OAuth Login
- AI Marketing Content Generator
- AI Chat Assistant
- Content History
- Protected Routes
- Dark Mode
- Responsive Design

## Known Limitations (Free Tier)

- Render free tier spins down after inactivity.
- First request after inactivity may take 30–60 seconds.
- AI response time depends on Gemini API response speed.

# 📁 Project Structure

```text
AI-Marketing-Content-Generator
│
├── backend
│   ├── config
│   ├── controllers
│   ├── data
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── package.json
│   ├── .env.example
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   │   └── ui
│   │   ├── context
│   │   ├── pages
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── .gitignore
├── PROMPTS.md
└── README.md
```

---

# 🚀 Future Enhancements

- 🌐 Multi-language Content Generation
- 🖼 AI Image Generation
- 📄 Export Generated Content as PDF
- 📊 Content Analytics Dashboard
- 📅 Marketing Campaign Planner
- 📈 AI Content Performance Suggestions

---

# 👨‍💻 Author

**Simran**

AI-Assisted Full Stack Web Development Internship Project

---

⭐ If you found this project helpful, consider giving it a **Star** on GitHub.