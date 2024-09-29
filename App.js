import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreens from './screens/auth/LoginScreens';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>


          <LoginScreens/>


    </SafeAreaProvider>
  
  );
}
