import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { ScrollView } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:2400/api/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        const { message } = response.data;
        const { status, data } = response;
        if (status == 200) {
          console.log("logged in");
          navigation.navigate("MainScreen");
        } else {
          // todo
          console.log(message);
        }
        // console.log(response);
      })
      .catch((error) => {
        Alert.alert("Email or password is incorrect");
      });
  };
  const handleForget = () => {};
  const handleSignUp = () => {
    navigation.navigate("Registration");
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <ImageBackground
        source={require("../assets/images/bg3.jpg")}
        resizeMode="cover"
        blurRadius={8}
        style={styles.image}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={[styles.frameContainer, styles.shadowProp]}>
            <Text style={styles.TitleText}>Welcome</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#072B4F"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#072B4F"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40,
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                activeOpacity={0.85}
              >
                <Text style={styles.buttonTextWhite}>Login</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{ color: "#072B4F", marginTop: 20 }}
              onPress={handleForget}
            >
              Forgot Password ?
            </Text>

            <View style={{ flexDirection: "row", marginTop: 40 }}>
              <Text style={{ color: "#072B4F" }}>Don't have an account? </Text>
              <Text
                style={{ color: "#072B4F", fontWeight: "bold" }}
                onPress={handleSignUp}
              >
                Sign Up
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  frameContainer: {
    width: "80%",
    height: "50%",
    backgroundColor: "#FFFFFF99",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 16,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  TitleText: {
    textAlign: "center",
    color: "#072B4F",
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 30,
    paddingTop: 30,
  },
  inputContainer: {
    width: "80%",
    borderBottomColor: "#072B4F",
    borderBottomWidth: 1.5,
  },
  textInput: {
    width: "70%",
    color: "#072B4F",
    fontSize: 17,
    marginTop: 5,
    paddingVertical: 10,
    borderRadius: 10,
    borderBottomColor: "white",
  },
  button: {
    width: 250,
    height: 45,
    backgroundColor: "#072B4F",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 5,
  },
  buttonTextWhite: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTextDark: {
    textAlign: "center",
    color: "#072B4F",
    fontSize: 18,
    fontWeight: "bold",
  },
});
