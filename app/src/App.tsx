import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

import HomeNavigation from "./navigation/index";

import RegistrationScreen from "./screens/RegistrationScreen";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OpeningScreen from "./screens/OpeningScreen";
import Login from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

import Verification from "./screens/Verification";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import TermsAndConditions from "./screens/TermsAndConditionsScreen";
import Loading from "./screens/Loading";
import React, { useState } from "react";
import { AuthContext, UserInfo } from "./navigation/context";

import {backendUrl} from "./config/config.json";

import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { Alert } from "react-native";

const AuthStack = createNativeStackNavigator();
const welcomeStack = createNativeStackNavigator();


const AuthenticationStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      {/* <AuthStack.Screen
        name = "WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false, title: "Welcome" }}
      /> */}

      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false, title: "Log in" }}
      />
      <AuthStack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ title: "Sign Up" }}
      />

      <AuthStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{ title: "Terms and Conditions" }}
      />

      <AuthStack.Screen name="Opening" component={OpeningScreen} />
      <AuthStack.Screen
        name="VerificationScreen"
        component={Verification}
        options={{ headerShown: true, title: "Verification" }}
      />
      <AuthStack.Screen
        name="EmailVerificationScreen"
        component={EmailVerificationScreen}
        options={{ headerShown: true, title: "Verification" }}
      />
    </AuthStack.Navigator>
  );
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const AuthStack = createNativeStackNavigator();

  const [isLoading, setIsLoading] = React.useState(true);
  const [authValid, setAuthValid] = React.useState(false);

  const [userInfo, setUserInfo] = React.useState<UserInfo>(() => userInfo);

  const setItem = (name: string, data: string) => {
    try {
      SecureStore.setItemAsync(name, data);
      // console.log("data stored");
    } catch (error: any) {
      // Error saving data
      console.log("AsyncStorage save error: " + error.message);
    }
  };

  const verifyToken = () => {
    SecureStore.getItemAsync("user_token").then((token) => {
      console.log(token);
      axios
        .get(`${backendUrl}/api/auth/jwt-test`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUserInfo({
            email: response.data["email"],
            firstName: response.data["firstName"],
            lastName: response.data["lastName"],
          });
          setAuthValid(true);
        })
        .catch((error) => {
          console.log("Your are not logged in!"); // token error
          // Alert.alert("Connection failed. Please log in again.");
          setAuthValid(false);
        });
    });
  };

  const authContext = React.useMemo(() => {
    return {
      signIn: (token: string) => {
        setIsLoading(false);
        setItem("user_token", token);
        verifyToken();
      },
      // signUp: (token: string) => {
      //   setIsLoading(false);
      //   setItem("user_token", token);
      //   verifyToken();
      // },
      signOut: () => {
        setIsLoading(false);
        setAuthValid(false);
        setItem("user_token", "");
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  React.useEffect(() => {
    verifyToken();
  }, []);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <AuthContext.Provider
      value={{ authFunctions: authContext, userInfo: userInfo }}
    >
      <NavigationContainer>
        {authValid ? <HomeNavigation /> : <AuthenticationStackNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

