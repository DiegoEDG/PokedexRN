import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';

const App = () => {
  return <SafeAreaView style={styles.main}></SafeAreaView>;
};

export default App;

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#2F2D2E',
  },
});
