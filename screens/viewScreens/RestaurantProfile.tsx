import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileHeader from '../../components/restaurant_profile/ProfileHeader';
import { LooksScreen } from '../../components/restaurant_profile/Looks';
import { DrinksScreen } from '../../components/restaurant_profile/DrinkSection';
import { MenuItemsScreen } from '../../components/restaurant_profile/MenuSection';

const Tab = createMaterialTopTabNavigator();




const RestaurantProfile = ({ navigation }) => {
  const handleGoBack = () => navigation.goBack();

  const openMaps = () => {
    const latitude = "26.8217";
    const longitude = "87.2863";
    const label = "Delicious Restaurant";

    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />

      <ProfileHeader
        restaurantName='Delicious Restaurant'
        openingHour='10:00 AM - 10:00 PM'
        rating='4.5'
        cityName='Kathmandu'
        streetAddress='Boudha, Kathmandu'
        handleGoBack={handleGoBack}
        openMaps={openMaps}
      />

      {/* Navigation Tabs */}
      <Tab.Navigator
        style={styles.tabNavigator}
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.tabIndicator,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: '#E23744',
          tabBarInactiveTintColor: '#666',
          // tabBarItemStyle: { key: undefined }, // Ensure `key` is excluded here

        }}
      >
        <Tab.Screen name="Menu Items" component={MenuItemsScreen} />
        <Tab.Screen name="Drinks" component={DrinksScreen} />
        <Tab.Screen name="Looks" component={LooksScreen} />
      </Tab.Navigator>

      {/* screenOptions={({ route }) => ({
    tabBarStyle: styles.tabBar,
    tabBarIndicatorStyle: styles.tabIndicator,
    tabBarLabelStyle: styles.tabLabel,
    tabBarActiveTintColor: '#E23744',
    tabBarInactiveTintColor: '#666',
    tabBarItemStyle: { key: undefined }, // Ensure `key` is excluded here
  })} */}


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  tabNavigator: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#F0F4F8',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabIndicator: {
    backgroundColor: '#E23744',
    height: 3,
  },
  tabLabel: {
    fontFamily: 'poppins_semibold',
    textTransform: 'none',
  },
});

export default RestaurantProfile;