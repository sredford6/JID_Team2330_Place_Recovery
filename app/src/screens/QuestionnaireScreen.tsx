import { StyleSheet, Button } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { NavigationContainer } from '@react-navigation/native';
import {survey} from '../questions.json';
import Question from '../components/Question';

export default function QuestionnaireScreen({ navigation }: RootStackScreenProps<'Questionnaire'>) {
  return (
    <Question/>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });