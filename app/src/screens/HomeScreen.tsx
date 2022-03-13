import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  TextInputComponent,
} from "react-native";
import { Text, View } from "../components/Themed";
import {
  RootTabScreenProps,
  CountOfTakenQofDay,
  DaySchedule,
} from "../components/types";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

import {
  convertTime,
  retrieveDataString,
  storeDataString,
  timeDifference,
  formatDate,
  generateDaySchedule,
  inQuestionnaireOpenInterval,
} from "../components/Helpers";
import { AuthContext } from "../navigation/context";

import { ScrollView } from "react-native";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeStack">) {
  const { userInfo } = useContext(AuthContext);

  const isFocused = useIsFocused();

  const [daySchedule, SetDaySchedule] = useState<DaySchedule>(
    generateDaySchedule(8, 22)
  );

  /**
   * pseudo sleep schedule for development
   * hours in 24-hour clock
   */
  let wakeUp = 8;
  let sleep = 23;
  const [currentHour, setCurrentHour] = useState<number>(-1);
  const [isAvailable, setIsAvailable] = useState<number>(-1);

  useEffect(() => {
    let schedule = generateDaySchedule(wakeUp, sleep);
    SetDaySchedule(schedule);

    setIsAvailable(
      inQuestionnaireOpenInterval(new Date(), daySchedule.notificationTime)
    );
    // load email info and last q time
    (async () => {
      /**
       * TODO: These information may should be fetech from backend.
       */
      // const todaySchedule = await
      // const lastTakenQCount = await retrieveDataString(
      //   userInfo.email + "_takenQCount"
      // );
      // let date = new Date();
      // if (
      //   !lastTakenQCount ||
      //   JSON.parse(lastTakenQCount).date != formatDate(date)
      // ) {
      //   let newCount = { date: formatDate(date), count: 0 };
      //   setTakenQCount(newCount);
      //   storeDataString(
      //     userInfo.email + "_takenQCount",
      //     JSON.stringify(newCount)
      //   );
      // } else {
      //   setTakenQCount(JSON.parse(lastTakenQCount));
      // }
    })();
  }, []);

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
                !daySchedule.timeBlocks[isAvailable].completed
              ) {
                navigation.navigate("Questionnaire");
              }
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonTextWhite}>
              {isAvailable != -1 ? "Start" : "Not available yet"}
            </Text>
          </TouchableOpacity>
          <Text>
            Current Time (testing): {currentHour}, isAvailable: {isAvailable}
          </Text>

          <Text>
            Morning Block: {daySchedule.timeBlocks[0].begin} -
            {daySchedule.timeBlocks[0].end}, available at{" "}
            {daySchedule.notificationTime[0]} {"\n"}
            Midday Block: {daySchedule.timeBlocks[1].begin} -{" "}
            {daySchedule.timeBlocks[1].end}, available at{" "}
            {daySchedule.notificationTime[1]} {"\n"}
            Evening Block: {daySchedule.timeBlocks[2].begin} - {""}
            {daySchedule.timeBlocks[2].end}, available at{" "}
            {daySchedule.notificationTime[2]} {"\n"}
          </Text>
          <Text
            onPress={
              /**
               * ONLY for development puroposes.
               */
              async () => {
                // setLastQTime(0);
                // await storeDataString(userInfo.email + "_lastQTime", "0");
                // let newQcount = {
                //   date: formatDate(new Date()),
                //   count: 0,
                // };
                // setTakenQCount(newQcount);
                // await storeDataString(
                //   userInfo.email + "_takenQCount",
                //   JSON.stringify(newQcount)
                // );
              }
            }
          >
            TEST: remove last taken date and count
          </Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Current Time (0-24 integer,for testing)"
          onChangeText={(h) => {
            setCurrentHour(parseInt(h));
            setIsAvailable(
              inQuestionnaireOpenInterval(
                parseInt(h),
                daySchedule.notificationTime
              )
            );
          }}
        ></TextInput>
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
