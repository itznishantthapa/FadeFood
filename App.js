import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreens from './screens/auth/LoginScreens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
import SearchScreen from './screens/viewScreens/SearchScreen';
import ProfileUpdation from './screens/viewScreens/ProfileUpdation';
import PrivacyAndSecurity from './screens/viewScreens/PirvacyAndSecurity';
import AboutScreen from './screens/viewScreens/AboutScreen';
import RestaurantProfile from './screens/viewScreens/RestaurantProfile';
import RegistrationScreen from './sellerScreen/RegistrationScreen';
import AccountSwitch from './screens/viewScreens/AccountSwitch';
import SellerSetting from './sellerScreen/SellerSetting';
import Home from './screens/tabScreens/Home';
import { StatusBar } from 'expo-status-bar';
import ProfileEdit from './screens/viewScreens/ProfileEdit';
import WriteReview from './screens/viewScreens/WriteReview';
import SeeReview from './screens/viewScreens/SeeReview';
import RestaurantCategories from './screens/viewScreens/RestaurantCategories';
import ViewMap from './screens/viewScreens/ViewMap';
import DishManagement from './sellerScreen/DishManagement';
import AddFood from './sellerScreen/AddFood';
import Menu from './sellerScreen/Menu';
import DiscountOffer from './screens/viewScreens/DiscountOffer';
import CheckoutScreen from './Payment/screens/CheckoutScreen';
import OrderConfirmation from './Payment/screens/OrderConfirmation';
import EsewaWebView from './Payment/screens/EsewaWebView';
import OrderCancelled from './Payment/screens/OrderCancelled';





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
    'LeckerliOne_regular': require('./assets/fonts/LeckerliOne-Regular.ttf'),
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
    <AppProvider > 
      <SafeAreaProvider >
             <StatusBar hidden={false} backgroundColor='#ffffff' style='dark' />
        <NavigationContainer>
          <Stack.Navigator initialRouteName='TabBars' >
            <Stack.Screen name="LoginScreens" component={LoginScreens} options={{ headerShown: false }} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
            <Stack.Screen name="VerificationScreen" component={VerificationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TabBars" component={TabBars} options={{ headerShown: false }} />
            <Stack.Screen name="ViewFood" component={ViewFood} options={{ headerShown: false }} />
            <Stack.Screen name="FoodList" component={FoodList} options={{ headerShown: false }} />
            <Stack.Screen name="Inbox" component={Inbox} options={{ headerShown: false }} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileUpdation" component={ProfileUpdation} options={{ headerShown: false }} />
            <Stack.Screen name="PrivacyAndSecurity" component={PrivacyAndSecurity} options={{ headerShown: false }} />
            <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} options={{ headerShown: false }} />
            <Stack.Screen name="AccountSwitch" component={AccountSwitch} options={{ headerShown: false }} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SellerSetting" component={SellerSetting} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: false }} />
            <Stack.Screen name="SeeReview" component={SeeReview} options={{ headerShown: false }} />
            <Stack.Screen name="WriteReview" component={WriteReview} options={{ headerShown: false }} />
            <Stack.Screen name="RestaurantCategories" component={RestaurantCategories} options={{ headerShown: false }} />
            <Stack.Screen name="ViewMap" component={ViewMap} options={{ headerShown: false }} />
            <Stack.Screen name="DishManagement" component={DishManagement} options={{ headerShown: false }} />
            <Stack.Screen name="AddFood" component={AddFood} options={{ headerShown: false }} />
            <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
            <Stack.Screen name="DiscountOffer" component={DiscountOffer} options={{ headerShown: false }} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} options={{ headerShown: false }} />
            <Stack.Screen name="OrderCancelled" component={OrderCancelled} options={{ headerShown: false }} />
            <Stack.Screen name="EsewaWebView" component={EsewaWebView} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  );
}
