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
    
            <View style={[styles.frameContainer, styles.shadowProp]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("QuestionnaireScreen")}
                activeOpacity={0.85}
              >
                <Text style={styles.buttonTextWhite}>Start Questionnaire</Text>
              </TouchableOpacity>
            </View>
            
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  frameContainer: {
    width: "80%",
    flex: 0.2,
    backgroundColor: "#FFFFFF99",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 1,
    paddingVertical: 1,
    borderRadius: 16,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  }
});

