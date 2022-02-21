# PlaceNrecovery App (GT Team 1358)
<!-- [![license](https://img.shields.io/github/license/dec0dOS/amazing-github-template.svg?style=flat-square)](LICENSE) -->

### Project Introduction
The project is a mobile application for mental health and risk stratification based on neighborhood characteristics for both Apple and Android platforms. Virtually no research exists examining the daily influence of environmental factors on the development of mental health disorders such as schizophrenia. Our solution is a mobile app that collects real-time data (daily survey) on the status of the user’s mental health such as their feelings and emotions in relation to their location during the day. We can compile and organize this data into a database for our client and other clinicians to analyze and can better treat their own patients and gain knowledge of the development of mental health disorders.


# Release Notes

## Version 0.2.0 (Sprint 2)
### Features
- In the registration screen, the color of "Confirm password" will change to red if the passwords users enter do not match.
- If the user doesn't input anything on the registration screen and clicked "Register", it will prompt the user to fill out the textboxes.
- User can take three questionnaires in three different time periods. During each time period, only one questionnaire will be activated. 
- User will receive notifications during the first hour of each questionnaire being opened.   

### Bug Fixes
- dimension of content container
- unable to justify content (login page) 
- email box text length
- return button does not work

### Known Issues
- Unable to login the app through Android simulator


### TODO
- Questionnaire section


## Version 0.1.0 (Sprint 1)
### Features
- User can log in with existing accounts.
- User can register a new account.
- User can reset password.
- Design tabs for home screen.


### Bugs
- Fixed error messages from backends
- 

### Known Issues
- Unable to connect to database in Expo Go
- Dimension of content (login page)
- Email box text length unmatch
- Navigation problem; doesn't have a navigation bar; can go from home screen to login screen directly.
### TODO
- Login session
- Email verification


# Environment Setup
- `cd ./app/src`, `npm i`
- **react-navigation install**: change directory to ```./app/src```, and run ```npm install @react-navigation/native```, ```expo install react-native-screens react-native-safe-area-context```.
- **react-native-keyboard-aware-scroll-view**: run ```npm i react-native-keyboard-aware-scroll-view --save```
- TODO: set up for the server


# How To Run
- TODO
- ```sh
    $ cd ./app/src
    $ expo start
    ```

# License
This project is licensed under the [MIT license](LICENSE).
