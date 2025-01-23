# Uber MERN Frontend

A React-based frontend application for an Uber-like ride-sharing service built with MERN stack.

## Features

- User authentication (signup/login/logout)
- Captain (driver) authentication
- Protected routes for both users and captains
- Responsive design with Tailwind CSS
- Context-based state management
- Axios for API integration

## Tech Stack

- React
- React Router DOM
- Axios
- Tailwind CSS
- Vite
- Context API

## Setup Instructions

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with:
```
VITE_BASE_URL=your_backend_api_url
```

4. Run the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── context/
│   ├── UserContext.jsx
│   └── CaptainContext.jsx
├── pages/
│   ├── User flows
│   │   ├── UserLogin.jsx
│   │   ├── UserLogout.jsx
│   │   └── UserProtectedWrapper.jsx
│   ├── Captain flows
│   │   ├── CaptainLogin.jsx
│   │   ├── CaptainLogout.jsx
│   │   └── CaptainProtectedWrapper.jsx
│   └── Common
│       ├── Home.jsx
│       └── Start.jsx
```

## Authentication Flow

- Users and Captains have separate authentication flows
- JWT tokens are stored in localStorage
- Protected routes check for valid tokens
- Automatic redirect to login for unauthorized access

## API Integration

Uses Axios for API calls with endpoints:
- `/users/*` - User related operations
- `/captain/*` - Captain related operations

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
