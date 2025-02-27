// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Menu from '../sellerScreen/Menu';
import ProfileScreen from '../screens/tabScreens/Profile';
import SellerSetting from '../sellerScreen/SellerSetting';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContentOptions={{ activeTintColor: '#e91e63' }}
    >
      <Drawer.Screen name="Menu"  />
      <Drawer.Screen name="Profile"  />
      <Drawer.Screen name="Settings"  />
    </Drawer.Navigator>
  );
}
