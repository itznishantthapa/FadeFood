import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreens from './screens/auth/LoginScreens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import SignupScreen from './screens/auth/SignupScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>

      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="LoginScreens" component={LoginScreens} options={{headerShown:false}} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>



    </SafeAreaProvider>

  );
}
