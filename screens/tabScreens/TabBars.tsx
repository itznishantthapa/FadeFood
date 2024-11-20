
import React, { useContext } from 'react'
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
import { FA6Style } from 'react-native-vector-icons/FontAwesome6';
import { myContext } from '../../context/AppProvider';
import RestaurantNotification from '../../sellerScreen/RestaurantNotification';


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
        tabBarActiveTintColor: '#333333',
        tabBarInactiveTintColor: '#333333',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: scaleHeight(60)
        }
      })}
    >
      <Tab.Screen
        key={1}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        key={2}
        name="Favourite"
        component={Favourite}
      />
      <Tab.Screen
        key={3}
        name="Scanner"
        component={Scanner}
      />
      <Tab.Screen
        key={4}
        name="Chat"
        component={Chat}
      />
      <Tab.Screen
        key={5}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  )
}

const SellerTabBars = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Menu') {
            return <MaterialIcon name="menu-book" color={color} size={scaleWidth(35)} />

          } else if (route.name === 'AddFood') {
            return <MaterialCommunityIcons name={focused ? "plus-circle-multiple" : "plus-circle-multiple-outline"} color={color} size={scaleWidth(35)} />
          } else if (route.name === 'Chat') {
            return <Ionicons name={focused ? "chatbubbles-sharp" : "chatbubbles-outline"} color={color} size={scaleWidth(30)} />;

          } else if (route.name === 'RestaurantNotification') {
            return <Ionicons name={focused ? "notifications" : "notifications-outline"} color={color} size={scaleWidth(30)} />;
          }
        },
        tabBarActiveTintColor: '#333333',
        tabBarInactiveTintColor: '#333333',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: scaleHeight(60)
        }
      })}
    >
      <Tab.Screen
        key={1}
        name="Menu"
        component={Menu}
      />
      <Tab.Screen
        key={2}
        name="AddFood"
        component={AddFood}
      />


      <Tab.Screen
        key={3}
        name="Chat"
        component={Chat}
      />
      <Tab.Screen
        key={4}
        name="RestaurantNotification"
        component={RestaurantNotification}
      />
    </Tab.Navigator>
  )
}




const TabBars = () => {
  return (
    <>

      {
        true ? (<CustomerTabBars></CustomerTabBars>) : (<SellerTabBars></SellerTabBars>)
      }


    </>


  )
}

export default TabBars

