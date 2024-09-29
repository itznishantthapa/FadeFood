import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreens from './screens/auth/LoginScreens';

export default function App() {
  return (
    <>
      <StatusBar hidden={false} backgroundColor='black' style='light' />
      <LoginScreens/>
    </>
  );
}
