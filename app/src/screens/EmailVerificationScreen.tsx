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


export default function EmailVerificationScreen({navigation}) {
    const [email, setEmail] = React.useState("");
    

  return (
    
  <SafeAreaView style={{flex:1, justifyContent:'center'}}>
      <ScrollView contentContainerStyle = {{flexGrow: 1, justifyContent: 'center'}}>
        <KeyboardAvoidingView style={styles.container} behavior = "padding">
    
        <Text style = {styles.title}>Verification</Text>
        <Text style = {styles.label}>Please enter your email</Text>
        <TextInput style = {styles.input}
          placeholder = 'Email'
          maxLength = {15}
          onChangeText={inp => setEmail(inp)}
        
        />
       
        

        <ButtonDesign name='Next' onPress={() => navigation.navigate("VerificationScreen")}/>
       
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