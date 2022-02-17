import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LocationScreen from './LocationScreen';
import axios from "axios";
import { ScrollView } from "react-native";


export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        
        <View style={[styles.frameContainer, styles.shadowProp]}>
            <Text style={styles.headTextLeft}>Daily Questionnaire 1/3</Text>
            <TouchableOpacity
              disabled={true}
              style={styles.button}
              onPress={() => navigation.navigate("QuestionnaireScreen")}
              activeOpacity={0.85}
            >
          <Text style={styles.buttonTextWhite}>Start</Text>
          </TouchableOpacity>
          <Text style={styles.blackText}>Available until 12:00 PM</Text>
      </View>
      
      <Text></Text>
      
      <View style={[styles.frameContainer, styles.shadowProp]}>
            <Text style={styles.headTextLeft}>Daily Questionnaire 2/3</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("QuestionnaireScreen")}
              activeOpacity={0.85}
            >
          <Text style={styles.buttonTextWhite}>Start</Text>
          </TouchableOpacity>
          <Text style={styles.blackText}>Available until 6:00 PM</Text>
      </View>
      
      <Text></Text>
      
      <View style={[styles.frameContainer, styles.shadowProp]}>
        <Text style={styles.headTextLeft}>Daily Questionnaire 3/3</Text>    
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("QuestionnaireScreen")}
              activeOpacity={0.85}
            >
          <Text style={styles.buttonTextWhite}>Start</Text>
          </TouchableOpacity>
          <Text style={styles.blackText}>Available until 12:00 AM</Text>
      </View>
      
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: 'bold',
  },
  leftContainer: {
    alignItems: 'flex-start',
    alignContent: 'space-between',
  },
  blackText: {
    fontSize: 14,
    color: "#000000"
  },
  headTextLeft: {
    textAlign: 'left',
    fontSize: 18,
    color: "#000000",
    //paddingLeft: 8,
  },
  headTextRight: {
    textAlign: 'right',
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

