import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileHeader from '../../components/restaurant_profile/ProfileHeader';
import { LooksScreen } from '../../components/restaurant_profile/Looks';
import { DrinksScreen } from '../../components/restaurant_profile/DrinkSection';
import { MenuItemsScreen } from '../../components/restaurant_profile/MenuSection';
import { myContext } from '../../context/AppProvider';
import { get_data_with_id } from '../../service';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();




const RestaurantProfile = ({ navigation }) => {
  const { isLoading, setisLoading, snackBar, setsnackBar, initialseller_state, dispatch, state, seller_state, seller_dispatch, food_state, food_dispatch } = useContext(myContext);
  // const { restaurant_id } = route.params;


  // const getting_restaurant_details = async () => {
  //   const response = await get_data_with_id("get_specific_restaurant", { restaurant_name: restaurant_id });
  //   console.log('-----------restaurant_name by Restaurant Profile>>---------------------------', restaurant_id);
  //   if (response.success) {
  //     console.log('-----------data_with_id---------------------------', response.data);

  //     Object.entries(response.data).forEach(([key, value]) => {
  //       if (initialseller_state.hasOwnProperty(key)) {
  //         seller_dispatch({ type: "SET_DATA", key, payload: value });
  //       }
  //     });
      
  //   } else {
  //     console.log("Error", response.data);
  //   }
  // }
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Fetch and set restaurant info
  //     getting_restaurant_details();

  //     return () => {
  //       // Clear data when screen is unfocused
  //       seller_dispatch({ type: "CLEAR" });
  //       console.log("Restaurant Profile Unfocused");
  //     };
  //   }, [])
  // );


  const handleGoBack = () => navigation.goBack();
  const foodItems1 = [
    {
      id: 1,
      food_price: "$5.00",
      food_name: "ChatpatebyRestaurantProfile",
      restaurantName: "Food Corner",
      image: { undefined },
      isLoveNeeded: true,
    },
    {
      id: 2,
      food_price: "$5.00",
      food_name: "ChatpatebyRestaurantProfile",
      restaurantName: "Food Corner",
      image: { undefined },
      isLoveNeeded: true,
    }]

  const MenuItemsWrapper = () => {
    return <MenuItemsScreen foodItems={foodItems1} navigation={navigation} handlePressonList={undefined} />;
  };

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
        openMaps={openMaps}
        restaurantName={seller_state.name}
        openingHour={seller_state.opening_hour}
        rating={seller_state.rating}
        cityName={seller_state.city}
        streetAddress={seller_state.street_address}
        activeStatus={seller_state.is_active}
        handleGoBack={handleGoBack}
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
        }}
      >
        <Tab.Screen name="Menu Items" component={MenuItemsWrapper} />
        <Tab.Screen name="Drinks" component={DrinksScreen} />
        <Tab.Screen name="Looks" component={LooksScreen} />
      </Tab.Navigator>
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