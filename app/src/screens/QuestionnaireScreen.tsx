import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import Sliders from "../components/Sliders";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";

import { Slider, Icon } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

export default function Questionnaire({ navigation }) {
  const { useState } = React;
  const [questions, setQuestions] = useState();
  const [length, setLength] = useState(0);
  const [index, setIndex] = useState(-1);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [buttonPressed, setButtonPressed] = useState(
    Array.from({ length: 20 }, (i) => false)
  );
  const questionnaire = "sampleq1";

  const [user_answers, setUserAnswers]: [answer_type[], Function] = useState(
    []
  );

  interface answer_type {
    choiceIndex: Number | Array<number>;
    answer: String | number | Array<String> | Array<number>;
    questionId: String;
  }

  const buttonFunction = (index) => {
    setButtonPressed((arr) =>
      arr.map((buttonPressed, i) =>
        i == index ? !buttonPressed : buttonPressed
      )
    );
    setButtonPressed((arr) =>
      arr.map((buttonPressed, i) =>
        i != prevIndex ? buttonPressed : !buttonPressed
      )
    );
    setPrevIndex(index);
    console.log(index);
  };
  const loadQuiz = async () => {
    await axios
      .get(`http://localhost:2400/api/question/${questionnaire}.json`)
      .then((res) => {
        const sampleQuestions = res.data;
        setLength(sampleQuestions.length);
        setIndex(0);
        setQuestions(sampleQuestions);
        let arr = [];
        for (let i = 0; i < sampleQuestions.length; i++) {
          let mc = sampleQuestions[i]["type"] == 3 ? true : false;
          let value: answer_type = {
            choiceIndex: mc ? [] : -1,
            answer: mc ? [] : "",
            questionId: sampleQuestions[i]["id"],
          };
          arr.push(value);
        }
        setUserAnswers(arr);
      });
  };

  const increase = () => {
    if (index < length - 1) {
      setIndex(index + 1);
    }
    setPrevIndex(-1);
    setButtonPressed((arr) =>
      arr.map((buttonPressed, i) => (buttonPressed = false))
    );
  };

  const decrease = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
    setPrevIndex(-1);
    setButtonPressed((arr) =>
      arr.map((buttonPressed, i) => (buttonPressed = false))
    );
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  const renderType0 = (i: number, customArray: null | Array<any> = null) => {
    return (customArray ? customArray : questions[i]["choices"]).map(
      (option, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.optionButton,
            buttonPressed[idx] == true
              ? { backgroundColor: "#184E77" }
              : styles.optionButton,
          ]}
          activeOpacity={0.8}
          onPress={() => {
            buttonFunction(idx);
            // https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks
            let temp_answers = user_answers;
            temp_answers[i].answer = option;
            temp_answers[i].choiceIndex = idx;
            setUserAnswers(temp_answers);
            console.log(user_answers);
          }}
        >
          <Text style={styles.buttonText}>{option}</Text>
        </TouchableOpacity>
      )
    );
  };

  const renderType1 = (i: number) => {
    let scales = [...Array(5).keys()].map((i) => i + 1);
    return renderType0(i, scales);
    // return <Sliders />;
  };
  const renderType2 = (i: number) => {
    return (
      <View>
        {renderType0(i)}
        <TextInput
          style={styles.input}
          placeholder="other:"
          onChangeText={(freeText) => {
            let temp_answers = user_answers;
            temp_answers[i].answer = freeText;
            temp_answers[i].choiceIndex = questions[i]["choices"].length;
            setUserAnswers(temp_answers);

            console.log(user_answers);
          }}
        />
      </View>
    );
  };
  const renderType3 = (i: number) => {
    return questions[i]["choices"].map((option, idx) => (
      <TouchableOpacity
        key={idx}
        style={[
          styles.optionButton,
          buttonPressed[idx] == true
            ? { backgroundColor: "#184E77" }
            : styles.optionButton,
        ]}
        onPress={() => {
          let temp_answers = user_answers;
          temp_answers[i].answer.push(option);
          temp_answers[i].choiceIndex.push(idx);
          setUserAnswers(temp_answers);
          console.log(user_answers);
          buttonFunction(idx);
        }}
      >
        <Text style={styles.buttonText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  const renderQuestionList = (i: number) => {
    let type = questions[i]["type"];
    switch (type) {
      case 0:
        // console.log("type 0"); // multiple choice with single answer
        return renderType0(i);
      case 1:
        // console.log("type 1"); // scale question, from 1-5, continuous value, sliders
        return renderType1(i);
      case 2:
        // console.log("type 2"); // multiple choice with single answer that has additional free text box as last option
        return renderType2(i);
      case 3:
        // console.log("type 3"); // multiple choices
        return renderType3(i);
      default:
        console.log("unable to parse type");
    }

    return null;
  };

  const renderSubmit = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    );
  };

  const handleSubmit = async () => {
    // TODO handle submit to endpoints
    try {
      const token: string = (await getItemAsync("user_token"))!;
      const res = await axios.post(
        `http://localhost:2400/api/question/answer`,
        {
          questionnaire,
          answers: user_answers,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
    } catch (error: any) {
      console.error(error);
    }
    console.log("submit");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {/* If "question" is not null, execute this part of code */}
      {/* Those are buttons and questions */}
      {questions && (
        <View style={styles.parent}>
          <View style={styles.top}>
            <Text style={styles.question}>
              Q{index + 1}. {questions[index]["question"]}
            </Text>
          </View>

          <ScrollView>
            <View>{renderQuestionList(index)}</View>
          </ScrollView>

          <View style={styles.bottom}>
            <TouchableOpacity style={styles.button} onPress={decrease}>
              <Text style={styles.buttonText}>PREVIOUS</Text>
            </TouchableOpacity>
            {index == length - 1 ? null : (
              <TouchableOpacity style={styles.button} onPress={increase}>
                <Text style={styles.buttonText}>NEXT</Text>
              </TouchableOpacity>
            )}
            {index == length - 1 ? renderSubmit() : null}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  bottom: {
    marginBottom: 5,
    paddingVertical: 5,
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
    fontSize: 15,
    color: "white",
  },
  question: {
    fontSize: 20,
  },
  option: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  optionButton: {
    width: "100%",
    height: 50,
    paddingVertical: 8,
    marginVertical: 8,
    backgroundColor: "#34A0A4",
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: "center",
  },
  parent: {
    height: "100%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
