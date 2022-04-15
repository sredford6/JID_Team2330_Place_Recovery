import React from 'react';
import {Button, Platform, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import {backendUrl} from "../config/config.json";
import TermsAndConditions from "../screens/TermsAndConditionsScreen";

import { AuthContext } from "../navigation/context";

import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';
import {CheckBox} from "react-native-elements"

export default function RegistrationScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [gender, setGender] = React.useState('');


  const [Asian, setAsian] = React.useState(false);
  const [Black, setBlack] = React.useState(false);
  const [Native, setNative] = React.useState(false);
  const [White, setWhite] = React.useState(false);
  const [Other, setOther] = React.useState(false);
  const [Prefer, setPrefer] = React.useState(false);

  const race: string[] = [];
  const addRace = (arrayName, condition, raceName) => {
    if (condition) {
      arrayName.push(raceName);
    }
  }

  const check = () => {
    addRace(race, Asian, 'Asian or Pacific Islander')
    addRace(race, Black, 'Black or African American')
    addRace(race, Native, 'Native American or Alaskan Native')
    addRace(race, White, 'White or Caucasian')
    addRace(race, Other, 'Other')
    addRace(race, Prefer, 'Prefer not to say')
  }



  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [showEmailErrorMessage, setShowEmailErrorMessage] =
    React.useState(false);
  const [error, setError] = React.useState("");

  const { authFunctions } = React.useContext(AuthContext);
  const { signIn } = authFunctions;
  const [birthday, setBirthday] = React.useState(new Date(1598051730000));
  const [sleepTime, setSleepTime] = React.useState(new Date(1598051730000));
  const [wakeTime, setWakeTime] = React.useState(new Date(1598051730000));


  const changeBirthday = (event, newDate) =>
  {
    setBirthday(newDate);
  };

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
      confirmPassword == "" 
    ) {
      setShowErrorMessage(true);
      setError("*Please fill in all required fields");
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
            address, 
            city,
            state,
            zip,
            gender,
            race,
            birthday,
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
          <Text style = {styles.password}>*Password must be more than 6 characters long and must contain at least one number</Text>
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
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            maxLength={10}
            keyboardType="numeric"
            onChangeText={(inp) => setPhoneNumber(inp)}
            value={phoneNumber}
          />

<Text style = {styles.label}>Address</Text>
        <TextInput
            style={styles.input}
            placeholder="Address Line 1"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setAddress(inp)}
            value={address}
            
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setCity(inp)}
            value={city}
            
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setState(inp)}
            value={state}
         
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
           
          />

        <Text style = {styles.label}>Date of Birth</Text>
        <DateTimePicker style ={{width: 130, backgroundColor: "transparent"}}
          value={birthday}
          mode={'date'}
          is24Hour={false}
          display="default"
          onChange={changeBirthday}
        />

        <Text style = {styles.label}>Gender</Text>

        <Picker style ={{width: 400, height: 200, marginTop: -51}}
        selectedValue={gender}

        onValueChange={(gen, itemIndex) =>
        setGender(gen)
        }>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Other" value="Other" />
        <Picker.Item label="Prefer not to say" value="Prefer not to say" />
        </Picker>

          
          <Text style = {styles.label}>Race/Ethnicity</Text>
          
          <CheckBox 
          title = "Asian or Pacific Islander"
          checked = {Asian}
          onPress = {() => setAsian(!Asian)}/>

          <CheckBox
          title = "Black or African American"
          checked = {Black}
          onPress = {() => setBlack(!Black)}/>

          <CheckBox  
          title = "Native American or Alaskan Native"
          checked = {Native}
          onPress = {() => setNative(!Native)}/>

          <CheckBox 
          title = "White or Caucasian"
          checked = {White}
          onPress = {() => setWhite(!White)}/>

          <CheckBox 
          title = "Other"
          checked = {Other}
          onPress = {() => setOther(!Other)}/>

          <CheckBox 
          title = "Prefer not to say"
          checked = {Prefer}
          onPress = {() => setPrefer(!Prefer)}/>


          
          <Text style = {styles.header}> Sleep Schedule</Text>
          <Text style = {styles.textName}> Wake-up time:</Text>
        <DateTimePicker style ={{width: 100, backgroundColor: "transparent"}}
          value={wakeTime}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={changeWakeupTime}
        />
          <Text style = {styles.textName}> Bedtime:</Text>
        <DateTimePicker style ={{width: 100, backgroundColor: "transparent"}}
          value={sleepTime}
          mode={'time'}
          is24Hour={true}
          display="default" 
          onChange={changeTime}
        />
        
      
          <ButtonDesign name="Register" 
          onPress={() => {
            passwordMatchCheck()
            check()
            console.log(race)
            } 
            } 
            />
          
          <Text style={styles.label}>
            By registering, you automatically accept the Terms and Conditions of
            PlaceNrecovery.
          </Text>
         
          <TouchableOpacity
                style={styles.buttonSmall}
                onPress={() => {
                  navigation.navigate("TermsAndConditions");
                }}
                activeOpacity={0.85}
              >
          <Text style={styles.buttonTextSmall}>View Terms and Conditions</Text>
          </TouchableOpacity>
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
  button: {
    width: 250,
    height: 45,
    backgroundColor: "#072B4F",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 5,
  },
  buttonSmall: {
    width: 250,
    height: 45,
    backgroundColor: "#C4C4C4",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 5,
  },
  buttonTextWhite: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTextSmall: {
    textAlign: "center",
    color: "#072B4F",
    fontSize: 14,
    fontWeight: "bold",
  }
});
