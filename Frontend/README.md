# Uber MERN Frontend

A React-based frontend application for an Uber-like ride-sharing service built with Vite.

## Project Structure

### Components and Pages

- `Home.jsx` - Landing page with initial user interaction
- `UserLogin.jsx` - User authentication page
- `UserSignup.jsx` - New user registration page
- `CaptainLogin.jsx` - Driver (Captain) authentication page
- `CaptainSignup.jsx` - New driver registration page

### Context

- `UserContext.jsx` - Global state management for user data

## Features

- Separate authentication flows for users and drivers
- Responsive design using Tailwind CSS
- Form validation and state management
- Protected routes and navigation

## Tech Stack

- React 
- React Router DOM
- Tailwind CSS
- Context API for state management
- Vite for build tooling

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Routes

- `/` - Home page
- `/login` - User login
- `/signup` - User registration
- `/captain-login` - Driver login
- `/captain-signup` - Driver registration

## Environment Setup

This project requires:
- Node.js v14+
- npm v6+
- Modern web browser

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
