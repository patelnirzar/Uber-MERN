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