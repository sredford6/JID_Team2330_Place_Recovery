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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
        <Stack.Navigator initialRouteName='Opening' screenOptions={{headerShown:false}}>
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="MainScreen" component={Navigation} />
          <Stack.Screen name="Opening" component={OpeningScreen}/>
          
        </Stack.Navigator>
        
    </NavigationContainer>
   
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

