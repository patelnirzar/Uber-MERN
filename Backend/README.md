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
