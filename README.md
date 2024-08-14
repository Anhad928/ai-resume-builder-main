# AI Resume Builder

Welcome to the AI Resume Builder project! This platform leverages the power of AI to help you create professional and ATS-friendly resumes with ease. From generating tailored job descriptions to customizing themes, this tool is designed to enhance your job application process.

## Features

- 🤖 **AI-Assisted Resume Creation**: Automatically generate professional summaries and job descriptions that stand out.
- 🎨 **Customizable Themes**: Choose from ATS-compliant color schemes to ensure your resume gets noticed by applicant tracking systems.
- 📄 **Download & Share**: Easily download your resume as a PDF or share a unique link on social media platforms.
- 🔒 **Secure Authentication**: Managed through Clerk, providing secure and seamless login experiences.
- 📱 **Responsive Design**: Fully optimized for both desktop and mobile devices to ensure a smooth user experience.

## Tech Stack

- **Frontend**: React, VITE, Shadcn for UI components
- **Backend**: Strapi (Node.js)
- **Authentication**: Clerk
- **Hosting**: Hostinger

## Backend Repository

This project also includes a backend component that handles API requests and server-side logic. You can find the backend code here:

[![Backend Repository](https://img.shields.io/badge/GitHub-Backend%20Repo-blue?logo=github)](https://github.com/Anhad928/ai-resume-builder-strapi)

Visit the backend repository to explore the API functionalities and set up the server locally.

## Installation and Setup

Follow these steps to set up and run the project locally:

### Prerequisites

Ensure you have the following installed:
- Node.js (version 14.x or higher)
- npm or yarn

### Frontend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Anhad928/ai-resume-builder-main.git

2. **Navigate into the project directory:**
   ```bash
   cd ai-resume-builder-main

3. **Install dependencies:**
   ```bash
   npm install
   or yarn install

4. **Create a .env file and add the necessary environment variables:**
   ```bash
   VITE_BACKEND_URL=http://localhost:1337
   VITE_CLERK_FRONTEND_API=your_clerk_frontend_api

5. **Start the development server:**
   ```bash
   npm run dev
   or yarn dev

6. **Access the application:**
   ```bash
   http://localhost:5170

