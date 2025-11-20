# Authentication System API 

This is a complete backend authentication system built with Node.js, Express, MongoDB.


## Technologies Used 
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- Bcrypt.js


## APIS EndPoints 


### 1. Auth Modules

- POST api/auth/signup   ==> Register a New User.

- POST api/auth/login    ==> Login and Generate JWT Token.


### 2. User Modules

**Note** Headers: Requires `authorization` header with value `Bearer <your_token>`

- GET api/user/profile   ==> Get User Profile Info

- POST api/user/revoke-token   ==> Logout User and Revoked token from Database



## How to Run 
1. Clone the repo
2. Run `npm install`
3. Create a `.env` file like(`.env.example`)
4. Run `npm start`