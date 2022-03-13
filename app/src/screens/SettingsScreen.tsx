import { StyleSheet, Button } from "react-native";

import { ScrollView, Text, View, Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

export default function SettingsScreen() {
  function* hapYLabel() {
    yield* [0, 1, 2, 3, 4, 5];
  }
  //These functions are used to set values in y axis. I do not know
  // why it works but it works (✿◡‿◡)
  const hapyLabelIterator = hapYLabel();

  function* claimYLabel() {
    yield* [0, 1, 2, 3, 4, 5];
  }

  const clayLabelIterator = claimYLabel();

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
          width={Dimensions.get("window").width } // from react-native
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
            formatYLabel: () => clayLabelIterator.next().value,
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
