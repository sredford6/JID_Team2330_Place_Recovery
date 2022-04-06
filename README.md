# PlaceNrecovery App (GT Team 1358)
<!-- [![license](https://img.shields.io/github/license/dec0dOS/amazing-github-template.svg?style=flat-square)](LICENSE) -->

### Project Introduction
The project is a mobile application for mental health and risk stratification based on neighborhood characteristics for both Apple and Android platforms. Virtually no research exists examining the daily influence of environmental factors on the development of mental health disorders such as schizophrenia. Our solution is a mobile app that collects real-time data (daily survey) on the status of the user’s mental health such as their feelings and emotions in relation to their location during the day. We can compile and organize this data into a database for our client and other clinicians to analyze and can better treat their own patients and gain knowledge of the development of mental health disorders.

  
# Release Notes

## Version 0.4.0 (Sprint 4)
### Features

- Implemented a profile screen that is meant to display the user's personal information and allow them to access the additional demographics form
- Implemented the additional demographics form, which can be accessed through the profile screen. The user can choose to additionally provide such information as their education level, occupation, personal history of mental illness etc.
- Can generate notification timeblocks based on sleep schedule.
- 

### Fixed Bugs
- Fixed the flex of home screen.

### Known Issues
- DropDownPicker shows the number of items that were selected by the user when indicating the personal and family history of mental illness as opposed to the names of the items that were selected. 
- Connections to server seems to be unstable. 
- Notification is only local. We may want remote notification as well. 
- Free text in Questionnaire is not highlighted.
- From last sprint: need to fix the issue ``Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function. at screens/QuestionnaireScreen.tsx:52:22 in GetLocation``(showed up when going back to home screen with unfinished questionnaire).

## Version 0.3.0 (Sprint 3)
### Features

- The questionnaire is available at random times within three time blocks
- The user has one hour to fill out the questionnaire once it opens
- If the user does not fill out the questionnaire within an hour, the questionnaire becomes unavailable
- The user is required to answer all questions; the user cannot proceed to the next question if they didn't provide an answer to the one currently displayed
- The location of the user is recorded upon submitting the questionnaire  
- The UI of the home page is changed to display only one questionnaire tab
- The progress screen contains bar charts that will be used to illustrate the user's progress/trends in the following sprint
- The user can enter their bedtime and wakeup time when registering for an account
- The questionnaire was updated with the newly received questions from the client

### Fixed Bugs
- Will alert users they have no internet connection when they are trying to login.
- Fixed Expo Go issue in iOS.

### Known Issues
- Dark Mode text/UI color
- The server cannot be run locally by two or more team members simultaneously 
- Need to fix the issue ``Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function. at screens/QuestionnaireScreen.tsx:52:22 in GetLocation``(showed up when going back to home screen with unfinished questionnaire)
- Unstable server connection? Network Error message (from axios, try-catch).
- 



### TODO
- Remove the location tab from the bottom navigation bar
- Test the newly implemented functionalities on Android platform
- Display the message to the user if they entered a small sleep schedule time window(less than 8 hours)
- Add the basic demographics form
- Add geocoding
- Generate timeblock and random notification time for future days.
- Better UI to show the complete status of the questionnaire.
- Update complete status of the questionnaire from QuestionnaireScreen
- Implementing an loading screen (show loading whenever the app is using endpoints; the app should also try the requests multiple times if encounters network problem).  
- Next sprint: implement the profile screen 

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
- Users can take questionnaire within the available time.
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
- Need to update questionnaire available time and completed status daily.

### TODO
- Refine UI design. (checkbox instead of buttons?)
- Do more testing and find edge cases. 
- Should we allow users to skip question? -> prune skipped questions so needless data isn't stored in the database
- Have better error messages from backend when validating questions and answers
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
