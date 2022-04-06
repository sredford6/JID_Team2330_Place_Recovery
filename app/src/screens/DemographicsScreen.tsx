import React from 'react';
import {Button, Platform, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Alert, Dimensions } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import {backendUrl} from "../config/config.json";

import { AuthContext } from "../navigation/context";

import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { useRef } from 'react';
import MultiSelect from 'react-native-multiple-select';

import DropDownPicker from 'react-native-dropdown-picker';



export default function Demographics({ navigation }) {
    const [selectEducation, setSelectedEducation] = React.useState();
   
    const [occupation, setOccupation] = React.useState();
    const [address, setAddress] = React.useState();
    const [city, setCity] = React.useState();
    const [state, setState] = React.useState();
    const [zip, setZip] = React.useState();
   
    const [opIllness, setOpenIllness] = React.useState(false);
    const [illnessValue, setIllnessValue] = React.useState([]);
    const [illness, setIllness] = React.useState([
    {label: 'Depression', value: 'Depression'},
    {label: 'Schizophrenia', value: 'Schizophrenia'},
    {label: 'Bipolar Disorder', value: 'Bipolar Disorder'},
    {label: 'Schizoaffective Disorder ', value: 'Schizoaffective Disorder '},
    {label: 'Anxiety', value: 'Anxiety'},
    {label: 'OCD', value: 'OCD'},
    {label: 'PTSD', value: 'PTSD'},
    {label: 'Other', value: 'Other'}

  ]);
  const [educationOp, setOpenEducation] = React.useState(false);
  const [educationValue, setEducationValue] = React.useState([]);
  const [education, setEducation] = React.useState([
  {label: 'Less than High School', value: 'Less than High School'},
  {label: 'High School Graduate', value: 'High School Graduate'},
  {label: 'Vocational/Trade/Technical School ', value: 'Vocational/Trade/Technical School '},
  {label: 'Some College', value: 'Some College'},
  {label: "Bachelor's Degree", value: "Bachelor's Degree"},
  {label: 'Advanced Degree', value: 'Advanced Degree'},

]);

  const [movedOp, setOpenMoved] = React.useState(false);
  const [movedValue, setMovedValue] = React.useState([]);
  const [moved, setMoved] = React.useState([
  {label: '0', value: '0'},
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: "4", value: "4"},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {label: '7', value: '7'},
  {label: '8', value: '8'},
  {label: '9+', value: '9+'},

]);

    const [opPersonalIllness, setopenPersonalIllness] = React.useState(false);
    const [personalIlValue, setPersonalIlValue] = React.useState([]);
    const [personalIl, setPersonallIl] = React.useState([
    {label: 'Depression', value: 'Depression'},
    {label: 'Schizophrenia', value: 'Schizophrenia'},
    {label: 'Bipolar Disorder', value: 'Bipolar Disorder'},
    {label: 'Schizoaffective Disorder ', value: 'Schizoaffective Disorder '},
    {label: 'Anxiety', value: 'Anxiety'},
    {label: 'OCD', value: 'OCD'},
    {label: 'PTSD', value: 'PTSD'},
    {label: 'Other', value: 'Other'}

  ]);
   
   
  
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#FFFFFF99" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style = {styles.title}> Demographics </Text>

        <Text style = {styles.label}>Education:</Text>

        <DropDownPicker
      open={educationOp}
      setOpen={setOpenEducation}
      value={educationValue}
      setValue={setEducationValue}
      items={education}
      setItems={setEducation}
    />
        
        <Text style = {styles.label}>Occupation:</Text>
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
        <Text style = {styles.label}>Address:</Text>
        <TextInput
            style={styles.input}
            placeholder="Address Line 1"
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
            maxLength={5}
            keyboardType="numeric"
            onChangeText={(inp) => setZip(inp)}
            value={zip}
            secureTextEntry={true}
          />
          <Text style = {styles.label}>Number of times participant moved from ages 12-18 </Text>
          <DropDownPicker
      open={movedOp}
      setOpen={setOpenMoved}
      value={movedValue}
      setValue={setMovedValue}
      items={moved}
      setItems={setMoved}
    />
      <Text style = {styles.label}>Family history of mental illness </Text>
     <DropDownPicker
      open={opIllness}
      setOpen={setOpenIllness}
      value={illnessValue}
      setValue={setIllnessValue}
      items={illness}
      setItems={setIllness}
      multiple={true}
      min={0}
    />
    <Text style = {styles.label}>Personal history of mental illness </Text>
    <DropDownPicker
      open={opPersonalIllness}
      setOpen={setopenPersonalIllness}
      value={personalIlValue}
      setValue={setPersonalIlValue}
      items={personalIl}
      setItems={setPersonallIl}
      multiple={true}
      min={0}
    />
     <ButtonDesign name="Submit" 
     onPress={null} 
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
    fontSize: 25,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#072B4F'
  },
  input: { 
      height: 45,
      width: Dimensions.get('window').width,
      marginBottom: 5,
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
    fontSize: 18,
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
