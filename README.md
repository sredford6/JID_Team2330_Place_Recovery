# PlaceNrecovery App (GT Team 1358)
<!-- [![license](https://img.shields.io/github/license/dec0dOS/amazing-github-template.svg?style=flat-square)](LICENSE) -->

### Project Introduction
The project is a mobile application for mental health and risk stratification based on neighborhood characteristics for both Apple and Android platforms. Virtually no research exists examining the daily influence of environmental factors on the development of mental health disorders such as schizophrenia. Our solution is a mobile app that collects real-time data (daily survey) on the status of the user’s mental health such as their feelings and emotions in relation to their location during the day. We can compile and organize this data into a database for our client and other clinicians to analyze and can better treat their own patients and gain knowledge of the development of mental health disorders.

  
# Release Notes

## Version 1.0.0 
### Features
- The app can handle multiple free response questions.
- The Home Screen can show the complete status of the questionnaire and the timeclock for the next questionnaire.
- The app only allows user to take questionnaire within the available period.
- The Welcome Screen that is displaying the general information and guidance for the user first time opened the application.
- User can reset notification schedules by long pressing the button on home page.
- A profile screen that can display the user's personal information and allow them to access the additional demographics form.
- The progress screen contains bar charts that will be used to illustrate the user's progress/trends.
- Client can export user data to csv through links.
- Published the app to Apple App Store.
- Published the app to Google Play Store.

### Fixed Bugs 
- Fixed locations not working on Android devices.


### Known Issues
- DateTimePicker has problems on Andriod, work fine on iOS.
- Haven't tested the case where there is no GPS signals.
- The notification might not work porperly if the users change the system time. Users can reset notifcation schedules if the notification don't work.


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
