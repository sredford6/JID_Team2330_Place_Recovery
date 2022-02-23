# PlaceNrecovery App (GT Team 1358)
<!-- [![license](https://img.shields.io/github/license/dec0dOS/amazing-github-template.svg?style=flat-square)](LICENSE) -->

### Project Introduction
The project is a mobile application for mental health and risk stratification based on neighborhood characteristics for both Apple and Android platforms. Virtually no research exists examining the daily influence of environmental factors on the development of mental health disorders such as schizophrenia. Our solution is a mobile app that collects real-time data (daily survey) on the status of the user’s mental health such as their feelings and emotions in relation to their location during the day. We can compile and organize this data into a database for our client and other clinicians to analyze and can better treat their own patients and gain knowledge of the development of mental health disorders.

  
# Release Notes

## Version 0.2.0 (Sprint 2)
### Features
- In the registration screen, the color of "Confirm password" will change to red if the passwords users enter do not match.
- If the user doesn't input anything on the registration screen and clicked "Register", it will prompt the user to fill out the textboxes.
- Allow users to keep signed in after reloading the app.
- Allow users to log out.
- Display basic users information in profile screen.
- Allow users to reset password via an email verification code.
- The app can load daily questionnaire that the client provides from backend database.
- Users can take daily questionnaire and their responses will be recorded.
- Users can take questionnaire within the avaliable time.
- Questionnaire will be marked as completed after submission.
- Questionnaire supports four types of questions and the screen will automatically parse the type of question and number of choices.

### Fixed Bugs
- Fixed dimension of content container.
- Fixed the navigation problem between home screen and login screen.
- Fixed email box text length unmatch problem.
- 


### Known Issues
- Expo Go issue in iOS: https://stackoverflow.com/questions/45547406/fetch-or-axios-in-react-native-not-working-for-expo-for-ios-apps
- Need to fix `components/Sliders.tsx` if we want to use sliders for type 1 (scales) question.
- Need to update questionnaire avaliable time and completed status daily.

### TODO
- Refine UI design. (checkbox instead of buttons?)
- Do more testing and find edge cases. 
- Should we allow users to skip question? -> prune skipped questions so needless data isn't stored in the database
- Record user's location when they are filling the questionnaire.
- Probably combine three questionnaire tabs into one?
- Next Sprint: users answers thrend.


## Version 0.1.0 (Sprint 1)
### Features
- User can log in with existing accounts.
- User can register a new account.
- User can reset password.
- Design tabs for home screen.


### Fixed Bugs
- Expo Go connection to database
- Fixed error messages from backends
- 

### Known Issues
- Unable to connect to database in Expo Go
- Dimension of content (login page)
- Email box text length unmatch
- Navigation problem; doesn't have a navigation bar; can go from home screen to login screen directly.
### TODO
- Email Verification
- Questionnaire 
- User account screen
- ...
- Login session
- Email verification


# Environment Setup
- `cd ./app/src`, `npm i`
- `cd` to `.server_ts`, and follow the instructions in `server_ts/README.md` to run the server.
- **react-navigation install**: change directory to ```./app/src```, and run ```npm install @react-navigation/native```, ```expo install react-native-screens react-native-safe-area-context```.
- **react-native-keyboard-aware-scroll-view**: run ```npm i react-native-keyboard-aware-scroll-view --save```

# How To Run
- TODO
- ```sh
    $ cd ./app/src
    $ expo start
    ```

# License
This project is licensed under the [MIT license](LICENSE).
