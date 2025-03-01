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
