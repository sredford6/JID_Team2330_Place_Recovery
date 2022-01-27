import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import RegistrationScreen from './screens/RegistrationScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LocationScreen from './screens/LocationScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Registation" component={RegistrationScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          
        </Stack.Navigator>
    </NavigationContainer>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}