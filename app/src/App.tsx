import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

import LoginScreen from "./screens/LoginScreen";
import Navigation from './navigation/index';
import RegistrationScreen from './screens/RegistrationScreen';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LocationScreen from './screens/LocationScreen';
import OpeningScreen from './screens/OpeningScreen';
import Login from './screens/LoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Verification from './screens/Verification';
import EmailVerificationScreen from './screens/EmailVerificationScreen';
import QuestionnaireScreen from './screens/QuestionnaireScreen';
import Loading from "./screens/Loading";
import React, { useState } from "react";
import { AuthContext } from "./navigation/context";

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
      <AuthStack.Screen
        name="MainScreen"
        component={Navigation}
        options={{ headerShown: false, title: "Home" }}
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
      <AuthStack.Screen
        name="QuestionnaireScreen"
        component={QuestionnaireScreen}
        options={{ headerShown: true, title: "Questionnaire" }}
    />
    </AuthStack.Navigator>

  );
};
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const AuthStack = createNativeStackNavigator();

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState<string | null>("user_token");
  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken("todo");
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("todo");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? <Navigation /> : <AuthenticationStackNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

