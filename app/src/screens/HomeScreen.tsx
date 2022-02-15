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
<ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
    
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40,
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('QuestionnaireScreen')}
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
});

