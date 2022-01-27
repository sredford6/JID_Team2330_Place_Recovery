import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import RegistrationScreen from './screens/RegistrationScreen';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <RegistrationScreen />
        <StatusBar />
      </SafeAreaProvider>



    );
  }
}
