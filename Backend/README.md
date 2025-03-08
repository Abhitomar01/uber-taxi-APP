# /user/register Endpoint Documentation

## Description
The **/user/register** endpoint allows a new user to register. It accepts user details and returns an authentication token along with the created user object.

## HTTP Method
**POST**

## Request Body
- `fullname`: An object containing:
  - `firstname` (string): Required, minimum 3 characters.
  - `lastname` (string): Optional.
- `email` (string): Required, must be a valid email format.
- `password` (string): Required, minimum 6 characters.

## Responses

### Success (201)
Returns the created user and an authentication token.


### Example response
```json
{
  "user": {
    "id": "12345",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

# /user/login Endpoint Documentation

## Description
The **/user/login** endpoint allows an existing user to log in. It validates the user credentials and returns an authentication token along with the user object.

## HTTP Method
**POST**

## Request Body
- `email` (string): Required, must be a valid email format.
- `password` (string): Required, minimum 6 characters.

## Responses

### Success (200)
Returns the user information and an authentication token.

### Example response
```json
{
  "user": {
    "id": "12345",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

# /user/profile Endpoint Documentation

## Description
The **/user/profile** endpoint retrieves the profile of the authenticated user.

## HTTP Method
**GET**

## Headers
- `Authorization` (string): Required, Bearer token.

## Responses

### Success (200)
Returns the user profile information.

### Example response
```json
{
  "id": "12345",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

# /user/logout Endpoint Documentation

## Description
The **/user/logout** endpoint logs out the authenticated user by invalidating the authentication token.

## HTTP Method
**GET**

## Headers
- `Authorization` (string): Required, Bearer token.

## Responses

### Success (200)
Returns a message indicating successful logout.

### Example response
```json
{
  "message": "logged out successfully"
}
```

# /captain/register Endpoint Documentation

## Description
The **/captain/register** endpoint allows a new captain to register. It accepts captain details and returns the created captain object.

## HTTP Method
**POST**

## Request Body
```json
{
  "fullname": {
    "firstname": "Jane", // Required, minimum 3 characters
    "lastname": "Doe" // Required, minimum 3 characters
  },
  "email": "jane.doe@example.com", // Required, must be a valid email format
  "password": "password123", // Required, minimum 6 characters
  "vehical": {
    "color": "red", // Required, minimum 3 characters
    "plate": "XYZ123", // Required, minimum 3 characters
    "capacity": 4, // Required, minimum 1
    "vehicaltype": "car" // Required, must be one of ['car', 'bike', 'auto']
  }
}
```

## Responses

### Success (201)
Returns the created captain object.

### Example response
```json
{
  "captain": {
    "id": "67890",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehical": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicaltype": "car"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

# /captain/login Endpoint Documentation

## Description
The **/captain/login** endpoint allows an existing captain to log in. It validates the captain credentials and returns an authentication token along with the captain object.

## HTTP Method
**POST**

## Request Body
```json
{
  "email": "jane.doe@example.com", // Required, must be a valid email format
  "password": "password123" // Required, minimum 6 characters
}
```

## Responses

### Success (200)
Returns the captain information and an authentication token.

### Example response
```json
{
  "captain": {
    "id": "67890",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehical": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicaltype": "car"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

# /captain/profile Endpoint Documentation

## Description
The **/captain/profile** endpoint retrieves the profile of the authenticated captain.

## HTTP Method
**GET**

## Headers
- `Authorization` (string): Required, Bearer token.

## Responses

### Success (200)
Returns the captain profile information.

### Example response
```json
{
  "id": "67890",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "vehical": {
    "color": "red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicaltype": "car"
  }
}
```

# /captain/logout Endpoint Documentation

## Description
The **/captain/logout** endpoint logs out the authenticated captain by invalidating the authentication token.

## HTTP Method
**GET**

## Headers
- `Authorization` (string): Required, Bearer token.

## Responses

### Success (200)
Returns a message indicating successful logout.

### Example response
```json
{
  "message": "logout successfully"
}
```
