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
