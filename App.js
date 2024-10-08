import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreens from './screens/auth/LoginScreens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import SignupScreen from './screens/auth/SignupScreen';
import ForgetPassword from './screens/auth/ForgetPassword';
import VerificationScreen from './screens/auth/VerificationScreen';
import TabBars from './screens/tabBars/TabBars';
import { AppProvider } from './context/AppProvider';
import { Text,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// import { Inter_900Black, useFonts } from '@expo-google-fonts/inter';
// import {Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react'
import ViewFood from './screens/viewScreens/ViewFood';
import FoodList from './screens/viewScreens/FoodList';

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function App() {
  const [loaded, error] = useFonts({
    'jakarta_bold': require('./assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    'jakarta_regular': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'inter_semibold': require('./assets/fonts/Inter_28pt-SemiBold.ttf'),
    'noto_regular': require('./assets/fonts/NotoSans_Condensed-Regular.ttf'),
    'montserrat_bold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    'montserrat_regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserrat_semibold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'pacifico': require('./assets/fonts/Pacifico-Regular.ttf'),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <AppProvider>
      <SafeAreaProvider>
        {/* <Text style={{fontFamily:'cursive',fontSize:20}}>Cursive</Text> */}

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="LoginScreens" component={LoginScreens} options={{ headerShown: false }} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
            <Stack.Screen name="VerificationScreen" component={VerificationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TabBars" component={TabBars} options={{ headerShown: false }} />
            <Stack.Screen name="ViewFood" component={ViewFood} options={{ headerShown: false }} />
            <Stack.Screen name="FoodList" component={FoodList} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>




      </SafeAreaProvider>
    </AppProvider>
  );
}
