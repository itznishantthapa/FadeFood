"use client"

import { StyleSheet, Linking, Platform,ScrollView } from "react-native"
import { useContext } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import ProfileHeader from "../components/restaurant_profile/ProfileHeader"
import { MenuItemsScreen } from "../components/restaurant_profile/MenuSection"
import { DrinksScreen } from "../components/restaurant_profile/DrinkSection"
import { LooksScreen } from "../components/restaurant_profile/Looks"
import { myContext } from "../context/AppProvider"

const Tab = createMaterialTopTabNavigator()

const Menu = ({ navigation }) => {
  const { seller_state } = useContext(myContext)

  // Wrapper components to pass props
  const MenuItemsWrapper = () => {
    const { food_state } = useContext(myContext)
    return <MenuItemsScreen foodItems={food_state} navigation={navigation} handlePressonList={undefined} />
  }

  const openMaps = () => {
    const latitude = "26.8217"
    const longitude = "87.2863"
    const label = "Delicious Restaurant"

    const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" })
    const latLng = `${latitude},${longitude}`
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    })

    Linking.openURL(url)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} backgroundColor="#333333" style="light" />
        {/* <ScrollView
          style={{flex:1}}
          showsVerticalScrollIndicator={false}
        > */}
      <ProfileHeader
        handleGoBack={undefined}
        openMaps={openMaps}
        restaurantName={seller_state.name}
        openingHour={seller_state.opening_hour}
        rating={seller_state.rating}
        cityName={seller_state.city}
        streetAddress={seller_state.street_address}
        activeStatus={seller_state.is_active}
        businessType={seller_state.business_type}
        logo={seller_state.logo}
        navigation={navigation}
      />

      <Tab.Navigator
        style={styles.tabNavigator}
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.tabIndicator,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: "#333333",
          tabBarInactiveTintColor: "#666",
        }}
      >
        <Tab.Screen name="Menu Items" component={MenuItemsWrapper} />
        <Tab.Screen name="Drinks" component={DrinksScreen} />
        <Tab.Screen name="Looks" component={LooksScreen} />
      </Tab.Navigator>
      {/* </ScrollView> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  tabNavigator: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#F0F4F8",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  tabIndicator: {
    backgroundColor: "#333333",
    height: 3,
  },
  tabLabel: {
    fontFamily: "poppins_semibold",
    textTransform: "none",
  },
})

export default Menu

