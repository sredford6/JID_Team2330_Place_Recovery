import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

import HomeNavigation from "./navigation/index";

import RegistrationScreen from "./screens/RegistrationScreen";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OpeningScreen from "./screens/OpeningScreen";
import Login from "./screens/LoginScreen";
import Verification from "./screens/Verification";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import Loading from "./screens/Loading";
import React, { useState } from "react";
import { AuthContext, UserInfo } from "./navigation/context";

import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { Alert } from "react-native";

const AuthStack = createNativeStackNavigator();

const AuthenticationStackNavigator = () => {
  return (
    <AuthStack.Navigator>
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

  const [userInfo, setUserInfo] = React.useState<UserInfo>();

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
      // console.log(token);
      axios
        .get("http://localhost:2400/api/auth/jwt-test", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          // TOFIX: probably this should be done somewhere else; maybe in signUp ?
          // setItem("first_name", response.data["firstName"]);
          // setItem("last_name", response.data["lastName"]);
          // setItem("email", response.data["email"]);
          setUserInfo({
            email: response.data["email"],
            firstName: response.data["firstName"],
            lastName: response.data["lastName"],
          });
          setAuthValid(true);
        })
        .catch((error) => {
          console.log("Your are not logged in!"); // token error
          Alert.alert("Connection failed. Please log in again.");
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
      signUp: (token: string) => {
        setIsLoading(false);
        setItem("user_token", token);
        verifyToken();
      },
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{ authContext: authContext, userInfo: userInfo }}
    >
      <NavigationContainer>
        {authValid ? <HomeNavigation /> : <AuthenticationStackNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

