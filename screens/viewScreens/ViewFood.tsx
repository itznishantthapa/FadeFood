"use client"

import { useState, useContext, useRef, useEffect, useReducer } from "react"
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Share,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import NabBar from "../../components/home/NavBar"
import FoodCard from "../../components/home/FoodCard"
import BigImage from "../../components/viewScreens/BigImage"
import { scaleHeight, scaleWidth } from "../../Scaling"
import { myContext } from "../../context/AppProvider"
import { getRestaurantInformation } from "../../apis/getRestaurantInformation"
import PreOrderBottomSheet from "../../Payment/screens/PreOrderBottomSheet"
import { getRestaurantFood } from "../../apis/getRestaurantFood"
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons"
import { baseURL } from "../../service"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

const initial_food_details = {
  food_name: "",
  food_price: "",
  images: [],
  food_restaurant: "",
  food_location: "",
  rating: 0,
  is_available: false,
  reviews: 0,
  restaurant_name: null,
  description: "Delicious food prepared with fresh ingredients and authentic spices.",
  preparation_time: 25,
  is_vegetarian: false,
  ingredients: ["Fresh vegetables", "Spices", "Herbs", "Sauce"],
  nutritional_info: {
    calories: 350,
    protein: "15g",
    carbs: "45g",
    fat: "12g",
  },
}

const food_details_reducer = (state, action) => {
  switch (action.type) {
    case "SET_FOOD_DETAILS":
      return {
        ...state,
        restaurant_name: action.payload.restaurant_name,
        food_name: action.payload.food_name,
        food_price: action.payload.food_price,
        images: action.payload.images,
        food_restaurant: action.payload.food_restaurant,
        food_location: action.payload.food_location,
        rating: action.payload.rating,
        is_available: action.payload.is_available,
        reviews: action.payload.reviews,
        description: action.payload.description || state.description,
        preparation_time: action.payload.preparation_time || state.preparation_time,
        is_vegetarian: action.payload.is_vegetarian || state.is_vegetarian,
      }
    default:
      return state
  }
}

const ViewFood = ({ navigation, route }) => {
  const {
    snackBar,
    state,
    dispatch,
    setsnackBar,
    seller_dispatch,
    initialseller_state,
    food_state,
    seller_state,
    restaurantFoodDispatch,
    restaurantFoodState,
  } = useContext(myContext)

  const [isFavorite, setIsFavorite] = useState(false)
  const [food_details_state, food_details_dispatch] = useReducer(food_details_reducer, initial_food_details)
  const [preOrderVisible, setPreOrderVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [expandedDescription, setExpandedDescription] = useState(false)

  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current
  const scrollY = useRef(new Animated.Value(0)).current
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  })

  // Get food details from route params and fetch restaurant details
  useEffect(() => {
    food_details_dispatch({ type: "SET_FOOD_DETAILS", payload: route.params.food_details })
    fetchRestaurantDetails(route.params.food_details.restaurant_name)
  }, [route.params.food_details])

  // Navigation handlers
  const handleSearchScreen = () => {
    navigation.navigate("SearchScreen")
  }

  const handlePreorderButton = () => {
    setPreOrderVisible(true)
  }

  const handleClosePreOrder = () => {
    setPreOrderVisible(false)
  }

  const handleToRestaurantProfile = () => {
    navigation.navigate("RestaurantProfile", {
      restaurant: seller_state,
      foodItems: restaurantFoodState,
    })
  }

  // Fetch restaurant details and food items
  const fetchRestaurantDetails = (restaurantId) => {
    setLoading(true)
    getRestaurantInformation(seller_dispatch, restaurantId, initialseller_state)
    getRestaurantFood(restaurantFoodDispatch, restaurantId).finally(() => setLoading(false))
  }

  // Toggle favorite with animation
  const toggleFavorite = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start()

    setsnackBar(true)
    dispatch({ type: "snackmessage", payload: isFavorite ? "Removed from Favorites" : "Added to Favorites" })
    setTimeout(() => setsnackBar(false), 3000)

    setIsFavorite(!isFavorite)
  }

  // Share food item
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this delicious ${food_details_state.food_name} from ${food_details_state.food_restaurant}!`,
        title: `${food_details_state.food_name} at ${food_details_state.food_restaurant}`,
      })
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  // Filter similar items (items from the same restaurant excluding current item)
  const similarItems = restaurantFoodState
    .filter((item) => item.food_name !== food_details_state.food_name)
    .slice(0, 10)

  // Render similar food item
  const renderSimilarItem = ({ item, index }) => (
    <View style={styles.similarItemContainer}>
      <FoodCard
        item={item}
        handleToFoodViewPage={() => {
          navigation.replace("ViewFood", { food_details: item })
        }}
        onAddToCart={() => {
          setPreOrderVisible(true)
          food_details_dispatch({ type: "SET_FOOD_DETAILS", payload: item })
        }}
      />
    </View>
  )

  // Render empty state for similar items
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialIcons name="restaurant" size={64} color="#E0E0E0" />
      <Text style={styles.emptyStateText}>No similar items found</Text>
    </View>
  )

  // Render list header component (food details)
  const renderListHeader = () => (
    <View style={styles.listHeader}>
      {/* Food Image Section - Using the provided BigImage component */}
      <BigImage
        toggleFavorite={toggleFavorite}
        scaleAnim={scaleAnim}
        isFavorite={isFavorite}
        images={food_details_state.images}
        onShare={handleShare}
      />

      {/* Food Info Section - Positioned below the BigImage */}
      <View style={styles.infoContainer}>
        {/* Prominent Food Name and Price Card */}
        <View style={styles.nameAndPrice}>
          <View style={styles.nameContainer}>
            <Text style={styles.foodName}>{food_details_state.food_name}</Text>
            {food_details_state.is_vegetarian && (
              <View style={styles.vegBadge}>
                <Ionicons name="leaf" size={16} color="#4CAF50" />
                <Text style={styles.vegText}>Vegetarian</Text>
              </View>
            )}
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>₹{food_details_state.food_price}</Text>
          </View>
        </View>

        {/* Enhanced Quick Info */}
        <View style={styles.quickInfoContainer}>
          <View style={styles.quickInfoItem}>
            <Ionicons name="time-outline" size={20} color="#4CAF50" />
            <Text style={styles.quickInfoText}>{food_details_state.preparation_time} min</Text>
          </View>
          <View style={styles.quickInfoItem}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.quickInfoText}>{food_details_state.rating}</Text>
            <Text style={styles.reviewCount}>({food_details_state.reviews})</Text>
          </View>
          <View style={styles.quickInfoItem}>
            <Ionicons name="eye-outline" size={20} color="#2196F3" />
            <Text style={styles.quickInfoText}>250+ views</Text>
          </View>
        </View>

        {/* Order Button */}
        <TouchableOpacity style={styles.orderButton} onPress={handlePreorderButton} activeOpacity={0.8}>
          <Ionicons name="restaurant-outline" size={20} color="#FFFFFF" style={styles.orderButtonIcon} />
          <Text style={styles.orderButtonText}>Start Cooking</Text>
        </TouchableOpacity>

        {/* Restaurant Info */}
        <TouchableOpacity style={styles.restaurantCard} onPress={handleToRestaurantProfile} activeOpacity={0.8}>
          <View style={styles.restaurantImageContainer}>
            {seller_state.logo ? (
              <Image source={{ uri: `${baseURL}${seller_state.logo}` }} style={styles.restaurantImage} />
            ) : (
              <View style={styles.restaurantImagePlaceholder}>
                <Ionicons name="restaurant" size={24} color="#FFFFFF" />
              </View>
            )}
          </View>
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{food_details_state.food_restaurant}</Text>
            <Text style={styles.restaurantLocation}>{food_details_state.food_location}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#757575" />
        </TouchableOpacity>

        {/* Tabs for Details */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "description" && styles.activeTab]}
            onPress={() => setActiveTab("description")}
          >
            <Text style={[styles.tabText, activeTab === "description" && styles.activeTabText]}>Description</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "ingredients" && styles.activeTab]}
            onPress={() => setActiveTab("ingredients")}
          >
            <Text style={[styles.tabText, activeTab === "ingredients" && styles.activeTabText]}>Ingredients</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "nutrition" && styles.activeTab]}
            onPress={() => setActiveTab("nutrition")}
          >
            <Text style={[styles.tabText, activeTab === "nutrition" && styles.activeTabText]}>Nutrition</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === "description" && (
            <View>
              <Text style={styles.descriptionText} numberOfLines={expandedDescription ? undefined : 3}>
                {food_details_state.description}
              </Text>
              {food_details_state.description && food_details_state.description.length > 100 && (
                <TouchableOpacity
                  style={styles.readMoreButton}
                  onPress={() => setExpandedDescription(!expandedDescription)}
                >
                  <Text style={styles.readMoreText}>{expandedDescription ? "Read Less" : "Read More"}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {activeTab === "ingredients" && (
            <View style={styles.ingredientsList}>
              {food_details_state.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          )}

          {activeTab === "nutrition" && (
            <View style={styles.nutritionContainer}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Calories</Text>
                <Text style={styles.nutritionValue}>{food_details_state.nutritional_info.calories}</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Protein</Text>
                <Text style={styles.nutritionValue}>{food_details_state.nutritional_info.protein}</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Carbs</Text>
                <Text style={styles.nutritionValue}>{food_details_state.nutritional_info.carbs}</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Fat</Text>
                <Text style={styles.nutritionValue}>{food_details_state.nutritional_info.fat}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Reviews Preview */}
        <View style={styles.reviewsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Customer Reviews</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SeeReview")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewerInfo}>
                <View style={styles.reviewerAvatar}>
                  <Text style={styles.reviewerInitial}>J</Text>
                </View>
                <View>
                  <Text style={styles.reviewerName}>John D.</Text>
                  <View style={styles.reviewRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <AntDesign key={star} name={star <= 4 ? "star" : "staro"} size={14} color="#FFD700" />
                    ))}
                  </View>
                </View>
              </View>
              <Text style={styles.reviewDate}>2 days ago</Text>
            </View>
            <Text style={styles.reviewText}>
              Amazing food! The taste was perfect and the service was excellent. Will definitely order again.
            </Text>
          </View>
        </View>

        {/* Similar Items Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>You May Also Like</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RestaurantProfile", {
                restaurant: seller_state,
                foodItems: restaurantFoodState,
              })
            }
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {food_details_state.food_name}
          </Text>
          <View style={styles.headerRight} />
        </View>
      </Animated.View>

      {/* Navigation Bar */}
      <NabBar handleSearchScreen={handleSearchScreen} isBack={true} navigation={navigation} isTextInput={false} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading food details...</Text>
        </View>
      ) : (
        <FlatList
          data={similarItems}
          renderItem={renderSimilarItem}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
          scrollEventThrottle={16}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}

      {/* Pre-Order Bottom Sheet */}
      <PreOrderBottomSheet
        isVisible={preOrderVisible}
        onClose={handleClosePreOrder}
        foodItem={food_details_state}
        navigation={navigation}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  animatedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "rgba(76, 175, 80, 0.95)",
    paddingTop: scaleHeight(40),
    paddingBottom: scaleHeight(10),
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(16),
  },
  headerTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(18),
    color: "#FFFFFF",
    flex: 1,
    textAlign: "center",
    marginHorizontal: scaleWidth(10),
  },
  headerRight: {
    width: scaleWidth(24),
  },
  flatListContent: {
    paddingBottom: scaleHeight(20),
  },
  listHeader: {
    backgroundColor: "#F8F9FA",
  },
  infoContainer: {
    padding: scaleWidth(16),
    backgroundColor: "#F8F9FA",
    position: "relative",
    marginTop: scaleHeight(-20),
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
  },
  nameAndPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleHeight(16),
    backgroundColor: "#FFFFFF",
    padding: scaleWidth(16),
    borderRadius: scaleWidth(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginTop: scaleHeight(10),
  },
  nameContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  foodName: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(22),
    color: "#333333",
    marginBottom: scaleHeight(4),
  },
  vegBadge: {
    backgroundColor: "#E8F5E9",
    padding: scaleWidth(6),
    borderRadius: scaleWidth(6),
    marginTop: scaleHeight(4),
    flexDirection: "row",
    alignItems: "center",
  },
  vegText: {
    color: "#4CAF50",
    marginLeft: scaleWidth(4),
    fontFamily: "poppins_medium",
    fontSize: scaleWidth(12),
  },
  quickInfoContainer: {
    flexDirection: "row",
    marginBottom: scaleHeight(16),
    backgroundColor: "#F5F5F5",
    padding: scaleWidth(12),
    borderRadius: scaleWidth(10),
    justifyContent: "space-around",
  },
  quickInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(8),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  quickInfoText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#333333",
    marginLeft: scaleWidth(4),
  },
  reviewCount: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#757575",
    marginLeft: scaleWidth(4),
  },
  orderButton: {
    backgroundColor: "#4CAF50",
    borderRadius: scaleWidth(10),
    paddingVertical: scaleHeight(14),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scaleHeight(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderButtonIcon: {
    marginRight: scaleWidth(8),
  },
  orderButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#FFFFFF",
  },
  restaurantCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(12),
    padding: scaleWidth(12),
    marginBottom: scaleHeight(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  restaurantImageContainer: {
    marginRight: scaleWidth(12),
  },
  restaurantImage: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    borderRadius: scaleWidth(25),
  },
  restaurantImagePlaceholder: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    borderRadius: scaleWidth(25),
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#333333",
  },
  restaurantLocation: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: scaleHeight(16),
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    flex: 1,
    paddingVertical: scaleHeight(12),
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50",
  },
  tabText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
  },
  activeTabText: {
    fontFamily: "poppins_semibold",
    color: "#4CAF50",
  },
  tabContent: {
    marginBottom: scaleHeight(20),
  },
  descriptionText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
    lineHeight: scaleHeight(22),
  },
  readMoreButton: {
    marginTop: scaleHeight(8),
    alignSelf: "flex-start",
  },
  readMoreText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#4CAF50",
  },
  ingredientsList: {
    marginTop: scaleHeight(8),
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(8),
  },
  bulletPoint: {
    width: scaleWidth(6),
    height: scaleWidth(6),
    borderRadius: scaleWidth(3),
    backgroundColor: "#4CAF50",
    marginRight: scaleWidth(8),
  },
  ingredientText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
  },
  nutritionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: scaleHeight(8),
  },
  nutritionItem: {
    width: "50%",
    marginBottom: scaleHeight(12),
  },
  nutritionLabel: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
  },
  nutritionValue: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#333333",
    marginTop: scaleHeight(4),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleHeight(16),
  },
  sectionTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(18),
    color: "#333333",
  },
  seeAllText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#4CAF50",
  },
  reviewsContainer: {
    marginBottom: scaleHeight(24),
  },
  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(12),
    padding: scaleWidth(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: scaleHeight(12),
  },
  reviewerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewerAvatar: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(20),
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scaleWidth(12),
  },
  reviewerInitial: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#FFFFFF",
  },
  reviewerName: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#333333",
    marginBottom: scaleHeight(4),
  },
  reviewRating: {
    flexDirection: "row",
  },
  reviewDate: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#9E9E9E",
  },
  reviewText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
    lineHeight: scaleHeight(22),
  },
  emptyState: {
    padding: scaleHeight(40),
    alignItems: "center",
  },
  emptyStateText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#9E9E9E",
    marginTop: scaleHeight(16),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#757575",
    marginTop: scaleHeight(16),
  },
  priceContainer: {
    backgroundColor: "#E8F5E9",
    padding: scaleWidth(10),
    borderRadius: scaleWidth(8),
    alignItems: "center",
    justifyContent: "center",
  },
  priceText: {
    fontFamily: "poppins_bold",
    fontSize: scaleWidth(20),
    color: "#4CAF50",
  },
  similarItemContainer: {
    width: "48%", // Slightly less than 50% to account for spacing
    marginBottom: scaleHeight(16),
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(16),
  },
})

export default ViewFood

