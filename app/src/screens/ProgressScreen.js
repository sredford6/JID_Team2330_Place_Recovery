import { StyleSheet, Button, TouchableHighlightBase } from "react-native";

import {
  ScrollView,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import { backendUrl } from "../config/config.json";
import { NavigationEvents } from "react-navigation";
import React from "react";
import { useState, useEffect } from "react";
import Questionnaire from "./QuestionnaireScreen";

export default function ProgressScreen() {
  // 1. 把用户当天某个问题（0 - 4）的answer加起来除以questionnaire的提交次数
  //2. 根据timestamp判断当天提交了几次questionnaire
  //3.answer/questionnaire提交次数

  // 最外面的object是ueser
  // 第二层的object是questionnaire
  // 最里面的array的object是回答的问题
  // 根据date判断是不是同一天
  // 第一个元素肯定是monday

  // each object is a question,

  // let happiness = [0, 0, 0, 0, 0, 0, 0];

  const [calmness, setcalmness] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [sadness, setsadness] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [anxiety, setanxiety] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [happiness, sethappiness] = useState([0, 0, 0, 0, 0, 0, 0]);
  // this.state = {
  //   test: [1, 2, 2, 4, 5, 3, 3],
  // };
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
        for (let i = 0; i < response.data.answers.length; i++) {
          // This is the questionnaire
          const questionnaire = response.data.answers[i];
          const questions = questionnaire.answers;

          const date = questionnaire.datetime.substring(0, 10);
          const d = new Date(date);
          let day = d.getDay();
          count[day] = count[day] + 1;
          if (day == 0) {
            // add results to the array
            happiness[0] = questions[0].answer;
            calmness[0] = questions[1].answer;
            sadness[0] = questions[2].answer;
            anxiety[0] = questions[3].answer;
          } else if (day == 1) {
            happiness[1] = questions[0].answer;
            calmness[1] = questions[1].answer;
            sadness[1] = questions[2].answer;
            anxiety[1] = questions[3].answer;
          } else if (day == 2) {
            happiness[2] = questions[0].answer;
            calmness[2] = questions[1].answer;
            sadness[2] = questions[2].answer;
            anxiety[2] = questions[3].answer;
          } else if (day == 3) {
            happiness[3] = questions[0].answer;
            calmness[3] = questions[1].answer;
            sadness[3] = questions[2].answer;
            anxiety[3] = questions[3].answer;
          } else if (day == 4) {
            happiness[4] = questions[0].answer;
            calmness[4] = questions[1].answer;
            sadness[4] = questions[2].answer;
            anxiety[4] = questions[3].answer;
          } else if (day == 5) {
            happiness[5] = questions[0].answer;
            calmness[5] = questions[1].answer;
            sadness[5] = questions[2].answer;
            anxiety[5] = questions[3].answer;
          } else if (day == 6) {
            happiness[6] = questions[0].answer;
            calmness[6] = questions[1].answer;
            sadness[6] = questions[2].answer;
            anxiety[6] = questions[3].answer;
          }
        }
        for (let i = 0; i < 7; i++) {
          if (count[i] != 0) {
            happiness[i] = happiness[i] / count[i];
            calmness[i] = calmness[i] / count[i];
            sadness[i] = sadness[i] / count[i];
            anxiety[i] = anxiety[i] / count[i];
          }
        }

        // console.log("hap");
        // console.log(happiness);
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
    yield* [0, 1, 2, 3, 4, 5];
  }

  const sadLabelIterator = sadYLabel();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.TitleText}>Happiness</Text>
        <BarChart
          data={{
            labels: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
            datasets: [
              {
                data: happiness,
              },
            ],
          }}
          fromZero={true}
          showValuesOnTopOfBars={true}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          // yAxisInterval={2} // optional, defaults to 1
          // strokeWidth={10}
          segments={5}
          chartConfig={{
            // backgroundColor: "white",
            fillShadowGradient: "#34A0A4",
            fillShadowGradientOpacity: 1,
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
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
                data: [0, 2, 3, 4, 1, 2, 3],
              },
            ],
          }}
          showValuesOnTopOfBars={true}
          width={Dimensions.get("window").width} // from react-native
          height={220} //adjust the height of the graph
          segments={5}
          chartConfig={{
            fillShadowGradient: "#34A0A4",
            fillShadowGradientOpacity: 1,
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            // backgroundGradientFrom: "#34A0A4",
            // backgroundGradientTo: "#34A0A4",
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
          width={Dimensions.get("window").width} // from react-native
          height={220} //adjust the height of the graph
          segments={5}
          chartConfig={{
            fillShadowGradient: "#34A0A4",
            fillShadowGradientOpacity: 1,
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            //backgroundColor: "#eee",
            // backgroundGradientFrom: "#34A0A4",
            // backgroundGradientTo: "#34A0A4",
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
  // scrollView: {
  //   marginHorizontal: 20,
  // },
});
