import React from 'react';
import { ReactDOM } from 'react';
import { StyleSheet, Button, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { useLinkProps } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import OpeningScreen from './OpeningScreen';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function RegistrationScreen({navigation}) {
    const [email, setEmail] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
   
  return (
  <SafeAreaView style={{flex:1, justifyContent:'center'}}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior = "padding">
    
        <Text style = {styles.title}>Register</Text>
          
        <TextInput style = {styles.input}
          placeholder = 'First Name'
          maxLength = {15}
          onChangeText={firstName => setFirstName(firstName)}
        />
        <TextInput style = {styles.input}
          placeholder = 'Last Name'
          maxLength = {20}
          onChangeText={inp => setLastName(inp)}
        />
        <TextInput style = {styles.input}
          placeholder = 'Email'
          maxLength = {30}
          onChangeText={inp => setEmail(inp)}
        />

        <TextInput style = {styles.input}
          placeholder = 'Password'
          maxLength = {20}
          onChangeText={inp => setPassword(inp)}
          secureTextEntry ={true}
        />
        
        <TextInput style = {styles.input}
          placeholder = 'Confirm Password'
          maxLength = {20}
          onChangeText={inp => setConfirmPassword(inp)}
          secureTextEntry ={true}
        />

        <ButtonDesign name='Register' onPress={() => navigation.navigate('Home')}/>
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
