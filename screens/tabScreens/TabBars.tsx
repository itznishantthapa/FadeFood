import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../../style/style'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ant from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Home from '../tabScreens/Home'
import Favourite from '../tabScreens/Favourite';
import Search from '../tabScreens/Search';
import Profile from '../tabScreens/Profile';
import Chat from '../tabScreens/Chat';

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
              focused ? <Entypo name='home' size={30} color={color} /> : <Ant name='home' size={30} color={color} />
            );
          } else if (route.name === 'Favourite') {
            return <MaterialIcon name={focused ? "favorite" : 'favorite-border'} color={color} size={30} />;
          } else if (route.name === 'Search') {
            return <MaterialCommunityIcons name="qrcode-scan" color={color} size={35} />
          } else if (route.name === 'Chat') {
            return <Ionicons name={focused ? "chatbubbles-sharp" : "chatbubbles-outline"} color={color} size={30} />;
          } else if (route.name === 'Profile') {
            return <Entypo name="info" color={color} size={30} />;
          }
        },
        tabBarActiveTintColor: '#FF5722',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 60
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
        name="Search"
        component={Search}
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

