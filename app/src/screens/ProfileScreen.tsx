import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../navigation/context";
import React, { useEffect, useState } from "react";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const { authFunctions, userInfo } = React.useContext(AuthContext);

  const { signOut } = authFunctions;
  const handleSignOut = () => {
    // if (testmode) {
    //   signOut();
    //   return;
    // }
    console.log("logging out");
    signOut();
  };

  useEffect(() => {
    // load user info
  }, []);

  // console.log(firstName);
  return (
    <View style={styles.container}>
      <Text>Profile screen</Text>
      <Text>
        Name: {userInfo.firstName} {userInfo.lastName}
        {"\n Email: "}
        {userInfo.email}
      </Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonTextWhite}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});