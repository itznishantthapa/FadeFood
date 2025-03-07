"use client"

import { useContext, useRef, useEffect } from "react"
import { View, StyleSheet, Animated, TouchableOpacity,TouchableWithoutFeedback } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ant from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import Home from "../tabScreens/Home"
import Favourite from "../tabScreens/Favourite"
import Scanner from "./Scanner"
import Profile from "../tabScreens/Profile"
import Chat from "../tabScreens/Chat"
import { scaleHeight, scaleWidth } from "../../Scaling"
import Menu from "../../sellerScreen/Menu"
import { myContext } from "../../context/AppProvider"
import RestaurantNotification from "../../sellerScreen/RestaurantNotification"
import SellerProfile from "../../sellerScreen/SellerProfile"


const Tab = createBottomTabNavigator()

// Custom tab bar component with animations
const CustomTabBar = ({ state, descriptors, navigation, scrollY }) => {
  const insets = useSafeAreaInsets()
  const focusedOptions = descriptors[state.routes[state.index].key].options
  

  // Don't show the tab bar if the screen wants to hide it
  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  // Animation values for scanner button
  const scannerScale = useRef(new Animated.Value(1)).current
  const scannerRotate = useRef(new Animated.Value(0)).current
  const tabOpacityRefs = useRef(state.routes.map(() => new Animated.Value(1))).current
  const tabScaleRefs = useRef(state.routes.map(() => new Animated.Value(1))).current

  // Calculate tab bar translation based on scroll position
  const tabBarTranslateY = scrollY
    ? scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [0, 0],
        extrapolate: "clamp",
      })
    : new Animated.Value(0)

  // Calculate scanner button translation and scale based on scroll position
  const scannerTranslateY = scrollY
    ? scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 10],
        extrapolate: "clamp",
      })
    : new Animated.Value(0)

  const scannerBackgroundColor = scrollY
    ? scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: ["rgba(255, 255, 255, 1)", "rgba(245, 245, 245, 0.95)"],
        extrapolate: "clamp",
      })
    : "rgba(255, 255, 255, 1)"

  // Rotate animation for scanner button
  const spin = scannerRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <Animated.View
      style={[
        styles.tabBarContainer,
        {
          transform: [{ translateY: tabBarTranslateY }],
          paddingBottom: insets.bottom || 10,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }

          // Add animation for scanner button when pressed
          if (route.name === "Scanner") {
            Animated.sequence([
              Animated.timing(scannerScale, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
              }),
              Animated.timing(scannerScale, {
                toValue: 1.1,
                duration: 150,
                useNativeDriver: true,
              }),
              Animated.timing(scannerScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
              }),
              Animated.timing(scannerRotate, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
              }),
            ]).start(() => {
              scannerRotate.setValue(0)
            })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }

        // Render scanner button differently
        if (route.name === "Scanner") {
          return (
            <Animated.View
              key={index}
              style={[
                styles.scannerButtonContainer,
                {
                  transform: [{ translateY: scannerTranslateY }, { scale: scannerScale }, { rotate: spin }]
                },
              ]}
            >
              <TouchableWithoutFeedback
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabButton}
              >
                <Animated.View style={[styles.scannerButton, { backgroundColor: scannerBackgroundColor }]}>
                  <Ionicons
                    name="qr-code"
                    color={isFocused ? "#4CAF50" : "#b3b3b3"}
                    size={scaleWidth(35)}
                    // style={{backgroundColor: "black"}}
                  />
                </Animated.View>
              </TouchableWithoutFeedback>
            </Animated.View>
          )
        }

        // Render regular tab buttons
        let IconComponent
        let iconName

        if (route.name === "Home" || route.name === "Menu") {
          IconComponent = isFocused ? Entypo : Ant
          iconName = "home"
        } else if (route.name === "Favourite") {
          IconComponent = MaterialIcon
          iconName = isFocused ? "favorite" : "favorite-border"
        } else if (route.name === "Chat") {
          IconComponent = Ionicons
          iconName = isFocused ? "chatbubbles-sharp" : "chatbubbles-outline"
        } else if (route.name === "Profile" || route.name === "SellerProfile") {
          IconComponent = Entypo
          iconName = "info"
        } else if (route.name === "Notifications") {
          IconComponent = Ionicons
          iconName = isFocused ? "notifications" : "notifications-outline"
        }

        // Animation for tab button
        const tabOpacity = tabOpacityRefs[index]
        const tabScale = tabScaleRefs[index]

        useEffect(() => {
          if (isFocused) {
            Animated.parallel([
              Animated.timing(tabOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.spring(tabScale, {
                toValue: 1.2,
                friction: 4,
                useNativeDriver: true,
              }),
            ]).start(() => {
              Animated.spring(tabScale, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
              }).start()
            })
          } else {
            Animated.parallel([
              Animated.timing(tabOpacity, {
                toValue: 0.8,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(tabScale, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
            ]).start()
          }
        }, [isFocused, tabOpacity, tabScale])

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <Animated.View
              style={{
                opacity: tabOpacity,
                transform: [{ scale: tabScale }],
                alignItems: "center",
              }}
            >
              <IconComponent name={iconName} color={isFocused ? "#4CAF50" : "#b3b3b3"} size={scaleWidth(26)} />
              {isFocused && <View style={styles.activeIndicator} />}
            </Animated.View>
          </TouchableOpacity>
        )
      })}
    </Animated.View>
  )
}

// Customer Tab Navigator with animated tab bar
const CustomerTabBars = () => {
  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} scrollY={scrollY} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Entypo name="home" size={scaleWidth(30)} color={color} />
            ) : (
              <Ant name="home" size={scaleWidth(30)} color={color} />
            ),
        }}
        // initialParams={{ scrollY }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcon name={focused ? "favorite" : "favorite-border"} color={color} size={scaleWidth(30)} />
          ),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons name="qrcode-scan" color={color} size={scaleWidth(35)} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "chatbubbles-sharp" : "chatbubbles-outline"}
              color={color}
              size={scaleWidth(30)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color }) => <Entypo name="info" color={color} size={scaleWidth(30)} />,
        }}
      />
    </Tab.Navigator>
  )
}

// Seller Tab Navigator with animated tab bar
const SellerTabBars = () => {
  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <Tab.Navigator
      initialRouteName="Menu"
      tabBar={(props) => <CustomTabBar {...props} scrollY={scrollY} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Entypo name="home" size={scaleWidth(30)} color={color} />
            ) : (
              <Ant name="home" size={scaleWidth(30)} color={color} />
            ),
        }}

      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "chatbubbles-sharp" : "chatbubbles-outline"}
              color={color}
              size={scaleWidth(30)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={RestaurantNotification}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "notifications" : "notifications-outline"} color={color} size={scaleWidth(30)} />
          ),
        }}
      />
      <Tab.Screen
        name="SellerProfile"
        component={SellerProfile}
        options={{
          tabBarIcon: ({ focused, color }) => <Entypo name="info" color={color} size={scaleWidth(30)} />,
        }}
      />
    </Tab.Navigator>
  )
}

const TabBars = () => {
  const { state } = useContext(myContext)
  return state.role === "customer" ? <CustomerTabBars /> : <SellerTabBars />
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    height: scaleHeight(60),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerButtonContainer: {
    position: "absolute",
    alignSelf: "center",
    width: scaleWidth(80),
    height: scaleHeight(80),
    justifyContent: "center",
    alignItems: "center",
    left: "50%",
    marginLeft: -scaleWidth(40),
    top: -scaleHeight(30),
    zIndex: 1,
  },
  scannerButton: {
    width: scaleWidth(70),
    height: scaleWidth(70),
    borderRadius: scaleWidth(35),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  activeIndicator: {
    width: scaleWidth(5),
    height: scaleWidth(5),
    borderRadius: scaleWidth(2.5),
    backgroundColor: "#4CAF50",
    marginTop: scaleHeight(4),
  },
})

export default TabBars

