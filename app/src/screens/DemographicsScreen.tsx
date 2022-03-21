import React from 'react';
import {Button, Platform, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import {backendUrl} from "../config/config.json";

import { AuthContext } from "../navigation/context";

import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { useRef } from 'react';


export default function DemographicsScreen({ navigation }) {
    const [selectEducation, setSelectedEducation] = React.useState();
    const [occupation, setOccupation] = React.useState();
    const [address, setAddress] = React.useState();
    const [city, setCity] = React.useState();
    const [state, setState] = React.useState();
    const [zip, setZip] = React.useState();
    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }
  
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text>Education:</Text>
        <Picker style ={{width: 400}}
        ref={pickerRef}
        selectedValue={selectEducation}
        onValueChange={(selectedChoice, index) =>
            setSelectedEducation(selectedChoice)
        }>
        <Picker.Item label="Less than high school" value="lths" />
        <Picker.Item label="High school graduate" value="hsg" />
        <Picker.Item label="Vocational/Trade/Technical School" value="vstts" />
        <Picker.Item label="Some college" value="sc" />
        <Picker.Item label="Bachelor’s degree" value="bs" />
        <Picker.Item label="Advanced degree " value="ad" />
        </Picker>
        <Text>Occupation</Text>
        <TextInput
            style={styles.input}
            placeholder="Occupation"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setOccupation(inp)}
            value={occupation}
            secureTextEntry={true}
          />
        <Text>Address:</Text>
        <TextInput
            style={styles.input}
            placeholder="Address 1"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setAddress(inp)}
            value={address}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setCity(inp)}
            value={city}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setState(inp)}
            value={state}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Zip code"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setZip(inp)}
            value={zip}
            secureTextEntry={true}
          />

        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  password: {
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
    color: '#072B4F',
  },
  title: {
    fontSize: 30,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#072B4F'
  },
  input: { 
      height: 45,
      width: 290,
      margin: 15,
      paddingLeft: 10,
      borderWidth: 1,
      borderRadius: 10,
      fontSize: 18,
      borderColor: '#072B4F'
  },
  label: {
    textAlign: 'center',
    margin: 20,
    marginLeft: 40,
    marginRight: 40,
    color: '#072B4F', 
  },
  textName: {
    textAlign: 'center',
    margin: 20,
    marginLeft: 40,
    marginRight: 40,
    color: '#072B4F', 
    fontSize: 18,
  },
  header: {
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    color: '#072B4F', 
    fontWeight: 'bold',
    fontSize: 23,
  },
  errorMessage: {
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
    color: 'red', 
    fontSize: 18,
  },
});
