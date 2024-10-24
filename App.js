import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreens from './screens/auth/LoginScreens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import SignupScreen from './screens/auth/SignupScreen';
import ForgetPassword from './screens/auth/ForgetPassword';
import VerificationScreen from './screens/auth/VerificationScreen';
import TabBars from './screens/tabScreens/TabBars';
import { AppProvider } from './context/AppProvider';




import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react'
import ViewFood from './screens/viewScreens/ViewFood';
import FoodList from './screens/viewScreens/FoodList';
import Inbox from './screens/viewScreens/Inbox';
import TestScreen from './screens/viewScreens/TestScreen';
import SearchScreen from './screens/viewScreens/SearchScreen';

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
    'poppins_regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins_bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'poppins_semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
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
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="LoginScreens" component={LoginScreens} options={{ headerShown: false }} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
            <Stack.Screen name="VerificationScreen" component={VerificationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TabBars" component={TabBars} options={{ headerShown: false }} />
            <Stack.Screen name="ViewFood" component={ViewFood} options={{ headerShown: false }} />
            <Stack.Screen name="FoodList" component={FoodList} options={{ headerShown: false }} />
            <Stack.Screen name="Inbox" component={Inbox} options={{ headerShown: false }} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>




      </SafeAreaProvider>
    </AppProvider>
  );
}
