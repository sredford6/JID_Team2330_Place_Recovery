import { StyleSheet, Button, TouchableHighlightBase } from "react-native";

import {
  ScrollView,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import { backendUrl } from "../config/config.json";
import { NavigationEvents } from "react-navigation";
import React from "react";
import { useState, useEffect } from "react";
import Questionnaire from "./QuestionnaireScreen";

// let stress = [0, 0, 0, 0, 0, 0, 0];
// let calmness = [0, 0, 0, 0, 0, 0, 0];
// let sadness = [0, 0, 0, 0, 0, 0, 0];
// let anxiety = [0, 0, 0, 0, 0, 0, 0];
export default function ProgressScreen() {
  const [sadness, setsadness] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [anxiety, setanxiety] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [stress, setstress] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [calmness, setcalmness] = useState([0, 0, 0, 0, 0, 0, 0]);

  const updateSadness = (day, value) => {
    setList((existingItems) => {
      return existingItems.map((item, j) => {
        return j === day ? item + value : item;
      });
    });
  };

  const getResult = async () => {
    const token = await getItemAsync("user_token");
    // console.log(token);
    axios
      .get(`${backendUrl}/api/question/answer/frommonday`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        let count = [0, 0, 0, 0, 0, 0, 0];
        console.log("======================");
        // console.log(response);
        for (let i = 0; i < response.data.answers.length; i++) {
          // This is the questionnaire
          console.log("?????");
          const questionnaire = response.data.answers[i];
          console.log("======================");
          console.log(questionnaire);
          const questions = questionnaire.answers;
          // date of the questionnaire
          console.log(questions);
          const date = questionnaire.datetime.substring(0, 10);
          const d = new Date(date);
          // day of the questionnaire
          let day = d.getDay();
          count[day] = count[day] + 1;

          // monday
          if (day == 0) {
            // add results to the array
            stress[0] = questions[0].answer;
            calmness[0] = questions[1].answer;
            updateSadness(0, questions[0].answer);
            anxiety[0] = questions[3].answer;
            // tuesday
          } else if (day == 1) {
            stress[1] = questions[0].answer;
            calmness[1] = questions[1].answer;
            updateSadness(1, questions[0].answer);
            anxiety[1] = questions[3].answer;
          } else if (day == 2) {
            stress[2] = questions[0].answer;
            calmness[2] = questions[1].answer;
            updateSadness(2, questions[0].answer);
            anxiety[2] = questions[3].answer;
          } else if (day == 3) {
            stress[3] = questions[0].answer;
            calmness[3] = questions[1].answer;
            updateSadness(3, questions[0].answer);
            anxiety[3] = questions[3].answer;
          } else if (day == 4) {
            stress[4] = questions[0].answer;
            calmness[4] = questions[1].answer;
            updateSadness(4, questions[0].answer);
            anxiety[4] = questions[3].answer;
          } else if (day == 5) {
            stress[5] = questions[0].answer;
            calmness[5] = questions[1].answer;
            updateSadness(5, questions[0].answer);
            anxiety[5] = questions[3].answer;
          } else if (day == 6) {
            stress[6] = questions[0].answer;
            calmness[6] = questions[1].answer;
            updateSadness(6, questions[0].answer);
            anxiety[6] = questions[3].answer;
          }
        }
        for (let i = 0; i < 7; i++) {
          if (count[i] != 0) {
            stress[i] = stress[i] / count[i];
            calmness[i] = calmness[i] / count[i];
            sadness[i] = sadness[i] / count[i];
            anxiety[i] = anxiety[i] / count[i];
          }
        }

        // console.log("hap");
        // console.log(stress);
        // console.log(calmness);
        // console.log(sadness);
        // console.log(anxiety);
      })
      .catch((error) => {
        console.log("??????????????????????");
        console.log(error.message);
        console.log(error.data);
      });
  };

  useEffect(() => {
    getResult();
  }, []);

  function* hapYLabel() {
    yield* [0, 1, 2, 3, 4, 5];
  }

  const hapyLabelIterator = hapYLabel();

  function* calmYLabel() {
    yield* [0, 1, 2, 3, 4, 5];
  }

  const calmLabelIterator = calmYLabel();

  function* sadYLabel() {
    yield* [0, 1.0, 2.0, 3.0, 4.0, 5.0];
  }

  const sadLabelIterator = sadYLabel();
  return (
    <ImageBackground
      source={require("../assets/images/home4.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.TitleText}>Stress</Text>
          <BarChart
            data={{
              labels: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
              datasets: [
                {
                  // data: stress,
                  data: stress,
                },
              ],
            }}
            showValuesOnTopOfBars={true}
            width={Dimensions.get("window").width - 20} // from react-native
            height={220} //adjust the height of the graph
            segments={5}
            chartConfig={{
              fillShadowGradient: "#34A0A4",
              fillShadowGradientOpacity: 1,
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              // backgroundGradientFrom: "#82A3FF",
              // backgroundGradientTo: "#FFFFFF",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              formatYLabel: () => hapyLabelIterator.next().value,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <Text style={styles.TitleText}>Calmness</Text>
          <BarChart
            data={{
              labels: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
              datasets: [
                {
                  data: calmness,
                },
              ],
            }}
            showValuesOnTopOfBars={true}
            width={Dimensions.get("window").width - 20} // from react-native
            height={220} //adjust the height of the graph
            segments={5}
            chartConfig={{
              fillShadowGradient: "#34A0A4",
              fillShadowGradientOpacity: 1,
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              //backgroundColor: "#eee",
              // backgroundGradientFrom: "#82A3FF",
              // backgroundGradientTo: "#FFFFFF",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              formatYLabel: () => calmLabelIterator.next().value,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <Text style={styles.TitleText}>Sadness</Text>
          <BarChart
            data={{
              labels: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
              datasets: [
                {
                  data: sadness,
                },
              ],
            }}
            showValuesOnTopOfBars={true}
            width={Dimensions.get("window").width - 20} // from react-native
            height={220} //adjust the height of the graph
            segments={5}
            chartConfig={{
              fillShadowGradient: "#34A0A4",
              fillShadowGradientOpacity: 1,
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              //backgroundColor: "#eee",
              // backgroundGradientFrom: "#82A3FF",
              // backgroundGradientTo: "#FFFFFF",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              formatYLabel: () => sadLabelIterator.next().value,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  TitleText: {
    textAlign: "center",
    color: "#072B4F",
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 30,
    paddingTop: 30,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  shadowPropButton: {
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  // scrollView: {
  //   marginHorizontal: 20,
  // },
});
