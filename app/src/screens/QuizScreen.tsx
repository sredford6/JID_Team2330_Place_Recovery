import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import Sliders from "../components/Sliders";
import React, { useEffect, useState } from "react";
import SampleQuestion from "../sample_question.json";

import { Slider, Icon } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

export default function QuizScreen({ navigation }) {
  const { useState } = React;
  const [questions, setQuestions] = useState();
  const [length, setLength] = useState(0);
  const [index, setIndex] = useState(0);
  // const [freeText, setText] = useState("");

  const [user_answers, setMyArray] = useState(new Array<answer_type>(length));

  // var user_answers: answer_type []= new Array<answer_type>(SampleQuestion.length)

  interface answer_type {
    choice_index: Number;
    answer: String;
  }

  const loadQuiz = () => {
    setLength(SampleQuestion.length);
    setIndex(0);
    setQuestions(SampleQuestion);
    // setMyArray(new Array<answer_type>(SampleQuestion.length));

    // console.log(arr);
  };

  const increase = () => {
    // user_answers = []
    if (index < length - 1) {
      setIndex(index + 1);
    }
  };
  const decrease = () => {
    // user_answers = []
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  const renderType0 = (i: number, customArray: null | Array<any> = null) => {
    return (customArray ? customArray : questions[i]["choices"]).map(
      (option, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.optionButton}
          activeOpacity={0.8}
          onPress={() => {
            var temp1: answer_type = {
              choice_index: idx,
              answer: option,
            };

            user_answers[i] = temp1;
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
            var temp1: answer_type = {
              choice_index: questions[i]["choices"].length,
              answer: freeText,
            };
            user_answers[i] = temp1;
            console.log(user_answers);
          }}
        />
      </View>
    );
  };
  const renderType3 = (i: number) => {
    // TODO: replace the code from type0. Need to includes checkboxes
    return questions[i]["choices"].map((option, idx) => (
      <TouchableOpacity
        key={idx}
        style={styles.optionButton}
        onPress={() => {
          var temp: answer_type = {
            choice_index: idx,
            answer: option,
          };
          user_answers[i] = temp;
          console.log(user_answers);
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

  const handleSubmit = () => {
    // TODO handle submit to endpoints
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
