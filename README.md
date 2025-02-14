
# GoFast - Secure File Storage Platform

GoFast is a modern web application for secure file storage and sharing, built with a focus on security and user experience.

## Tech Stack

### Frontend

- React 18 with TypeScript
- Vite for build tooling and development
- TanStack Query for server state management
- Tailwind CSS for styling
- Shadcn/UI for component library

### Security & Authentication

- JWT-based authentication
- reCAPTCHA integration
- Protected routes

## Features

### Authentication & Security

- User registration and login
- reCAPTCHA verification for enhanced security
- JWT token-based session management

### File Management

- File upload and storage
- Folder creation and organization
- Recent files tracking
- File preview support
- File sharing capabilities

### User Interface

- Dark/Light theme support
- Responsive design
- Drag and drop file upload
- File progress tracking
- Toast notifications for user feedback

### Storage Features

- File size tracking
- File type recognition
- Hierarchical folder structure
- Recent files quick access
- Trash bin for deleted files

## Getting Started

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

3. Set up environment variables in .env:
```sh
VITE_GOFAST_API_BASE_URL=http://localhost:80/api/v1
```
4. Start the development server:
```
npm run dev
```

## Project Structure
components - Reusable UI components
hooks - Custom React hooks for business logic
pages - Main application pages
lib - Utility functions and services
types - TypeScript type definitions
layouts - Page layout components

## Environment Setup
The project requires:

1. Node.js 18+
2. npm 10+
3. Modern web browser
4. Backend API running (separate repository)
