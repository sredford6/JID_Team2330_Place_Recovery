# Server of Neighborhood

## How to install

### Prerequisites
- Need node 16

### Steps
1. `cd` into the *server* folder
2. run `npm install`
3. run `npm run decrypt ____` replacing `____` with the password
5. run `npm start`
6. ????
7. profit

## Endpoints

### Auth
- Login [POST]: /api/auth/login
    - Body
        - email
        - password
- Signup [POST]: /api/auth/signup
    - Body
        - email
        - password
        - firstName
        - lastName
        - phoneNumber
- User [GET]: /api/auth/user
    - Header
        - authorization
- Token Test [GET]: /api/auth/jwt-test
    - Header
        - authorization
- Get Reset [GET]: /api/auth/get-reset
    - Query
        - email
- Reset Password [POST]: /api/auth/resetpassword
    - Body
        - email
        - resetCode
        - newPassword

### Questionnaire
- Create [POST]: /api/question/create
    - Body
        - id
        - questions
- Question Retrieval [GET]: /api/question/:question
    - Just put the name of the question file as part of the URL
- Token Test [GET]: /api/question/answer
    - Header
        - authorization
    - Body
        - questionnaire
        - answers
