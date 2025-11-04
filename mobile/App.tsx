import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/store';
import { theme } from './src/theme';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            <Text style={styles.title}>🌱 Plant Sitter</Text>
            <Text style={styles.subtitle}>Week 1: Foundation Complete!</Text>
            <Text style={styles.info}>Backend + Mobile setup is ready</Text>
            <StatusBar style="auto" />
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#4CAF50',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
