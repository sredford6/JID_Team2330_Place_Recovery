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
import React, { useEffect, useState } from "react";
import { convertTime, formatDate } from "../components/Helpers";

export default function ProgressScreen() {
  // axios.get("https://example.com/getSomething", {
  //   headers: {
  //     Authorization: token, //the token is a variable which holds the token
  //   },
  // });

  // const getResult = async () => {
  //   try {

  //     await axios
  //       .get(`${backendUrl}/api/question/answer/thisweek`)
  //       .then((result) => {
  //         const sampleQuestions = res.data;
  //       });

  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // state = {
  //   resultForHappy: null,
  // };

  const [answers, setAnswers] = useState<any>();

  const getResult = async () => {
    const token: string = (await getItemAsync("user_token"))!;
    try {
      let response = await axios.get(
        `${backendUrl}/api/question/answer/thisweek`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status == 200) {
        console.log(response.data.answers.length);
        setAnswers(response.data.answers);
        return response.data.answers;
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  const analyzeAnswer = (answers: any) => {
    if (answers) {
      let i = 0;
      let json = {};
      for (; i < answers.length; ++i) {
        console.log(formatDate(new Date(answers[i].datetime)));

        console.log(answers[i].answers[0].choiceIndex + 1);
      }
    }
  };

  useEffect(() => {
    (async () => {
      let answer = await getResult();
      analyzeAnswer(answer);
    })();
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
            labels: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
            datasets: [
              {
                data: [0, 0, 1, 0, 0, 0, 5],
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
            labels: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
            datasets: [
              {
                data: [0, 0, 1, 3, 4, 0, 5],
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
            labels: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
            datasets: [
              {
                data: [0, 0, 1, 0, 0, 0, 5],
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
