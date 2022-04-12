import React from 'react';
import { StyleSheet, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

import {backendUrl} from "../config/config.json";

import axios from 'axios';



export default function EditPhoneNumberScreen({navigation}) {
    const[phoneNumber, setPhoneNumber] = React.useState();
    
    



  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={styles.title}> Phone Number</Text>

          <Text style={styles.label}>Please enter your new phone number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            maxLength={10}
            keyboardType="numeric"
            autoCapitalize="none"
            onChangeText={(inp) => setPhoneNumber(phoneNumber)}
          />
          <ButtonDesign
            name="Edit"
            onPress={() => { 
              {
                navigation.navigate("Profile");
              }
            }}
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
