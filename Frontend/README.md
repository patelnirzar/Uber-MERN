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

## Code Structure

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

# Uber MERN Frontend

A modern React-based ride-sharing application frontend with separate user and driver interfaces.

## Core Components

### User Flow Components

#### Home (`/src/pages/Home.jsx`)
Main booking interface with features:
- Location search with suggestions
- Vehicle type selection
- Fare estimation
- Ride confirmation
- Driver matching
- Real-time tracking

#### Location Search Panel (`/src/components/LocationSearchPanel.jsx`)
Search interface component:
- Address autocomplete
- Recent locations
- Saved addresses
- Interactive map integration

#### Vehicle Selection (`/src/components/VehiclePanel.jsx`)
Available vehicle types:
```javascript
const VEHICLE_TYPES = {
  car: { name: "UberGo", capacity: 4, description: "Affordable, compact rides" },
  moto: { name: "Moto", capacity: 1, description: "Quick bike rides" },
  auto: { name: "UberAuto", capacity: 3, description: "Auto-rickshaw rides" }
}
```

#### Ride States
Sequential panels showing ride progress:
1. **ConfirmRide**: Ride summary and confirmation
2. **LookingForDriver**: Driver matching state
3. **WaitingForDriver**: Driver assigned state with:
   - Driver details
   - Vehicle info
   - OTP verification
   - Real-time status

### Captain (Driver) Flow Components

#### CaptainLogin (`/src/pages/CaptainLogin.jsx`)
Driver authentication with:
- Email/password validation
- Token management
- Session handling
- Error notifications

#### CaptainProtectWrapper (`/src/pages/CaptainProtectWrapper.jsx`)
Route protection with:
- Token validation
- Auto-redirect
- Profile data fetching
- Loading states

## State Management

### Context Providers
```javascript
// User Context
{
  user: object,
  setUser: function,
  isAuthenticated: boolean
}

// Captain Context
{
  captain: object,
  setCaptain: function,
  isAuthenticated: boolean
}
```

### Animation System
GSAP animations for smooth transitions:
```javascript
// Panel Animations
{
  height: ["0%", "70%"],
  opacity: [0, 1],
  duration: 0.3,
  ease: "power2.out"
}
```

## API Integration

### Endpoints Structure
```javascript
const API_ENDPOINTS = {
  user: {
    login: '/user/login',
    register: '/user/register',
    profile: '/user/profile'
  },
  captain: {
    login: '/captain/login',
    register: '/captain/register',
    profile: '/captain/profile'
  },
  ride: {
    create: '/rides/create',
    status: '/rides/status',
    update: '/rides/update'
  }
}
```

## UI Components

### Common UI Elements
- Custom buttons
- Input fields
- Loading spinners
- Error messages
- Toast notifications

### Styling
Tailwind utility classes for:
- Responsive layouts
- Color schemes
- Typography
- Spacing
- Animations

## Environment Configuration

Required variables:
```env
VITE_BASE_URL=backend_api_url
VITE_MAPS_API_KEY=google_maps_api_key
VITE_SOCKET_URL=websocket_server_url
```

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```



```
src/
├── components/
│   ├── booking/
│   │   ├── LocationSearch.jsx
│   │   ├── VehicleSelect.jsx
│   │   └── RideConfirm.jsx
│   ├── captain/
│   │   ├── Dashboard.jsx
│   │   └── RideRequests.jsx
│   └── common/
│       ├── Button.jsx
│       └── Input.jsx
├── context/
│   ├── UserContext.jsx
│   └── CaptainContext.jsx
└── pages/
    ├── user/
    └── captain/
```

## Security Features

- JWT token validation
- Protected routes
- Session management
- API request interceptors
- Error handling middleware


# Uber Clone Frontend

A full-featured ride-sharing application frontend built with React and modern web technologies.

## Project Overview

This application provides two main interfaces:
- User interface for booking rides
- Captain (driver) interface for accepting rides

## Core Features

### User Features
- Location search with suggestions
- Multiple vehicle type selection
- Real-time fare estimation
- Ride booking and tracking
- Payment method selection

### Captain Features
- Real-time ride requests
- Profile management
- Trip history
- Earnings dashboard
- Navigation integration

## Technical Architecture

### Component Structure
```
src/
├── components/
│   ├── booking/
│   │   ├── LocationSearchPanel
│   │   ├── VehiclePanel
│   │   ├── ConfirmRide
│   │   ├── LookingForDriver
│   │   └── WaitingForDriver
│   └── captain/
│       ├── Dashboard
│       └── TripHistory
├── pages/
│   ├── Home
│   ├── CaptainHome
│   ├── CaptainLogin
│   └── CaptainProtectWrapper
└── context/
    └── CaptainContext
```

### State Management
```javascript
// Captain Context Example
{
  captain: {
    id: string,
    name: string,
    vehicle: object,
    isOnline: boolean
  },
  setCaptain: function,
  isAuthenticated: boolean
}
```

### Authentication Flow
1. User/Captain Login
2. JWT Token Generation
3. Protected Route Validation
4. Auto-redirect for Invalid Sessions

## Technology Stack

- **Frontend Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Animation**: GSAP
- **Build Tool**: Vite

## Environment Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```env
VITE_BASE_URL=your_backend_url
VITE_MAPS_API_KEY=your_google_maps_key
```

3. Start development server:
```bash
npm run dev
```

## API Integration

### Endpoints Structure
```javascript
const API_ROUTES = {
  auth: {
    userLogin: '/user/login',
    captainLogin: '/captain/login',
    logout: '/auth/logout'
  },
  rides: {
    create: '/rides/create',
    accept: '/rides/accept',
    complete: '/rides/complete'
  }
}
```

## Component Documentation

### Booking Flow Components

1. **LocationSearchPanel**
   - Handles location input
   - Provides address suggestions
   - Validates coordinates

2. **VehiclePanel**
   - Displays available vehicles
   - Shows estimated fares
   - Real-time availability

3. **ConfirmRide**
   - Trip summary
   - Payment selection
   - Booking confirmation

4. **WaitingForDriver**
   - Driver details
   - Vehicle information
   - OTP verification

### Captain Flow Components

1. **CaptainLogin**
   - Authentication
   - Profile validation
   - Session management

2. **CaptainHome**
   - Ride requests
   - Status toggle
   - Navigation

## Security Implementation

- JWT based authentication
- Protected route guards
- Session management
- API request interceptors

## Development Guidelines

1. Code Style
   - Use functional components
   - Implement proper error handling
   - Follow component composition

2. State Management
   - Use Context for global state
   - Local state for component-specific data
   - Proper prop drilling avoidance

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Preview production build:
```bash
npm run preview
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request