import React from 'react';
import { ReactDOM } from 'react';
import { StyleSheet, Button, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { useLinkProps } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import OpeningScreen from './OpeningScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

import axios from 'axios';



export default function EmailVerificationScreen({navigation}) {
    const[email, setEmail] = React.useState("");
    const[message, setMessage] = React.useState("");
    const[showMessage, setShowMessage] = React.useState(false);
    


    const handleEmailVerification = (email: string) => {
  
      axios
        .get("http://localhost:2400/api/auth/get-reset", {params: {email}})
        .then((response) => {
          
          const { message } = response.data;
          const { status, data } = response;
          console.log(response);
          if (status == 200) {
            //emailSet = email;
            navigation.navigate("VerificationScreen", {email})
          } else {
            
            console.log(response);
          }
           
        })
        .catch((error) => {
        
          setShowMessage(true);
          setMessage("We did not find the email in the system");
         
        });
    };
    

  return (
    
  <SafeAreaView style={{flex:1, justifyContent:'center'}}>
      <ScrollView contentContainerStyle = {{flexGrow: 1, justifyContent: 'center'}}>
        <KeyboardAvoidingView style={styles.container} behavior = "padding">
    
        <Text style = {styles.title}>Verification</Text>
       
        <Text style = {styles.label}>Please enter your email</Text>
        <TextInput style = {styles.input}
          placeholder = 'Email'
          maxLength = {30}
          onChangeText={inp => setEmail(inp)}
        
        />
         
         { showMessage ?  <Text style = {styles.message}>{message}</Text> : null }
        

        <ButtonDesign name='Next' onPress={() => handleEmailVerification(email)}/>
       
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
  message: {
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
    color: 'red', 
  }
 
  
});
