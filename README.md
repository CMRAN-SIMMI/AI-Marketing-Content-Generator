# AI Marketing Content Generator for Food Processing Businesses

## Project Overview 
AI Marketing Content Generator is a full-stack web application designed to help food processing businesses create professional and engaging marketing content using Artificial Intelligence. The platform enables users to provide product information through structured forms, voice input, or an AI-powered chatbot and generates marketing materials tailored for digital platforms.
The goal of the project is to assist small and medium-scale food businesses in improving their online presence, reducing content creation effort, and enhancing product promotion through AI-driven solutions.

## Problem Statement
Many food processing businesses struggle to create effective marketing content for their products due to limited marketing expertise, time constraints, and lack of digital tools.
This project aims to simplify content creation by leveraging Artificial Intelligence to automatically generate high-quality marketing content from basic product information.

## Key Features
1. Product Information Form
   - Enter product details such as:
   - Product Name
   - Ingredients
   - Weight
   - Product Category
   - Key Features
2. AI Marketing Assistant Chatbot
    - Conversational interface for collecting product information.
    - Assists users in generating marketing content through natural language interaction.
3. Voice-to-Text Product Input
    - Users can describe products using voice input.
    - Speech is automatically converted into text for processing.
4. AI Content Generation
   Generate:
   - Product Descriptions
   - Promotional Content
   - Social Media Captions
5. Hashtag & Tagline Generator
   - Creates relevant hashtags for social media.
   - Generates marketing taglines for branding and promotions.
6. Content History Management
   -  Store previously generated content.
   -  View and reuse marketing content when required.

## System Workflow
  1. User enters product details through form, chatbot, or voice input.
  2. Product information is processed by the backend.
  3. OpenAI API generates marketing content.
  4. Generated content is displayed to the user.
  5. Content is temporarily stored in the server's in-memory storage for future reference.

## Expected Outcomes
  - Faster content creation process
  - Improved digital marketing support for food businesses
  - User-friendly AI-powered marketing assistant
  - Enhanced product visibility through optimized marketing content
## Technologies Used

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* CORS
* Dotenv

---

## How to Run the Project Locally

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

### 2. Navigate to the Backend Folder

```bash
cd backend
```

### 3. Install Backend Dependencies

```bash
npm install
```

### 4. Create Environment File

Create a `.env` file inside the `backend` folder with:

```env
PORT=5000
```

### 5. Start the Backend Server

```bash
npm run dev
```

The backend will run at:

```
http://localhost:5000
```

---

### 6. Navigate to the Frontend Folder

Open a new terminal:

```bash
cd frontend
```

### 7. Install Frontend Dependencies

```bash
npm install
```

### 8. Start the Frontend

```bash
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```
