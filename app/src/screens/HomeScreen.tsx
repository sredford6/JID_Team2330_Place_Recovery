import React, { useState, useEffect, useContext, useRef } from "react";
import * as Device from "expo-device";

import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  TextInputComponent,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Text, View } from "../components/Themed";
import {
  RootTabScreenProps,
  CountOfTakenQofDay,
  DaySchedule,
} from "../components/types";
import { useIsFocused } from "@react-navigation/native";

import {
  convertTime,
  retrieveDataString,
  storeDataString,
  timeDifference,
  formatDate,
  nextDate,
  generateDaySchedule,
  inQuestionnaireOpenInterval,
} from "../components/Helpers";
import { AuthContext } from "../navigation/context";

import { ScrollView } from "react-native";
import * as Location from "expo-location";
import { goToSettings } from "../components/Helpers";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeStack">) {
  const { userInfo } = useContext(AuthContext);

  const isFocused = useIsFocused();

  const [schedules, setSchedules] = useState<Array<DaySchedule>>();

  /**
   * pseudo sleep schedule for development
   * hours in 24-hour clock
   */
  let wakeUp = 8;
  let sleep = 23;
  const [isAvailable, setIsAvailable] = useState<number>(-1); // index of available block

  const [expoPushToken, setExpoPushToken] = useState<any>("");
  const [notification, setNotification] = useState<any>(false);

  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  /**
   * Code from https://docs.expo.dev/push-notifications/overview/
   *
   * @returns getExpoPushTokenAsync, token
   */
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        // alert("Failed to get push token for push notification!");
        goToSettings(
          "Require notification permission",
          "The app needs to notify you when the questionnaire is ready. Please enable notification in your phone settings."
        );
        return;
      }
      try {
        token = (await Notifications.getExpoPushTokenAsync()).data;
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }
    // 4:36 if token
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  //https://docs.expo.dev/versions/latest/sdk/notifications/#scheduling-the-notification-that-will-trigger-once
  async function scheduleNotification(seconds: number) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Title",
        body: "body",
        data: { data: "data goes here" },
      },
      trigger: {
        seconds: seconds,
      },
    });
  }
  // storeDataString("schedules", "");
  useEffect(() => {
    // 1. fetch local schedules from storage
    // 2. find current date in the schedules [1,2,3,4,5,6,7]; current date is 3; or current date is 8
    // pop previous passed date until meet current date, or array is empty, [3,4,5,6,7]; or [] if current date is 8
    // 3. add x new day scheduels starting from the last date in array (date 7), x = 7 - len(schedules) => [3,4,5,6,7,8,9]
    // if array is empty, add 7 new day schedules starting from today: [8,9,10,11,12,13,14]
    // for each newly added schedules, call scheduelNotification() for each time in the timeblocks.
    // 4. Display current storage
    // 5. store schedules back into async storage
    (async () => {
      let schedules = await retrieveDataString("schedules");
      let j = 0; // index of updatedSchedules
      let updatedSchedules = Array<DaySchedule>(7);
      let futureSchedulesCount = 0;
      let today = formatDate(new Date());
      let startDate = "";
      if (!schedules) {
        futureSchedulesCount = 7;
        startDate = today;
      } else {
        // find current date
        let schedulesArr = JSON.parse(schedules);
        let i = 0;
        for (; i < schedulesArr.length; i++) {
          // if < today; continue; count += 1
          if (
            new Date(today).getTime() > new Date(schedulesArr[i].date).getTime()
          ) {
            futureSchedulesCount += 1;
            continue;
          } else {
            break;
          }
        }
        console.log("i", i);
        // copy future schedules to updatedSchedueles
        for (; i < schedulesArr.length; i++, j++) {
          updatedSchedules[j] = schedulesArr[i];
        }
        // start day will be today
        if (futureSchedulesCount == 7) {
          startDate = today;
        } else {
          // will be last date + 1
          startDate = nextDate(schedulesArr[schedulesArr.length - 1].date);
        }
      }
      // fill out the new schedules
      for (; j < updatedSchedules.length; j++) {
        let newSchedule = generateDaySchedule(wakeUp, sleep, startDate);
        for (let i = 0; i < newSchedule.notificationTime.length; i++) {
          let notifyTime = new Date(newSchedule.date + "T00:00");
          notifyTime.setHours(newSchedule.notificationTime[i]);
          let { daysDifference, hoursDifference, minutesDifference } =
            timeDifference(notifyTime.getTime(), new Date().getTime());
          newSchedule.timeBlocks[i].identifier = await scheduleNotification(
            minutesDifference * 60 +
              hoursDifference * 60 * 60 +
              daysDifference * 24 * 60 * 60
          );
        }
        updatedSchedules[j] = newSchedule;
        startDate = nextDate(startDate);
      }
      // console.log(updatedSchedules);
      setSchedules(updatedSchedules);
      storeDataString("schedules", JSON.stringify(updatedSchedules));
    })();
  }, []);

  // check norification permission
  useEffect(() => {
    (async () => {
      let token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);
    })();
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [isFocused]);
  // location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        goToSettings(
          "Require location sharing",
          "The app requires to access to your location when you are using the app. Please enable location permission in Settings."
        );
        return false;
      }
    })();
  }, []);

  useEffect(() => {
    console.log("hello");

    if (schedules) {
      setIsAvailable(
        inQuestionnaireOpenInterval(new Date(), schedules[0].notificationTime)
      );
      (async () => {
        let sche = (await retrieveDataString("schedules"))!;
        setSchedules(JSON.parse(sche));
      })();
    }
  }, [isFocused]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={[styles.frameContainer, styles.shadowProp]}>
          <Text style={styles.headTextLeft}>Daily Questionnaire</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (
                isAvailable != -1 &&
                schedules &&
                !schedules[0].completed[isAvailable] // not completed
              ) {
                navigation.navigate("Questionnaire");
              }
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonTextWhite}>
              {isAvailable != -1 &&
              schedules &&
              !schedules[0].completed[isAvailable]
                ? "Start"
                : "Not Available"}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              console.log(scheduleNotification(1));
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonTextWhite}>Test</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              Notifications.cancelAllScheduledNotificationsAsync();
              storeDataString("schedules", "");
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonTextWhite}>Reset</Text>
          </TouchableOpacity>
          <Text>
            {schedules
              ? "Date:" +
                schedules[0].date +
                "\n" +
                "Morning Block" +
                schedules[0].timeBlocks[0].begin +
                "-" +
                schedules[0].timeBlocks[0].end +
                ", available at " +
                schedules[0].notificationTime[0] +
                ", completed " +
                schedules[0].completed[0] +
                "\n" +
                "Midday Block: " +
                schedules[0].timeBlocks[1].begin +
                "-" +
                schedules[0].timeBlocks[1].end +
                ", available at " +
                schedules[0].notificationTime[1] +
                ", completed " +
                schedules[0].completed[1] +
                "\n" +
                "Evening Block: " +
                schedules[0].timeBlocks[2].begin +
                "-" +
                schedules[0].timeBlocks[2].end +
                ", available at " +
                schedules[0].notificationTime[2] +
                ", completed " +
                schedules[0].completed[2] +
                "\n"
              : " "}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  frameContainer: {
    width: "88%",
    flex: 0.2,
    backgroundColor: "#FFFFFF99",
    justifyContent: "space-between",
    //justifyContent: "center",
    alignItems: "center",
    //alignContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 40,
    borderRadius: 20,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  leftContainer: {
    alignItems: "flex-start",
    alignContent: "space-between",
  },
  blackText: {
    fontSize: 14,
    color: "#000000",
  },
  headTextLeft: {
    textAlign: "left",
    fontSize: 18,
    color: "#000000",
    //paddingLeft: 8,
  },
  headTextRight: {
    textAlign: "right",
    fontSize: 18,
    //paddingRight: 8,
  },
  button: {
    width: 250,
    height: 45,
    backgroundColor: "#072B4F",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 5,
  },
  buttonTextWhite: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  textInput: {
    width: "95%",
    color: "#072B4F",
    fontSize: 12,
    marginTop: 5,
    paddingVertical: 10,
    borderRadius: 10,
    borderBottomColor: "white",
  },
});
