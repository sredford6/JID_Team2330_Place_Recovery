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

const AuthStack = createNativeStackNavigator();

const AuthenticationStackNavigator = () => {
  return (
    <NavigationContainer>
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
          options={{ headerShown: false, title: "Questionnaire"}}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const AuthStack = createNativeStackNavigator();

  // if (isLoadingComplete) {
  //   return null;
  // } else {
  //   return (
  //     <SafeAreaProvider>
  //       <AuthenticationStackNavigator />
  //       <StatusBar />
  //     </SafeAreaProvider>
  //   );
  // }
  return <AuthenticationStackNavigator />;
}

