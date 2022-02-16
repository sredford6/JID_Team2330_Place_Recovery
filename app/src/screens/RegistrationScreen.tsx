import React from 'react';
import { ReactDOM } from 'react';
import { StyleSheet, Button, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { useLinkProps } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import OpeningScreen from './OpeningScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import axios from 'axios';

export default function RegistrationScreen({navigation}) {


    const [email, setEmail] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);
    const [showEmailErrorMessage, setShowEmailErrorMessage] = React.useState(false);
    const [error, setError] = React.useState("");

   
    const passwordMatchCheck = ()=> {
      if (firstName == "" || lastName == "" || email == "" || password == "" || confirmPassword == "" || phoneNumber == "") {
        setShowErrorMessage(true);
        setError("*Please fill in all the fields");
      } else if (password == confirmPassword) {
        let emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailValidation.test(email) ) {
          if (password.length >= 6) {
            handleRegistration({firstName, lastName, email, password, phoneNumber});
          } else {
            setShowEmailErrorMessage(true);
            setError("*Password has to contain at least 6 characters");
          }
        } else {
          setShowEmailErrorMessage(true);
          setError("*Please enter valid email");
        } 
        }else {
          setShowEmailErrorMessage(true);
          setError("*Passwords don't match");

      } 
    }

    

  
    
    const handleRegistration = (signUpInput) => {
      
      axios.post('http://localhost:2400/api/auth/signup', signUpInput).then((response) => {
        console.log(response.data);
        const {message} = response.data;
        const { status, data} = response;
        console.log(status);
        if (status == 200) {
          navigation.navigate('MainScreen');
        } 
      })
      .catch((error) => {
        const {message} = error.response.data;
        alert(message);
        console.log(error);
        console.log(error.response.data);
      });
    }
    
    
  return (
    
  <SafeAreaView style={{flex:1, justifyContent:'center'}}>
      <ScrollView contentContainerStyle = {{flexGrow: 1, justifyContent: 'center'}}>
        <KeyboardAvoidingView style={styles.container} behavior = "padding">
        
        <Text style = {styles.title}>Register</Text>
        { showErrorMessage ?  <Text style = {styles.errorMessage}>{error}</Text> : null }

        <TextInput style = {styles.input}
          placeholder = 'First Name'
          maxLength = {15}
          onChangeText={inp => setFirstName(inp)}
          value = {firstName}
        />
        <TextInput style = {styles.input}
          placeholder = 'Last Name'
          maxLength = {20}
          onChangeText={inp => setLastName(inp)}
          value = {lastName}
        />
        <TextInput style = {styles.input}
          placeholder = 'Email'
          autoCapitalize='none'
          autoCorrect={false}
          maxLength = {30}
          onChangeText={inp => setEmail(inp)}
          value = {email}
        />
        

        <TextInput style = {styles.input}
          placeholder = 'Phone Number'
          maxLength = {10}
          keyboardType="numeric"
          onChangeText={inp => setPhoneNumber(inp)}
          value = {phoneNumber}
        />
        <TextInput style = {styles.input}
          placeholder = 'Password'
          autoCapitalize='none'
          autoCorrect={false}
          maxLength = {20}
          onChangeText={inp => setPassword(inp)}
          value = {password}
          secureTextEntry ={true}
        />
        
        
        <TextInput style = {[styles.input, (password == confirmPassword ? styles.input : {borderColor : "red"}  )]}
          placeholder = 'Confirm Password'
          autoCapitalize='none'
          autoCorrect={false}
          maxLength = {20}
          onChangeText={inp => setConfirmPassword(inp)}
          value = {confirmPassword}
          secureTextEntry ={true}
        />
       


        <ButtonDesign name='Register' onPress={() => passwordMatchCheck()}/>
        <Text style = {styles.label}>By registering, you automatically accept the Terms & Policies of Neighborhood app.</Text> 
        
        </KeyboardAvoidingView>
      </ScrollView>
  </SafeAreaView>
  )
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  errorMessage: {
    textAlign: 'center',
   
    marginLeft: 40,
    marginRight: 40,
    color: 'red', 
  },
  
 
  
});

//Potential solutions for form submissions and validations

/* export class UserValidation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      requiredFieldErrorMessage: "",
      passwordErrorMessage: "",
      confirmPasswordErrorMessage: "",
      loading: false,

    }
  }

  // Authenticate User: https://infinitbility.com/how-to-check-password-and-confirm-password-in-react-native

  formValidation = async () => {
    this.setState({loading: true})
    let errorFlag = false

    // Input Validation
    if (this.state.firstName.length == 0) {
      errorFlag: true
      this.setState({})
    }

  }
} */

// Form Validation Tutorial: https://www.youtube.com/watch?v=uxawinQ2tTk
