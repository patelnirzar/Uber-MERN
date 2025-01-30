# API Documentation

## User Registration

### POST /users/register

#### Description
Register a new user account with firstname, lastname, email, and password.

#### Request
- Method: `POST`
- URL: `/users/register`
- Content-Type: `application/json`

#### Request Body
```json
{
  "fullname": {
    "firstname": "string", // required, min length: 3
    "lastname": "string"   // optional
  },
  "email": "string",       // required, valid email format
  "password": "string"     // required, min length: 6
}
```

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 201 | User successfully created |
| 400 | Validation error |
| 500 | Internal server error |

#### Success Response (201)
```json
{
  "token": "jwt_token_string",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

#### Error Response (400)
```json
{
  "errors": [
    {
      "msg": "Email is invalid",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Validation Rules
- Email must be a valid email format
- Password must be at least 6 characters long
- Firstname must be at least 3 characters long
- Lastname is optional

## User Login

### POST /users/login

#### Description
Authenticate a user and receive a JWT token.

#### Request
- Method: `POST`
- URL: `/users/login`
- Content-Type: `application/json`

#### Request Body
```json
{
  "email": "string",    // required, valid email format
  "password": "string"  // required, min length: 6
}
```

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 200 | Login successful |
| 400 | Validation error |
| 401 | Invalid credentials |
| 404 | User not found |
| 500 | Internal server error |

#### Success Response (200)
```json
{
  "token": "jwt_token_string",
  "user": {
    "email": "john@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  }
}
```

#### Error Response (400/401/404)
```json
{
  "message": "Invalid credentials"
}
```
or
```json
{
  "errors": [
    {
      "msg": "Email is invalid",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Validation Rules
- Email must be a valid email format
- Password must be at least 6 characters long

## User Profile

### GET /users/profile

#### Description
Get the authenticated user's profile information. Requires authentication.

#### Request
- Method: `GET`
- URL: `/users/profile`
- Headers: 
  - `Authorization: Bearer <jwt_token>`

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 401 | Unauthorized |
| 500 | Internal server error |

#### Success Response (200)
```json
{
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

#### Error Response (401)
```json
{
  "message": "Unauthorized"
}
```

## User Logout

### GET /users/logout

#### Description
Logout the user and blacklist their JWT token.

#### Request
- Method: `GET`
- URL: `/users/logout`
- Headers: 
  - `Authorization: Bearer <jwt_token>`

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 200 | Logout successful |
| 401 | Unauthorized |
| 500 | Internal server error |

#### Success Response (200)
```json
{
  "message": "Logged out successfully"
}
```

#### Error Response (401)
```json
{
  "message": "Unauthorized"
}
```

## JWT Token Blacklisting

The application implements JWT token blacklisting for enhanced security:

- When a user logs out, their JWT token is added to a blacklist
- Blacklisted tokens are stored in MongoDB with an automatic expiration of 24 hours
- The `authUser` middleware checks if a token is blacklisted before allowing access
- If a blacklisted token is used, the request is rejected with a 401 status
- Expired tokens are automatically removed from the blacklist after 24 hours

### Authentication Middleware

All protected routes use the `authUser` middleware which:
1. Extracts the JWT token from the Authorization header or cookies
2. Checks if the token is blacklisted
3. Verifies the token's signature and expiration
4. Attaches the user object to the request if authentication is successful

## Captain Registration

### POST /captain/register

#### Description
Register a new captain account with personal and vehicle details.

#### Request
- Method: `POST`
- URL: `/captain/register`
- Content-Type: `application/json`

#### Request Body
```json
{
  "fullname": {
    "firstname": "string", // required, min length: 3
    "lastname": "string"   // optional
  },
  "email": "string",       // required, valid email format
  "password": "string",    // required, min length: 6
  "vehicle": {
    "color": "string",     // required, min length: 3
    "plate": "string",     // required, min length: 3
    "capacity": "number",  // required, min: 1
    "vehicleType": "string" // required, enum: ['motorcycle', 'car', 'auto']
  }
}
```

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 201 | Captain successfully created |
| 400 | Validation error or Captain already exists |
| 500 | Internal server error |

#### Success Response (201)
```json
{
  "token": "jwt_token_string",
  "captain": {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "color": "black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Captain Login

### POST /captain/login

#### Description
Authenticate a captain and receive a JWT token.

#### Request
- Method: `POST`
- URL: `/captain/login`
- Content-Type: `application/json`

#### Request Body
```json
{
  "email": "string",    // required, valid email format
  "password": "string"  // required, min length: 6
}
```

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 201 | Login successful |
| 400 | Validation error |
| 401 | Invalid credentials |
| 404 | Captain not found |
| 500 | Internal server error |

#### Success Response (201)
```json
{
  "token": "jwt_token_string",
  "captain": {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "color": "black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Captain Profile

### GET /captain/profile

#### Description
Get the authenticated captain's profile information. Requires authentication.

#### Request
- Method: `GET`
- URL: `/captain/profile`
- Headers: 
  - `Authorization: Bearer <jwt_token>`

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 401 | Unauthorized |
| 500 | Internal server error |

#### Success Response (200)
```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "location": {
      "lat": null,
      "long": null
    },
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

## Captain Logout

### GET /captain/logout

#### Description
Logout the captain and blacklist their JWT token.

#### Request
- Method: `GET`
- URL: `/captain/logout`
- Headers: 
  - `Authorization: Bearer <jwt_token>`

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 200 | Logout successful |
| 401 | Unauthorized |
| 500 | Internal server error |

#### Success Response (200)
```json
{
  "message": "Logged out"
}
```

## Maps API Endpoints

### GET /maps/get-coordinates

#### Description
Convert an address string into geographic coordinates (latitude/longitude).

#### Request
- Method: `GET`
- URL: `/maps/get-coordinates`
- Headers: 
  - `Authorization: Bearer <jwt_token>`
- Query Parameters:
  - `address`: string (required, min length: 3)

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 400 | Invalid address |
| 401 | Unauthorized |
| 500 | Internal server error |

#### Success Response (200)
```json
{
  "coordinates": {
    "latitude": "number",
    "longitude": "number"
  }
}
```

#### Error Response (400)
```json
{
  "message": "Invalid address"
}
```

#### Error Response (401)
```json
{
  "message": "Unauthorized"
}
```

### GET /maps/get-distance-time

#### Description
Calculate the distance and estimated travel time between two locations. This endpoint uses the Google Maps Distance Matrix API to provide accurate route information.

#### Request
- Method: `GET`
- URL: `/maps/get-distance-time`
- Headers: 
  - `Authorization: Bearer <jwt_token>`
- Query Parameters:
  - `origin`: string (required, min length: 3)
  - `destination`: string (required, min length: 3)

#### Example Request
```json
{
  "origin": "New York, NY",
  "destination": "Los Angeles, CA"
}
```

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 400 | Invalid parameters |
| 401 | Unauthorized |
| 500 | Internal server error |

#### Success Response (200)
```json
{
  "distance": {
    "text": "2,789 miles",
    "value": 4488000
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 151200
  }
}
```

#### Error Response (400)
```json
{
  "message": "Invalid parameters"
}
```

#### Error Response (401)
```json
{
  "message": "Unauthorized"
}
```

### GET /maps/get-suggestions

#### Description
Get location suggestions for address autocomplete functionality. This endpoint uses the Google Maps Places API to provide real-time location suggestions based on user input.

#### Request
- Method: `GET`
- URL: `/maps/get-suggestions`
- Headers: 
  - `Authorization: Bearer <jwt_token>`
- Query Parameters:
  - `input`: string (required, min length: 3)

#### Example Request
```json
{
  "input": "1600 Amphitheatre Parkway"
}
```

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 400 | Invalid input |
| 401 | Unauthorized |
| 500 | Internal server error |

#### Success Response (200)
```json
{
  "suggestions": [
    {
      "description": "1600 Amphitheatre Parkway, Mountain View, CA, USA",
      "place_id": "ChIJ2eUgeAK6j4ARbn5u_wAGqWA"
    },
    {
      "description": "1600 Amphitheatre Parkway, Mountain View, CA, USA",
      "place_id": "ChIJ2eUgeAK6j4ARbn5u_wAGqWA"
    }
  ]
}
```

#### Error Response (400)
```json
{
  "message": "Invalid input"
}
```

#### Error Response (401)
```json
{
  "message": "Unauthorized"
}
```

## Ride API Endpoints

### POST /rides/create

#### Description
Create a new ride request with pickup, destination, and vehicle details.

#### Request
- Method: `POST`
- URL: `/rides/create`
- Headers: 
  - `Authorization: Bearer <jwt_token>`
- Body:
```json
{
  "pickup": {
    "address": "string", // required, min length: 3
    "latitude": "number", // required
    "longitude": "number" // required
  },
  "destination": {
    "address": "string", // required, min length: 3
    "latitude": "number", // required
    "longitude": "number" // required
  },
  "vehicleType": "string" // required, enum: ['motorcycle', 'car', 'auto']
}
```

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 201 | Ride successfully created |
| 400 | Validation error |
| 401 | Unauthorized |
| 500 | Internal server error |

#### Success Response (201)
```json
{
  "ride": {
    "_id": "ride_id",
    "pickup": {
      "address": "123 Main St",
      "latitude": 40.712776,
      "longitude": -74.005974
    },
    "destination": {
      "address": "456 Elm St",
      "latitude": 40.712776,
      "longitude": -74.005974
    },
    "vehicleType": "car",
    "status": "pending",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

#### Error Response (400)
```json
{
  "message": "Validation error"
}
```

#### Error Response (401)
```json
{
  "message": "Unauthorized"
}
```

### GET /rides/:rideId

#### Description
Get the details of a specific ride by its ID. Requires authentication.

#### Request
- Method: `GET`
- URL: `/rides/:rideId`
- Headers: 
  - `Authorization: Bearer <jwt_token>`

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 401 | Unauthorized |
| 404 | Ride not found |
| 500 | Internal server error |

#### Success Response (200)
```json
{
  "ride": {
    "_id": "ride_id",
    "pickup": {
      "address": "123 Main St",
      "latitude": 40.712776,
      "longitude": -74.005974
    },
    "destination": {
      "address": "456 Elm St",
      "latitude": 40.712776,
      "longitude": -74.005974
    },
    "vehicleType": "car",
    "status": "pending",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

#### Error Response (401)
```json
{
  "message": "Unauthorized"
}
```

#### Error Response (404)
```json
{
  "message": "Ride not found"
}
```

### PUT /rides/:rideId

#### Description
Update the details of a specific ride by its ID. Requires authentication.

#### Request
- Method: `PUT`
- URL: `/rides/:rideId`
- Headers: 
  - `Authorization: Bearer <jwt_token>`
- Body:
```json
{
  "status": "string" // required, enum: ['pending', 'accepted', 'completed', 'cancelled']
}
```

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 200 | Ride successfully updated |
| 400 | Validation error |
| 401 | Unauthorized |
| 404 | Ride not found |
| 500 | Internal server error |

#### Success Response (200)
```json
{
  "ride": {
    "_id": "ride_id",
    "pickup": {
      "address": "123 Main St",
      "latitude": 40.712776,
      "longitude": -74.005974
    },
    "destination": {
      "address": "456 Elm St",
      "latitude": 40.712776,
      "longitude": -74.005974
    },
    "vehicleType": "car",
    "status": "accepted",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

#### Error Response (400)
```json
{
  "message": "Validation error"
}
```

#### Error Response (401)
```json
{
  "message": "Unauthorized"
}
```

#### Error Response (404)
```json
{
  "message": "Ride not found"
}
```

### DELETE /rides/:rideId

#### Description
Delete a specific ride by its ID. Requires authentication.

#### Request
- Method: `DELETE`
- URL: `/rides/:rideId`
- Headers: 
  - `Authorization: Bearer <jwt_token>`

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 200 | Ride successfully deleted |
| 401 | Unauthorized |
| 404 | Ride not found |
| 500 | Internal server error |

#### Success Response (200)
```json
{
  "message": "Ride successfully deleted"
}
```

#### Error Response (401)
```json
{
  "message": "Unauthorized"
}
```

#### Error Response (404)
```json
{
  "message": "Ride not found"
}
```

### GET /rides/get-ride-fare

#### Description
Calculate estimated fare for different vehicle types based on pickup and destination locations. Uses distance and duration from Google Maps API for accurate fare calculation.

#### Request
- Method: `GET`
- URL: `/rides/get-ride-fare`
- Headers: 
  - `Authorization: Bearer <jwt_token>`
- Query Parameters:
  - `pickup`: string (required, min length: 3)
  - `destination`: string (required, min length: 3)

#### Example Request
```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St"
}
```

#### Response Codes
| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 400 | Invalid parameters |
| 401 | Unauthorized |
| 500 | Internal server error |

#### Success Response (200)
```json
{
  "fare": {
    "motorcycle": 5.00,
    "car": 10.00,
    "auto": 7.50
  }
}
```

#### Error Response (400)
```json
{
  "message": "Invalid parameters"
}
```

#### Error Response (401)
```json
{
  "message": "Unauthorized"
}
```
