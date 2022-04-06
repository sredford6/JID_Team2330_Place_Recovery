import React from 'react';
import {Button, Platform, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import {backendUrl} from "../config/config.json";

import { AuthContext } from "../navigation/context";

import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegistrationScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [showEmailErrorMessage, setShowEmailErrorMessage] =
    React.useState(false);
  const [error, setError] = React.useState("");

  const { authFunctions } = React.useContext(AuthContext);
  const { signIn } = authFunctions;
  const [sleepTime, setSleepTime] = React.useState(new Date(1598051730000));
  const [wakeTime, setWakeTime] = React.useState(new Date(1598051730000));

  const changeTime = (event, newTime) => {
    setSleepTime(newTime);
  };
  const changeWakeupTime = (event, newTime) => {
    setWakeTime(newTime);
  };
  
  const passwordMatchCheck = () => {
    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      password == "" ||
      confirmPassword == "" ||
      phoneNumber == ""
    ) {
      setShowErrorMessage(true);
      setError("*Please fill in all the fields");
    } else if (password == confirmPassword) {
     const emailValidation =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailValidation.test(email)) {
        if (password.length >= 6) {
          handleRegistration({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            wakeTime,
            sleepTime,

          });
        } else {
          setShowEmailErrorMessage(true);
          setError("*Password has to contain at least 6 characters");
        }
      } else {
        setShowEmailErrorMessage(true);
        setError("*Please enter valid email");
      }
    } else {
      setShowEmailErrorMessage(true);
      setError("*Passwords don't match");
    }
  };

  const handleRegistration = (signUpInput) => {
    axios
      .post(`${backendUrl}/api/auth/signup`, signUpInput)
      .then((response) => {
        console.log(response.data);
        const { message } = response.data;
        const { status, data } = response;
        console.log(status);
        if (status == 200) {
          signIn(data.token);
        }
      })
      .catch((error) => {
        if (error.message == "Network Error") {
          Alert.alert(error.message);
        } else {
          Alert.alert(error.response.data.message);
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={styles.title}>Register</Text>
          {showErrorMessage ? (
            <Text style={styles.errorMessage}>{error}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="First Name"
            maxLength={15}
            onChangeText={(inp) => setFirstName(inp)}
            value={firstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            maxLength={20}
            onChangeText={(inp) => setLastName(inp)}
            value={lastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={30}
            onChangeText={(inp) => setEmail(inp)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            maxLength={10}
            keyboardType="numeric"
            onChangeText={(inp) => setPhoneNumber(inp)}
            value={phoneNumber}
          />
          <Text style = {styles.password}>*Password has to be more than 6 characters long and contain at least one number</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setPassword(inp)}
            value={password}
            secureTextEntry={true}
          />

          <TextInput
            style={[
              styles.input,
              password == confirmPassword
                ? styles.input
                : { borderColor: "red" },
            ]}
            placeholder="Confirm Password"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setConfirmPassword(inp)}
            value={confirmPassword}
            secureTextEntry={true}
          />
          <Text style = {styles.header}> Sleep Schedule</Text>
          <Text style = {styles.textName}> Bedtime:</Text>
        <DateTimePicker style ={{width: 100, backgroundColor: "transparent"}}
          value={sleepTime}
          mode={'time'}
          is24Hour={true}
          display="default" 
          onChange={changeTime}
        />
        <Text style = {styles.textName}> Wake-up time:</Text>
        <DateTimePicker style ={{width: 100, backgroundColor: "transparent"}}
          value={wakeTime}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={changeWakeupTime}
        />
      
          <ButtonDesign name="Register" onPress={() => passwordMatchCheck()} />
          <Text style={styles.label}>
            By registering, you automatically accept the Terms & Policies of
            Neighborhood app.
          </Text>
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
