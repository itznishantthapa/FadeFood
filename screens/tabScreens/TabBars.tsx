
import React from 'react'
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

const Tab = createBottomTabNavigator();
const TabBars = () => {
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
        tabBarActiveTintColor: '#FF5722',
        tabBarInactiveTintColor: '#757575',
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

export default TabBars

