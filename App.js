import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Quiz from './screens/Quiz';

const App = () => {
  return (
    <SafeAreaView style={styles.container}><Text></Text>
      <Quiz />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
