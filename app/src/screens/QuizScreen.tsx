import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
//import { TouchableOpacity } from "react-native-web";

export default function QuizScreen({ navigation }) {
  const [question, setQuestion] = useState();
  // 0 is the question number
  const [answers, setAnswers] = useState([]);
  const getQuiz = async () => {
    // fetch data from the url
    const url = "https://opentdb.com/api.php?amount=10&type=multiple";
    const res = await fetch(url);
    // return an array which contains result
    const data = await res.json();

    console.log(data.results[0]);
    /*
      "category": "Entertainment: Books",
    "correct_answer": "Rudyard Kipling",
    "difficulty": "hard",
    "incorrect_answers": Array [
      "Edgar Allan Poe",
      "William Shakespeare",
      "William Wordsworth",
    ],
    "question": "Which author and poet famously wrote the line, &quot;The female of the species is more deadly than the male&quot;?",
    "type": "multiple",
    */
    setQuestion(data.results[0]["question"]);
    console.log(data.results[0]["question"]);
    setAnswers(data.results[0]["incorrect_answers"]);
    console.log(data.results[0]["incorrect_answers"].length);
    //put results into the question
  };
  useEffect(() => {
    getQuiz();
  }, []);
  return (
    <View style={styles.container}>
      {/* If "question" is not null, execute this part of code */}
      {/* Those are buttons and questions */}
      {question && (
        <ScrollView contentContainerStyle={styles.parent}>
          <View style={styles.top}>
            <Text style={styles.question}>Q. {question}</Text>
          </View>
          <View style={styles.options}>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.option}>Cool Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.option}>Cool Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.option}> Cool Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.option}>Cool Option 1</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>END</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate("Result")}>
          <Text>END</Text>
        </TouchableOpacity> */}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: "100%",
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  button: {
    backgroundColor: "#184E77",
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  question: {
    fontSize: 28,
  },
  option: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  optionButton: {
    paddingVertical: 12,
    marginVertical: 12,
    backgroundColor: "#34A0A4",
    // 让内容往水平缩进
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  parent: {
    height: "100%",
  },
});
