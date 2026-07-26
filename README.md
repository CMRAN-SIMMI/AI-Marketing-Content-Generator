# AI Marketing Content Generator for Food Processing Businesses

## Project Overview

AI Marketing Content Generator is a full-stack web application designed to help food processing businesses create professional and engaging marketing content using Artificial Intelligence. The platform enables users to provide product information through structured forms, voice input, or an AI-powered chatbot and generates marketing materials tailored for digital platforms. The application now includes secure user authentication, Google OAuth login, AI-powered content generation using the Groq API, an AI marketing assistant, and complete content management features.

The goal of the project is to assist small and medium-scale food businesses in improving their online presence, reducing content creation effort, and enhancing product promotion through AI-driven solutions.

---

# Problem Statement

Many food processing businesses struggle to create effective marketing content for their products due to limited marketing expertise, time constraints, and lack of digital tools.

This project aims to simplify content creation by leveraging Artificial Intelligence to automatically generate high-quality marketing content from basic product information.

---

# Key Features

## Authentication

- User Registration
- User Login
- Google OAuth Login
- JWT Authentication
- Protected Routes

## Product Information Form

Users can enter:

- Product Name
- Product Category
- Marketing Prompt

## AI Marketing Content Generation

Generate:

- Product Descriptions
- Promotional Content
- Social Media Captions
- Marketing Taglines
- Hashtags

## AI Marketing Assistant

- AI-powered chatbot
- Previous conversation history
- Delete conversation history
- New chat functionality
- Voice input option

## Content History Management

- Save generated content
- View previous content
- Edit and regenerate marketing content
- Delete content
- Search content

## Dashboard

- User-specific dashboard
- Protected using JWT authentication

## User Experience

- Responsive Design
- Toast Notifications
- Loading Indicators
- Delete Confirmation Modals
- Error Boundary
- Dark / Light Mode
---

# System Workflow

1. User enters product details through form, chatbot, or voice input.
2. Product information is processed by the backend.
3. Marketing content is generated based on the provided product information.
4. Generated content is displayed to the user.
5. The generated content is securely stored in MongoDB Atlas for the authenticated user and can later be viewed, edited, regenerated, or deleted from the History page.

---

# Expected Outcomes

* Faster content creation process
* Improved digital marketing support for food businesses
* User-friendly AI-powered marketing assistant
* Enhanced product visibility through optimized marketing content
* Persistent cloud-based storage of generated marketing content

---

# Technologies Used

## Frontend

- React.js
- Tailwind CSS
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Passport.js
- Google OAuth

## AI

- Groq API

## Other

- CORS
- Dotenv

---

# Database Choice

This project uses **MongoDB Atlas** as its cloud-hosted NoSQL database.

MongoDB Atlas was chosen because marketing content is naturally document-oriented and flexible. It efficiently stores product details, prompts, generated marketing content, hashtags, and timestamps without requiring a rigid relational schema.

---

## Content Collection

The application stores marketing content in a MongoDB collection named **Content**.

| Field            | Type          | Description          |
| ---------------- | ------------- | -------------------- |
| _id              | ObjectId      | Unique identifier    |
| user             | ObjectId      | Authenticated user   |
| productName      | String        | Product name         |
| category         | String        | Product category     |
| prompt           | String        | Marketing prompt     |
| generatedContent | String        | AI generated content |
| hashtags         | Array<String> | Generated hashtags   |
| createdAt        | Date          | Created timestamp    |
| updatedAt        | Date          | Updated timestamp    |


### Schema Diagram

> **Week 5 Schema Diagram**

![Schema Diagram](./assets/W5_SchemaDiagram_TBI-26100863.png)

---

# API Endpoints

## Authentication

| Method | Endpoint |
|--------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/google |
| GET | /api/auth/google/callback |

---

## Marketing Content

| Method | Endpoint |
|--------|----------|
| GET | /api/content |
| GET | /api/content/:id |
| POST | /api/content |
| PUT | /api/content/:id |
| DELETE | /api/content/:id |

---

## AI

| Method | Endpoint |
|--------|----------|
| POST | /api/ai/generate |

---

## AI Assistant

| Method | Endpoint |
|--------|----------|
| GET | /api/chat |
| POST | /api/chat |
| DELETE | /api/chat |

---

# Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

GROQ_API_KEY=your_groq_api_key
```
---

# How to Run the Project Locally

---
## 1. Clone the Repository

```bash
git clone https://github.com/CMRAN-SIMMI/AI-Marketing-Content-Generator.git
```

---

## 2. Navigate to the Backend Folder

```bash
cd backend
```

---

## 3. Install Backend Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

GROQ_API_KEY=your_groq_api_key
---

## 5. Start the Backend Server

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

## 6. Navigate to the Frontend 

Open another terminal.

---

## 7. Install Frontend Dependencies

```bash
npm install
```

---

## 8. Start the Frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

# Build Project

```bash
npm run build
```

---
# Project Structure

```text
AI-Marketing-Content-Generator
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── server.js
│
├── src
│   ├── api
│   ├── assets
│   ├── components
│   ├── pages
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```
---


# Future Enhancements


* Multi-language Marketing Content Generation
* Image Generation Support
* Export Generated Content as PDF

---

# Author

**Simran**

AI-Assisted Full Stack Web Development Internship Project
