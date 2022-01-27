import React from 'react';
import { StyleSheet, Button, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert, Linking } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { Link, NavigationContainer, StackRouter, useLinkProps } from '@react-navigation/native';
//import {StackNavigator,} from 'react-navigation';
import Navigation from '../navigation';
import HomeScreen from './HomeScreen';
import linking from '../navigation/LinkingConfiguration';
//import { useNavigation } from '@react-navigation/native';


export default function RegistrationScreen() {
    //const navigation = useNavigation();

    const [email, setEmail] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
  return (
  
    <KeyboardAvoidingView style={styles.container} behavior = "padding">
 
      <Text style = {styles.title}>Register</Text>
      
    <TextInput style = {styles.input}
       placeholder = 'First Name'
       maxLength = {15}
       onChangeText={inp => setFirstName(inp)}
    />
    <TextInput style = {styles.input}
       placeholder = 'Last Name'
       maxLength = {20}
       onChangeText={inp => setLastName(inp)}
    />
    <TextInput style = {styles.input}
       placeholder = 'Email'
       maxLength = {40}
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
    <ButtonDesign name='Register' onPress={() => Alert.alert('Successfully registered') }/>
    <Text style = {styles.label}>By registering, you automatically accept the Terms & Policies of Neighborhood app.</Text> 
    
  
    </KeyboardAvoidingView>
   
  );
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

