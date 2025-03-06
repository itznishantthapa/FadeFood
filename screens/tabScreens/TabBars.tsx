
import React, { useCallback, useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ant from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../tabScreens/Home'
import Favourite from '../tabScreens/Favourite';
import Scanner from './Scanner';
import Profile from '../tabScreens/Profile';
import Chat from '../tabScreens/Chat';
import { scaleHeight, scaleWidth } from '../../Scaling';
import Menu from '../../sellerScreen/Menu';
import AddFood from '../../sellerScreen/AddFood';
import Notifications from '../../sellerScreen/Notifications';
import { FA6Style } from 'react-native-vector-icons/FontAwesome6';
import { myContext } from '../../context/AppProvider';
import RestaurantNotification from '../../sellerScreen/RestaurantNotification';
import LoadingScreen from '../../components/viewScreens/LoadingScreen';
import SellerProfile from '../../sellerScreen/SellerProfile';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'react-native';


const Tab = createBottomTabNavigator();
const CustomerTabBars = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            return (
              focused ? <Entypo name='home' size={scaleWidth(30)} color={color} /> : <Ant name='home' size={scaleWidth(30)} color={color} />
            );
          } else if (route.name === 'Favourite') {
            return <MaterialIcon name={focused ? "favorite" : 'favorite-border'} color={color} size={scaleWidth(30)} />;
          } else if (route.name === 'Scanner') {
            return <MaterialCommunityIcons name="qrcode-scan" color={color} size={scaleWidth(35)} />
          } else if (route.name === 'Chat') {
            return <Ionicons name={focused ? "chatbubbles-sharp" : "chatbubbles-outline"} color={color} size={scaleWidth(30)} />;
          } else if (route.name === 'Profile') {
            return <Entypo name="info" color={color} size={scaleWidth(30)} />;
          }
        },
        tabBarActiveTintColor: '#b3b3b3',
        tabBarInactiveTintColor: '#b3b3b3',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: scaleHeight(60)
        }
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
      />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  )
}

const SellerTabBars = () => {

  return (
    <Tab.Navigator
      initialRouteName='Menu'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Menu') {
            return (
              focused ? <Entypo name='home' size={scaleWidth(30)} color={color} /> : <Ant name='home' size={scaleWidth(30)} color={color} />
            );

          } else if (route.name === 'Chat') {
            return <Ionicons name={focused ? "chatbubbles-sharp" : "chatbubbles-outline"} color={color} size={scaleWidth(30)} />;

          } else if (route.name === 'Notifications') {
            return <Ionicons name={focused ? "notifications" : "notifications-outline"} color={color} size={scaleWidth(30)} />;
          
          } else if (route.name === 'SellerProfile') {
            return <Entypo name="info" color={color} size={scaleWidth(30)} />;
          }
        },
        tabBarActiveTintColor: '#b3b3b3',
        tabBarInactiveTintColor: '#b3b3b3',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: scaleHeight(60)
        }
      })}
    >
      <Tab.Screen
        name="Menu"
        component={Menu}
      />
    


      <Tab.Screen
        name="Chat"
        component={Chat}
      />
      <Tab.Screen
        name="Notifications"
        component={RestaurantNotification}
      />
      <Tab.Screen
        name="SellerProfile"
        component={SellerProfile}
      />
    </Tab.Navigator>
  )
}




const TabBars = () => {
  const { state } = useContext(myContext);

  return state.role === 'customer' ? <CustomerTabBars /> : <SellerTabBars />;
  // return true ? <CustomerTabBars /> : <SellerTabBars />;
};



export default TabBars

