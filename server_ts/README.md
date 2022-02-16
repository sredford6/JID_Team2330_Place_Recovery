# Server of Neighborhood

## How to install

### Prerequisites
- Need node 16

### Steps
1. `cd` into the *server_ts* folder
2. run `npm install`
3. run `npm run decrypt ____` replacing ____ with the password
5. run `npm start`
6. ????
7. profit

## Endpoints

- Login [POST]: http://localhost:2400/api/auth/login
    - Body
        - email
        - password
- Signup [POST]: http://localhost:2400/api/auth/signup
    - Body
        - email
        - password
        - firstName
        - lastName
        - phoneNumber
- Token Test [GET]: http://localhost:2400/api/auth/jwt-test
    - Header
        - authorization
- Get Reset [GET]: http://localhost:2400/api/auth/get-reset
    - Query
        - email
- Reset Password [POST]: http://localhost:2400/api/auth/resetpassword
    - Body
        - email
        - resetCode
        - newPassword
