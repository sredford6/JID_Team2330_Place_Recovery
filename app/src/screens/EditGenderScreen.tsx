import React from 'react';
import { StyleSheet, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';

import {backendUrl} from "../config/config.json";

import axios from 'axios';



export default function EditGenderScreen({navigation}) {
    const [gender, setGender] = React.useState();
    
    
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={styles.title}>Gender</Text>

          <Picker style ={{width: 400, height: 200, marginTop: -41}}
        selectedValue={gender}
        
    onValueChange={(gender, itemIndex) =>
      setGender(gender)
  }>
  <Picker.Item label="Male" value="Male" />
  <Picker.Item label="Female" value="Female" />
  <Picker.Item label="Other" value="Other" />
  <Picker.Item label="Prefer Not to Say" value= "Prefer Not to Say" />
 

</Picker>

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
