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
  AppState,
} from "react-native";
import { Text, View } from "../components/Themed";
import {
  RootTabScreenProps,
  CountOfTakenQofDay,
  DaySchedule,
} from "../components/types";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { backendUrl } from "../config/config.json";

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
import { LinearGradient } from "expo-linear-gradient";
import { getItemAsync } from "expo-secure-store";

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

  const [wakeTime, setWakeTime] = useState<number>(8);
  const [sleepTime, setSleepTime] = useState<number>(21);

  const [isAvailable, setIsAvailable] = useState<number>(-1); // index of available block

  const [expoPushToken, setExpoPushToken] = useState<any>("");
  const [notification, setNotification] = useState<any>(false);

  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const handleAppStateChange = (state: any) => {
    setAppStateVisible(state);
  };
  // https://reactnative.dev/docs/appstate
  // https://rossbulat.medium.com/working-with-app-state-and-event-listeners-in-react-native-ffa9bba8f6b7
  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  const getSleepSchedule = async () => {
    const token: string = (await getItemAsync("user_token"))!;

    const userInfo = axios
      .get(`${backendUrl}/api/data/myuser`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        let wake = new Date(response.data.wakeTime).getHours();
        let sleep = new Date(response.data.sleepTime).getHours();
        if (sleep - wake < 6) {
          wake = wake < 5 ? 8 : wake; // earliest windows starts at 5 am
          setWakeTime(wake);
          setSleepTime(22);
        } else {
          setWakeTime(wake);
          setSleepTime(sleep);
        }
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.data);
      });
    console.log("@113", sleepTime, wakeTime);
  };

  const ready = () => {
    return (
      isAvailable != -1 && schedules && !schedules[0].completed[isAvailable]
    );
  };
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
        title: "Your questionnaire is ready!",
        body: "Your questionnaire is ready. Please complete it within an hour.",
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

    getSleepSchedule();
    (async () => {
      let schedules = await retrieveDataString(userInfo.email + "_schedules");
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
        let newSchedule = generateDaySchedule(wakeTime, sleepTime, startDate);
        for (let i = 0; i < newSchedule.notificationTime.length; i++) {
          let notifyTime = new Date(newSchedule.date + "T00:00");
          notifyTime.setHours(newSchedule.notificationTime[i]);
          let { daysDifference, hoursDifference, minutesDifference } =
            timeDifference(notifyTime.getTime(), new Date().getTime());
          newSchedule.timeBlocks[i].identifier = await scheduleNotification(
            (minutesDifference + 1) * 60 +
              hoursDifference * 60 * 60 +
              daysDifference * 24 * 60 * 60
          );
        }
        updatedSchedules[j] = newSchedule;
        startDate = nextDate(startDate);
      }
      // console.log(updatedSchedules);
      setSchedules(updatedSchedules);
      storeDataString(
        userInfo.email + "_schedules",
        JSON.stringify(updatedSchedules)
      );
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
  }, [isFocused, appStateVisible]);
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

  // update schedules when return to home screen (like after a questionnaire)
  useEffect(() => {
    (async () => {
      let sche = (await retrieveDataString(userInfo.email + "_schedules"))!;
      setSchedules(JSON.parse(sche));
    })();
  }, [isFocused, appStateVisible]);

  // update isAvailable status and update items on the screen
  useEffect(() => {
    if (schedules) {
      setIsAvailable(
        inQuestionnaireOpenInterval(new Date(), schedules[0].notificationTime)
      );
    }
  }, [schedules]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View style={styles.container}>
        <View style={[styles.frameContainer, styles.shadowProp]}>
          <Text style={styles.title}>
            {ready()
              ? "The questionnaire is ready!"
              : "Your next questionnaire is not ready"}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (ready()) {
                navigation.navigate("Questionnaire");
              }
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonTextWhite}>
              {ready() ? "Start" : "Not Available"}
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
              storeDataString(userInfo.email + "_schedules", "");
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonTextWhite}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.frameContainer, styles.shadowProp]}>
          <Text style={styles.title}>Questionnaire status</Text>
          <LinearGradient
            colors={["#576DE7", "#8DACE7"]}
            style={styles.status}
            start={{ x: 0, y: 4 }}
            end={{ x: 0.5, y: 0 }}
          >
            <Text style={styles.textWhite}>TODO</Text>
          </LinearGradient>
          <LinearGradient
            colors={["#576DE7", "#8DACE7"]}
            style={styles.status}
            start={{ x: 0, y: 4 }}
            end={{ x: 0.5, y: 0 }}
          >
            <Text style={styles.textWhite}>TODO</Text>
          </LinearGradient>
          <LinearGradient
            colors={["#576DE7", "#8DACE7"]}
            style={styles.status}
            start={{ x: 0, y: 4 }}
            end={{ x: 0.5, y: 0 }}
          >
            <Text style={styles.textWhite}>TODO</Text>
          </LinearGradient>

          {/* <Text>
            {schedules
              ? "Date:" +
                schedules[0].date +
                ", sleep schedule: " +
                wakeTime +
                "-" +
                sleepTime +
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
          </Text> */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF00",
  },
  frameContainer: {
    width: "88%",
    flex: 0.2,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    //justifyContent: "center",
    alignItems: "center",
    //alignContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 24,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  status: {
    width: 280,
    height: 35,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
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
    backgroundColor: "#446EE7",
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
  textWhite: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
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
