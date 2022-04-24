import { StyleSheet, Button, ScrollView, ImageBackground } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from "../components/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../navigation/context";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {backendUrl} from "../config/config.json";
import { getItemAsync } from 'expo-secure-store';

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const { authFunctions, userInfo } = React.useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("")
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [race, setRace] = React.useState("");



  const { signOut } = authFunctions;
  const handleSignOut = () => {
    // if (testmode) {
    //   signOut();
    //   return;
    // }
    console.log("logging out");
    signOut();
  };

  const getUserInformation = async () => {
      
    const token: string = (await getItemAsync("user_token"))!;
    const userInfo = axios
      .get(`${backendUrl}/api/auth/user`, 
      {
        headers: {
          authorization: token,
        }
      })
      .then((response) => {
        
        //console.log();
  
        setPhoneNumber(response.data.phoneNumber)
        
        
        setAddress(response.data.address)
        setCity(response.data.city)
        setZip(response.data.zip)
        setState(response.data.state)
        setRace(response.data.race)
        setGender(response.data.gender)
       
        const { message } = response.data;
        const { status, data } = response;
        
      })
      .catch((error) => {
        console.log(error.message)
        console.log(error.data)
      });
  };
 
  useEffect(() => {
    const interval=setInterval(()=>{
      getUserInformation()
     },2000)
       
       
     return()=>clearInterval(interval)
  }, []);

  // console.log(firstName);
  return (
    
    <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
    <View style={styles.container}>
      
  
       <Text style = {styles.account}>Account Information</Text>
       
       <TouchableOpacity
                style={styles.buttonStyle}
                //onPress={() => null}
                activeOpacity={0.85}
              >
               
      <Text style={styles.label}> Name: <Text style={styles.info}>{userInfo.firstName} {userInfo.lastName}</Text> </Text>
      
      </TouchableOpacity>

      <TouchableOpacity
                style={styles.buttonStyle}
                //onPress={}
                activeOpacity={0.85}
              >
               
      <Text style={styles.label}> Email: <Text style={styles.info}>{userInfo.email} </Text></Text>
      
      </TouchableOpacity>

         
      <TouchableOpacity
                style={styles.buttonStyle}
                //onPress={() => navigation.navigate("Gender")}
                activeOpacity={0.85}
              >
      <Text style={styles.label}> Gender: {gender}</Text>
      
      </TouchableOpacity>
      
      <TouchableOpacity
                style={styles.buttonStyle}
                //onPress={() => navigation.navigate("Ethnicity")}
                activeOpacity={0.85}
              >
      <Text style={styles.label}> Race/Ethnicity: {race}</Text>
      
      </TouchableOpacity>

      <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => navigation.navigate("Edit Phone Number")}
                activeOpacity={0.85}
              >
      <Text style={styles.label}> Phone Number: {phoneNumber} <Text style = {styles.editText}>[Edit]</Text></Text>
      
      </TouchableOpacity>

      <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => navigation.navigate("Edit Address")}
                activeOpacity={0.85}
              >
      <Text style={styles.label}>Address: {address}, {city}, {state} {zip} <Text style = {styles.editText}>[Edit]</Text></Text>
      
      </TouchableOpacity>
   

      <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => navigation.navigate("Sleep Schedule")}
                activeOpacity={0.85}
              >
      <Text style={styles.label}> Sleep Schedule <Text style = {styles.editText}>[Edit]</Text></Text>
      
      </TouchableOpacity>
      
      <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => { 
                  {
                    navigation.navigate("Demographics");
                  }
                }}
                activeOpacity={0.85}
              >
      <Text style={styles.label}> Additional Demographics</Text>
      
      </TouchableOpacity>
      
      
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonTextWhite}>Log out</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF99",
    //justifyContent: "center",
  },
  buttonTextWhite: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    width: 100,
    height: 45,
    backgroundColor: "#072B4F",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonStyle: {
    width: 320,
    height: 58,
    paddingVertical: 8,
    backgroundColor: "#DBECEE",
    paddingHorizontal: 15,
    borderRadius: 4,
    justifyContent: "center",
    borderColor: '#184E77',
    borderWidth: 1

  },
  buttonComponent: {
    justifyContent: "flex-end",
    flexDirection: "row",

  },

  label: {
    textAlign: 'left',
    marginLeft: -3,
    flexWrap: 'wrap',
    fontSize: 15

    
  },
  info: {
    textAlign: 'right',
    flexWrap: 'wrap',
    flex: 1,
    
  },
  account: {
    margin: 18,
    fontWeight: 'bold',
    fontSize: 17
  },
  editText: {
    fontSize: 13,
    color: "gray"
  }
 
  
 
});
