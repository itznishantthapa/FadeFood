"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  Animated,
  Linking,
  TouchableWithoutFeedback,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import * as Location from "expo-location"
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons"
import { scaleHeight, scaleWidth } from "../../Scaling"


const { width, height } = Dimensions.get("window")

// Sample restaurant data (in a real app, this would come from an API)
const sampleRestaurants = [
  {
    id: "1",
    owner: "owner_id_1",
    name: "The Gourmet Kitchen",
    street_address: "123 Main St",
    city: "San Francisco",
    citizenship_number: "123456789",
    pan_number: "987654321",
    business_type: "Restaurant",
    opening_hour: "09:00 AM",
    logo: require("../../assets/icon_final.png"),
    is_active: true,
    restaurant_images: [require("../../assets/fadefood_logo.png")],
    rating: 4.5,
    longitude: 87.2863,
    latitude: 26.8317,
    specialties: ["Pasta", "Steak", "Seafood"],
    delivery_time: "25-35",
    distance: 1.2,
    price_range: "$$$",
    phone: "+1234567890",
  },
  {
    id: "2",
    owner: "owner_id_2",
    name: "Cafe Delight",
    street_address: "456 Elm St",
    city: "Los Angeles",
    citizenship_number: "234567890",
    pan_number: "876543210",
    business_type: "Cafe",
    opening_hour: "08:00 AM",
    logo: require("../../assets/icon_final.png"),
    is_active: true,
    restaurant_images: [require("../../assets/fadefood_logo.png")],
    rating: 4.2,
    longitude: 87.247,
    latitude: 26.822,
    specialties: ["Coffee", "Pastries", "Breakfast"],
    delivery_time: "15-25",
    distance: 0.8,
    price_range: "$$",
    phone: "+1234567891",
  },
  {
    id: "3",
    owner: "owner_id_3",
    name: "Bakery Bliss",
    street_address: "789 Oak St",
    city: "New York",
    citizenship_number: "345678901",
    pan_number: "765432109",
    business_type: "Bakery",
    opening_hour: "07:00 AM",
    logo: require("../../assets/icon_final.png"),
    is_active: true,
    restaurant_images: [require("../../assets/fadefood_logo.png")],
    rating: 4.8,
    longitude: 87.2875,
    latitude: 26.8225,
    specialties: ["Bread", "Cakes", "Pastries"],
    delivery_time: "20-30",
    distance: 1.5,
    price_range: "$$",
    phone: "+1234567892",
  },
  {
    id: "4",
    owner: "owner_id_4",
    name: "Spice Paradise",
    street_address: "101 Pine St",
    city: "Chicago",
    citizenship_number: "456789012",
    pan_number: "654321098",
    business_type: "Restaurant",
    opening_hour: "11:00 AM",
    logo: require("../../assets/icon_final.png"),
    is_active: true,
    restaurant_images: [require("../../assets/fadefood_logo.png")],
    rating: 4.6,
    longitude: 87.288,
    latitude: 26.823,
    specialties: ["Indian", "Thai", "Chinese"],
    delivery_time: "30-40",
    distance: 2.3,
    price_range: "$$",
    phone: "+1234567893",
  },
  {
    id: "5",
    owner: "owner_id_5",
    name: "Pizza Haven",
    street_address: "222 Maple Ave",
    city: "Seattle",
    citizenship_number: "567890123",
    pan_number: "543210987",
    business_type: "Restaurant",
    opening_hour: "10:00 AM",
    logo: require("../../assets/icon_final.png"),
    is_active: true,
    restaurant_images: [require("../../assets/icon_final.png")],
    rating: 4.4,
    longitude: 87.4885,
    latitude: 26.8235,
    specialties: ["Pizza", "Pasta", "Salads"],
    delivery_time: "20-30",
    distance: 1.7,
    price_range: "$$",
    phone: "+1234567894",
  },
]

const ViewMap = ({ navigation, route }) => {
  // State variables
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [restaurants, setRestaurants] = useState(sampleRestaurants)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [mapRegion, setMapRegion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [snackBarVisible, setSnackBarVisible] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState("")
  const [snackBarType, setSnackBarType] = useState("info")
  const [mapType, setMapType] = useState("standard")
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)

  // References
  const mapRef = useRef(null)
  const markerRefs = useRef({})

  // Animation values
  const bottomSheetAnim = useRef(new Animated.Value(height)).current
  const backdropOpacity = useRef(new Animated.Value(0)).current

  // Show snackbar message
  const showSnackBar = useCallback((message, type = "info") => {
    setSnackBarMessage(message)
    setSnackBarType(type)
    setSnackBarVisible(true)
  }, [])

  // Get user location on component mount
  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)

        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied")
          showSnackBar("Location permission denied. Some features may be limited.", "error")

          // Set default region if permission denied
          setMapRegion({
            latitude: 26.8217,
            longitude: 87.2863,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })
          setLoading(false)
          return
        }

        // Get current location
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        })

        setLocation(currentLocation)

        // Set map region based on current location
        const region = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }

        setMapRegion(region)

        // In a real app, you would fetch restaurants near this location
        // For now, we'll use our sample data

        // Simulate API call delay
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error getting location:", error)
        setErrorMsg("Could not get your location")
        showSnackBar("Could not get your location. Please check your settings.", "error")

        // Set default region if location fails
        setMapRegion({
          latitude: 26.8217,
          longitude: 87.2863,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })

        setLoading(false)
      }
    })()
  }, [showSnackBar])

  // Handle marker press
  const handleMarkerPress = useCallback(
    (restaurant) => {
      setSelectedRestaurant(restaurant)

      // Animate to the selected restaurant
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          500,
        )
      }

      // Show bottom sheet
      setIsBottomSheetVisible(true)

      // Animate bottom sheet
      Animated.parallel([
        Animated.timing(bottomSheetAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    },
    [bottomSheetAnim, backdropOpacity],
  )

  // Close bottom sheet
  const closeBottomSheet = useCallback(() => {
    Animated.parallel([
      Animated.timing(bottomSheetAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsBottomSheetVisible(false)
    })
  }, [bottomSheetAnim, backdropOpacity])

  // Navigate to restaurant profile
  const navigateToRestaurantProfile = useCallback(
    (restaurant) => {
      closeBottomSheet()
      // Add a small delay to allow the bottom sheet to close before navigating
      setTimeout(() => {
        navigation.navigate("RestaurantProfile", { restaurant })
      }, 300)
    },
    [navigation, closeBottomSheet],
  )

  // Toggle map type
  const toggleMapType = useCallback(() => {
    setMapType(mapType === "standard" ? "satellite" : "standard")
  }, [mapType])

  // Center map on user location
  const centerOnUserLocation = useCallback(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500,
      )

      showSnackBar("Map centered on your location", "success")
    } else {
      showSnackBar("Could not get your location", "error")
    }
  }, [location, showSnackBar])

  // Get directions to restaurant
  const getDirections = useCallback((restaurant) => {
    if (!restaurant) return

    const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" })
    const latLng = `${restaurant.latitude},${restaurant.longitude}`
    const label = restaurant.name
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    })

    Linking.openURL(url)
  }, [])

  // Call restaurant
  const callRestaurant = useCallback(
    (restaurant) => {
      if (!restaurant || !restaurant.phone) {
        showSnackBar("Phone number not available", "error")
        return
      }

      Linking.openURL(`tel:${restaurant.phone}`)
      showSnackBar(`Calling ${restaurant.name}...`, "info")
    },
    [showSnackBar],
  )

  // Custom marker component
  const CustomMarker = useCallback(
    ({ restaurant, onPress }) => {
      const isSelected = selectedRestaurant && selectedRestaurant.id === restaurant.id

      return (
        <Marker
          ref={(ref) => (markerRefs.current[restaurant.id] = ref)}
          coordinate={{
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
          }}
          onPress={() => onPress(restaurant)}
        >
          <View style={styles.markerContainer}>
            <Animated.View
              style={[
                styles.markerOuter,
                isSelected && styles.markerOuterSelected,
                isSelected && {
                  transform: [{ scale: 1.1 }],
                },
              ]}
            >
              <View style={styles.markerInner}>
                <Image source={restaurant.logo} style={styles.markerImage} resizeMode="contain" />
              </View>
              <View
                style={[
                  styles.markerStatus,
                  {
                    backgroundColor: restaurant.is_active ? "#4CAF50" : "#F44336",
                    borderColor: restaurant.is_active ? "#4CAF50" : "#F44336",
                  },
                ]}
              >
                <Text style={styles.markerStatusText}>{restaurant.is_active ? "OPEN" : "CLOSED"}</Text>
              </View>
            </Animated.View>
            {isSelected && (
              <View style={styles.markerPin}>
                <View style={styles.markerPinInner} />
              </View>
            )}
          </View>
        </Marker>
      )
    },
    [selectedRestaurant],
  )

  // Render loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar hidden={false} backgroundColor="#F0F4F8" style="dark" />
        <ActivityIndicator size="large" color="#FF7F50" />
        <Text style={styles.loadingText}>Finding restaurants near you...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} backgroundColor="transparent" style="dark" />

      {/* Map View */}
      <TouchableWithoutFeedback onPress={isBottomSheetVisible ? closeBottomSheet : undefined}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={mapRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
          showsBuildings={true}
          showsTraffic={false}
          mapType={'standard'}
        >
          {/* Restaurant Markers */}
          {restaurants.map((restaurant) => (
            <CustomMarker key={restaurant.id} restaurant={restaurant} onPress={handleMarkerPress} />
          ))}
        </MapView>
      </TouchableWithoutFeedback>
<View style={styles.topElementsContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333333" />
      </TouchableOpacity>

      {/* Map Controls */}
      <View style={styles.mapControlsContainer}>
        <TouchableOpacity style={styles.mapControlButton} onPress={toggleMapType}>
          <Ionicons name={mapType === "standard" ? "map" : "earth"} size={24} color="#333333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.mapControlButton} onPress={centerOnUserLocation}>
          <Ionicons name="locate" size={24} color="#333333" />
        </TouchableOpacity>
</View>

      </View>

      {/* Bottom Sheet Backdrop */}
      {isBottomSheetVisible && (
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <TouchableWithoutFeedback onPress={closeBottomSheet}>
            <View style={styles.backdropTouchable} />
          </TouchableWithoutFeedback>
        </Animated.View>
      )}

      {/* Bottom Sheet */}
      {isBottomSheetVisible && selectedRestaurant && (
        <Animated.View
          style={[
            styles.bottomSheetContainer,
            {
              transform: [{ translateY: bottomSheetAnim }],
            },
          ]}
        >
          {/* Bottom Sheet Handle */}
          <View style={styles.bottomSheetHeader}>
            <TouchableOpacity style={styles.bottomSheetHandle} onPress={closeBottomSheet}>
              <View style={styles.bottomSheetHandleBar} />
            </TouchableOpacity>
          </View>

          {/* Restaurant Card */}
          <TouchableOpacity
            style={styles.restaurantCard}
            activeOpacity={0.9}
            onPress={() => navigateToRestaurantProfile(selectedRestaurant)}
          >
            <View style={styles.restaurantImageContainer}>
              <Image source={selectedRestaurant.logo} style={styles.restaurantImage} />
              <View style={styles.ratingBadge}>
                <FontAwesome name="star" size={12} color="#FFD700" />
                <Text style={styles.ratingText}>{selectedRestaurant.rating}</Text>
              </View>
              {!selectedRestaurant.is_active && (
                <View style={styles.closedBadge}>
                  <Text style={styles.closedText}>CLOSED</Text>
                </View>
              )}
            </View>

            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{selectedRestaurant.name}</Text>
              <Text style={styles.restaurantAddress}>
                {selectedRestaurant.street_address}, {selectedRestaurant.city}
              </Text>

              <View style={styles.restaurantDetailsRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={14} color="#757575" />
                  <Text style={styles.detailText}>{selectedRestaurant.delivery_time} min</Text>
                </View>

                <View style={styles.detailItem}>
                  <Ionicons name="location-outline" size={14} color="#757575" />
                  <Text style={styles.detailText}>{selectedRestaurant.distance} km</Text>
                </View>

                <View style={styles.detailItem}>
                  <MaterialIcons name="attach-money" size={14} color="#757575" />
                  <Text style={styles.detailText}>{selectedRestaurant.price_range}</Text>
                </View>
              </View>

              <View style={styles.specialtiesContainer}>
                {selectedRestaurant.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyBadge}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.arrowContainer}>
              <Ionicons name="chevron-forward" size={24} color="#757575" />
            </View>
          </TouchableOpacity>

          {/* Business Type Badge */}
          <View style={styles.businessTypeBadge}>
            <Text style={styles.businessTypeText}>{selectedRestaurant.business_type}</Text>
          </View>

          {/* Opening Hours */}
          <View style={styles.openingHoursContainer}>
            <Ionicons name="time-outline" size={16} color="#757575" />
            <Text style={styles.openingHoursText}>Opens at {selectedRestaurant.opening_hour}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => getDirections(selectedRestaurant)}>
              <Ionicons name="navigate" size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Directions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigateToRestaurantProfile(selectedRestaurant)}
            >
              <Ionicons name="restaurant" size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>View Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => callRestaurant(selectedRestaurant)}>
              <Ionicons name="call" size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Call</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  topElementsContainer:{
    position: 'absolute',
    top: scaleHeight(30),
    left: scaleWidth(16),
    right: scaleWidth(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F4F8",
  },
  loadingText: {
    marginTop: scaleHeight(16),
    fontSize: scaleWidth(16),
    fontFamily: "poppins_regular",
    color: "#757575",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(8),
    padding: scaleWidth(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  mapControlsContainer: {
    marginTop: scaleHeight(20),
    flexDirection: "column",
    gap: scaleHeight(8),
    zIndex: 1,
  },
  mapControlButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(8),
    padding: scaleWidth(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerOuter: {
    width: scaleWidth(60),
    height: scaleWidth(60),
    borderRadius: scaleWidth(30),
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerOuterSelected: {
    borderWidth: 2,
    borderColor: "#FE7240",
  },
  markerInner: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    borderRadius: scaleWidth(25),
    backgroundColor: "#F0F4F8",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
   
  },
  markerImage: {
    width: "100%",
    height: "100%",
  },
  markerStatus: {
    position: "absolute",
    bottom: -5,
    paddingHorizontal: scaleWidth(6),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleWidth(10),
    borderWidth: 2,
    borderColor: "white",
  },
  markerStatusText: {
    color: "white",
    fontSize: scaleWidth(8),
    fontFamily: "poppins_semibold",
  },
  markerPin: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#FF7F50",
    transform: [{ rotate: "180deg" }],
    marginTop: -2,
  },
  markerPinInner: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#FF7F50",
    position: "absolute",
    top: 2,
    left: -4,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  backdropTouchable: {
    flex: 1,
  },
  bottomSheetContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F0F4F8",
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
    paddingBottom: Platform.OS === "ios" ? scaleHeight(40) : scaleHeight(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 20,
    zIndex: 2,
  },
  bottomSheetHeader: {
    alignItems: "center",
    paddingVertical: scaleHeight(12),
  },
  bottomSheetHandle: {
    width: scaleWidth(40),
    height: scaleHeight(5),
    backgroundColor: "#CCCCCC",
    borderRadius: scaleWidth(2.5),
  },
  bottomSheetHandleBar: {
    width: "100%",
    height: "100%",
  },
  restaurantCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(12),
    marginHorizontal: scaleWidth(16),
    padding: scaleWidth(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImageContainer: {
    width: scaleWidth(80),
    height: scaleWidth(80),
    borderRadius: scaleWidth(8),
    overflow: "hidden",
    position: "relative",
  },
  restaurantImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  ratingBadge: {
    position: "absolute",
    bottom: scaleHeight(4),
    left: scaleWidth(4),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: scaleWidth(6),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleWidth(4),
  },
  ratingText: {
    color: "#FFFFFF",
    fontSize: scaleWidth(10),
    fontFamily: "poppins_semibold",
    marginLeft: scaleWidth(2),
  },
  closedBadge: {
    position: "absolute",
    top: scaleHeight(4),
    right: scaleWidth(4),
    backgroundColor: "#F44336",
    paddingHorizontal: scaleWidth(6),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleWidth(4),
  },
  closedText: {
    color: "#FFFFFF",
    fontSize: scaleWidth(8),
    fontFamily: "poppins_semibold",
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: scaleWidth(12),
  },
  restaurantName: {
    fontSize: scaleWidth(16),
    fontFamily: "poppins_semibold",
    color: "#333333",
    marginBottom: scaleHeight(2),
  },

  restaurantAddress: {
    fontSize: scaleWidth(12),
    fontFamily: "poppins_regular",
    color: "#757575",
    marginBottom: scaleHeight(8),
  },
  restaurantDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(8),
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scaleWidth(12),
  },
  detailText: {
    fontSize: scaleWidth(12),
    fontFamily: "poppins_regular",
    color: "#757575",
    marginLeft: scaleWidth(4),
  },
  specialtiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  specialtyBadge: {
    backgroundColor: "rgba(255, 127, 80, 0.1)",
    borderRadius: scaleWidth(4),
    paddingVertical: scaleHeight(2),
    paddingHorizontal: scaleWidth(6),
    marginRight: scaleWidth(6),
    marginBottom: scaleHeight(4),
  },
  specialtyText: {
    fontSize: scaleWidth(10),
    fontFamily: "poppins_regular",
    color: "#FF7F50",
  },
  arrowContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: scaleWidth(8),
  },
  businessTypeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E3F2FD",
    borderRadius: scaleWidth(4),
    paddingVertical: scaleHeight(4),
    paddingHorizontal: scaleWidth(8),
    marginTop: scaleHeight(12),
    marginLeft: scaleWidth(16),
  },
  businessTypeText: {
    fontSize: scaleWidth(12),
    fontFamily: "poppins_semibold",
    color: "#1976D2",
  },
  openingHoursContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(8),
    marginLeft: scaleWidth(16),
  },
  openingHoursText: {
    fontSize: scaleWidth(12),
    fontFamily: "poppins_regular",
    color: "#757575",
    marginLeft: scaleWidth(4),
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(16),
    marginHorizontal: scaleWidth(16),
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7F50",
    borderRadius: scaleWidth(8),
    paddingVertical: scaleHeight(10),
    marginHorizontal: scaleWidth(4),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: scaleWidth(12),
    fontFamily: "poppins_semibold",
    marginLeft: scaleWidth(4),
  },
})

export default ViewMap

