import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps, CountOfTakenQofDay } from "../components/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

import {
  convertTime,
  retrieveDataString,
  storeDataString,
  timeDifference,
  formatDate,
} from "../components/Helpers";
import { AuthContext } from "../navigation/context";

import { ScrollView } from "react-native";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeStack">) {
  const { userInfo } = useContext(AuthContext);
  const [lastQTime, setLastQTime] = useState<number>(0);

  const isFocused = useIsFocused();
  const [takenQCount, setTakenQCount] = useState<CountOfTakenQofDay>({
    date: "-1",
    count: 0,
  });

  useEffect(() => {
    // load email info and last q time
    (async () => {
      /**
       * TODO: last taken time might not be useful, but it's nice to have it?
       */
      const lastQTime_ = Number(
        await retrieveDataString(userInfo.email + "_lastQTime")
      );
      if (!lastQTime_) {
        console.log("fail to fetech last qtime.");
      }

      setLastQTime(lastQTime_);

      /**
       * TODO: These information may should be fetech from backend.
       */
      const lastTakenQCount = await retrieveDataString(
        userInfo.email + "_takenQCount"
      );
      let date = new Date();
      if (
        !lastTakenQCount ||
        JSON.parse(lastTakenQCount).date != formatDate(date)
      ) {
        console.log("setting up a new q counts for the day!");
        let newCount = { date: formatDate(date), count: 0 };
        setTakenQCount(newCount);
        storeDataString(
          userInfo.email + "_takenQCount",
          JSON.stringify(newCount)
        );
      } else {
        setTakenQCount(JSON.parse(lastTakenQCount));
      }
    })();
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
              let time = new Date();
              // if (lastQTime != -1) {
              //   let { daysDifference, hoursDifference, minutesDifference } =
              //     timeDifference(time, lastQTime);
              //   // 1 is the threshold of reminding
              //   if (daysDifference < 1 && hoursDifference < 2) {
              //     Alert.alert(
              //       "TODO Alert Message",
              //       "You've taken the questionnaire in " +
              //         (hoursDifference == 0
              //           ? minutesDifference == 0
              //             ? "less than a minute"
              //             : minutesDifference +
              //               (minutesDifference > 1 ? " minutes " : " minute")
              //           : hoursDifference +
              //             (hoursDifference > 1 ? " hours" : " hour")) +
              //         " ago, do you want to take it again?",
              //       [
              //         { text: "Cancel" },
              //         {
              //           text: "Yes",
              //           onPress: () => {
              //             navigation.navigate("Questionnaire");
              //           },
              //         },
              //       ]
              //     );
              //   } else {
              //     navigation.navigate("Questionnaire");
              //   }
              // } else {
              //   navigation.navigate("Questionnaire");
              // }
              if (takenQCount.count == 3) {
                Alert.alert("You've taken all 3 questionnaires of today! ");
              } else {
                navigation.navigate("Questionnaire");
              }
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonTextWhite}>Start</Text>
          </TouchableOpacity>
          <Text style={styles.blackText}>
            {lastQTime != 0
              ? "Last questionnaire taken at: " +
                convertTime(new Date(lastQTime))
              : "You haven't take any questionnaire yet!"}
          </Text>

          <Text>You've taken {takenQCount.count} / 3 questionnaire today!</Text>
          <Text
            onPress={
              /**
               * ONLY for development puroposes.
               */
              async () => {
                setLastQTime(0);
                await storeDataString(userInfo.email + "_lastQTime", "0");
                let newQcount = {
                  date: formatDate(new Date()),
                  count: 0,
                };
                setTakenQCount(newQcount);
                await storeDataString(
                  userInfo.email + "_takenQCount",
                  JSON.stringify(newQcount)
                );
              }
            }
          >
            TEST: remove last taken date and count
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
});
