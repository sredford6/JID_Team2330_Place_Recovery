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
  const [questions, setQuestions] = useState();
  const [length, setLength] = useState(0);
  const [index, setIndex] = useState(0);

  var user_answers: answer_type []= new Array<answer_type>(SampleQuestion.length)

  // var c :answer_type = {
  //   type: 1,
  //   answer:"my answers"
  // }
  // user_answers.push(c)
  
  interface answer_type{
    type:Number,
    answer:String
  }
  const loadQuiz = () => {
    setLength(SampleQuestion.length);
    setIndex(0);
    setQuestions(SampleQuestion);
    // console.log(arr);
  };

  const increase = () => {
    user_answers = []
    if (index < length - 1) {
      setIndex(index + 1);
    }
  };
  const decrease = () => {
    user_answers = []
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  const renderType0 = (i: number) => {
    return questions[i]["choices"].map((option, idx) => (
      <TouchableOpacity 
      key={idx} 
      style={styles.optionButton}
      onPress={() => {
        var temp :answer_type = {
          type: i,
          answer:option
        }
        user_answers[i] = temp
        console.log(user_answers);
        console.log("here");
      }}
      >
        <Text style={styles.buttonText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  const renderType1 = (i: number) => {
    return <Sliders />;
  };
  const renderType2 = (i: number) => {
    let choices = renderType0(i);
    return (
      <View>
        {renderType0(i)}
        <TextInput style={styles.input} placeholder="other:" />
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

        var temp :answer_type = {
          type: idx,
          answer:option
        }
        user_answers[i]=temp;
        console.log(user_answers);
        console.log(idx);
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
        console.log("type 0"); // multiple choice with single answer
        return renderType0(i);
      case 1:
        console.log("type 1"); // scale question, from 1-5, continuous value, sliders
        return renderType1(i);
      case 2:
        console.log("type 2"); // multiple choice with single answer that has additional free text box as last option
        return renderType2(i);
      case 3:
        console.log("type 3"); // multiple choices
        return renderType3(i);
      default:
        console.log("unable to parse type");
    }

    return null;
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
            <TouchableOpacity style={styles.button}
             onPress={
               increase
              }
             >
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>END</Text>
            </TouchableOpacity>
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
