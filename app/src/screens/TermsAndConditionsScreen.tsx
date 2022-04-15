import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from "../navigation/context";
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from "../components/types";

export default function TermsAndConditions({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
      <Text style = {styles.label}>Terms and Conditions will go here.</Text>
      </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    textAlign: 'center',
    margin: 20,
    marginLeft: 40,
    marginRight: 40,
    color: '#072B4F', 
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
