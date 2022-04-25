<h1 align="center">PlaceNrecovery🧠 (GT Team 1358)</h1> <br>

<p align="center">
  <a href="https://imgur.com/uGnMJIv"><img src="https://i.imgur.com/uGnMJIv.jpg" width ="450" title="source: imgur.com" /></a>
  </p>
<p align="center">
  <a href="https://github.com/DenverCoder1/readme-typing-svg"><img src="https://readme-typing-svg.herokuapp.com?&font=IBM+Plex+Sans&color=0f0f0f&size=20&lines=Track+Mental+health+Based+On+Neighborhood;Available+for+both+iOS+and+Android+platform" /></a>
</p>

<p align="center">
  <a href="https://itunes.apple.com/us/app/">
    <img alt="Download on the App Store" title="App Store" src="http://i.imgur.com/0n2zqHD.png" width="140">
  </a>
  <a href="https://play.google.com/store/apps/">
    <img alt="Get it on Google Play" title="Google Play" src="http://i.imgur.com/mtGRPuM.png" width="140">
  </a>
  </p>
  

![Release](https://img.shields.io/github/v/release/DorianLin/GT_1358_Project_Design?label=release)
[![Node](https://img.shields.io/node/v/react-native)](https://nodejs.org/en/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)


## Table of Contents

- [📖 Introduction](#Introduction)
- [🌟 Features](#Features)
- [❓Known Issues](#Known-Issues)
- [⚙️ Fixed Bugs](#Fixed-Bugs)
- [💻 How To Run ](#How-To-Run)
- [📄 License](#License)

## Introduction

The project is a mobile application for mental health and risk stratification based on neighborhood characteristics for both Apple and Android platforms. Virtually no research exists examining the daily influence of environmental factors on the development of mental health disorders such as schizophrenia. Our solution is a mobile app that collects real-time data (daily survey) on the status of the user’s mental health such as their feelings and emotions in relation to their location during the day. We can compile and organize this data into a database for our client and other clinicians to analyze and can better treat their own patients and gain knowledge of the development of mental health disorders.

**The app is available for both iOS and Android platforms.**
<p align="center">
<a href="https://imgur.com/WigKAVH"><img src="https://i.imgur.com/WigKAVH.jpg" width ="300"  title="source: imgur.com" /></a>
<br>
</p>

## Features
### Version 1.0.0
- The app can handle multiple free-response questions.
- The Home Screen can show the complete status of the questionnaire and the timeclock for the next questionnaire.
- The app only allows users to take questionnaires within the available period.
- The Welcome Screen that is displaying the general information and guidance for the user the first time opened the application.
- Users can reset notification schedules by long-pressing the button on the home page.
- A profile screen that can display the user's personal information and allow them to access the additional demographics form.
- The progress screen contains bar charts that will be used to illustrate the user's progress/trends.
- Client can export user data to CSV through links.
- Published the app to Apple App Store.
- Published the app to Google Play Store.
<p align="center">
<br>
<a href="https://imgur.com/jpk1OKi"><img src="https://i.imgur.com/jpk1OKi.jpg" width ="450" title="source: imgur.com" /></a>
<br><br>
</p>

## Known Issues
### Version 1.0.0
- DateTimePicker has problems on Android, work fine on iOS.
- Haven't tested the case where there are no GPS signals.
- The notification might not work properly if the users change the system time. Users can reset notification schedules if the notification don't work.
- The notification works on Expo Go but seems have problem on iOS.

## Fixed Bugs
### Version 1.0.0
- Fixed locations not working on Android devices.


## How to Run
- First, make sure you have installed [Node 14 LTS](https://nodejs.org/en/download/) or greater installed.
- Install the latest verion of Expo CLI: 
```bash 
npm i -g expo-cli
```

- Go under the project directory, and install all dependencies:
```bash
cd ./app/src
npm i
```
- Start the project with
```bash
expo start
``` 
- Scan the QR code with Expo Go (Android) or the Camera app (iOS) to run the app on your phone.
- To run the server locally,  go under the server directory:
```bash
cd ./server
```
- Then follow the instructions in `server/README.md` to run the server.


## License
This project is licensed under the [MIT license](LICENSE).
