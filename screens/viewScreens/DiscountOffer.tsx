"use client"

import { useCallback, useContext, useEffect, useRef, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  FlatList,
  Dimensions,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "react-native"
import { Ionicons, FontAwesome5, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

import LottieView from "lottie-react-native"
import { scaleHeight, scaleWidth } from "../../Scaling"
import FoodCard from "../../components/home/FoodCard"
import { myContext } from "../../context/AppProvider"
import { useFocusEffect } from "@react-navigation/native"

const { width } = Dimensions.get("window")

// Mock data for discounted food items
const DISCOUNTED_FOODS = [
  {
    id: "1",
    name: "Chicken Biryani Special",
    restaurant_name: "Spice Garden",
    price: 250,
    discountedPrice: 200,
    discount: 20,
    rating: 4.5,
    preparation_time: 25,
    image: "/uploads/foods/biryani.jpg",
    isVeg: false,
    category: "Main Course",
  },
  {
    id: "2",
    name: "Paneer Butter Masala",
    restaurant_name: "Punjabi Tadka",
    price: 180,
    discountedPrice: 144,
    discount: 20,
    rating: 4.3,
    preparation_time: 20,
    image: "/uploads/foods/paneer.jpg",
    isVeg: true,
    category: "Main Course",
  },
  {
    id: "3",
    name: "Chocolate Brownie",
    restaurant_name: "Sweet Delights",
    price: 120,
    discountedPrice: 84,
    discount: 30,
    rating: 4.7,
    preparation_time: 10,
    image: "/uploads/foods/brownie.jpg",
    isVeg: true,
    category: "Dessert",
  },
  {
    id: "4",
    name: "Veg Spring Rolls",
    restaurant_name: "Asian Fusion",
    price: 150,
    discountedPrice: 105,
    discount: 30,
    rating: 4.2,
    preparation_time: 15,
    image: "/uploads/foods/springrolls.jpg",
    isVeg: true,
    category: "Appetizer",
  },
  {
    id: "5",
    name: "Chicken Noodles",
    restaurant_name: "Wok & Roll",
    price: 220,
    discountedPrice: 176,
    discount: 20,
    rating: 4.4,
    preparation_time: 18,
    image: "/uploads/foods/noodles.jpg",
    isVeg: false,
    category: "Main Course",
  },
  {
    id: "6",
    name: "Mango Shake",
    restaurant_name: "Juice Junction",
    price: 100,
    discountedPrice: 70,
    discount: 30,
    rating: 4.6,
    preparation_time: 8,
    image: "/uploads/foods/mangoshake.jpg",
    isVeg: true,
    category: "Drinks",
  },
]

// Group food items by discount percentage
const groupByDiscount = (items) => {
  const grouped = {}

  items.forEach((item) => {
    if (!grouped[item.discount]) {
      grouped[item.discount] = []
    }
    grouped[item.discount].push(item)
  })

  return Object.entries(grouped).sort((a, b) => Number.parseInt(b[0]) - Number.parseInt(a[0])) // Sort by highest discount first
}

const DiscountOffer = ({ navigation, route }) => {

    useFocusEffect(
        useCallback(() => {
          StatusBar.setBackgroundColor('#1B5E20');
          StatusBar.setBarStyle('light-content');
    
          return () => {
            StatusBar.setBackgroundColor('#ffffff'); 
            StatusBar.setBarStyle('dark-content');
          };
        }, [])
      );
    const { food_state, snackBar, setsnackBar, state } = useContext(myContext)
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  const translateYAnim = useRef(new Animated.Value(50)).current
  const rotateAnim = useRef(new Animated.Value(0)).current
  const confettiOpacity = useRef(new Animated.Value(1)).current

  // Refs for lottie animations
  const confettiRef = useRef(null)

  // State for active category
  const [activeCategory, setActiveCategory] = useState("All")

  // Filter foods by category
  const filteredFoods =
    activeCategory === "All" ? DISCOUNTED_FOODS : DISCOUNTED_FOODS.filter((food) => food.category === activeCategory)

  // Get unique categories
  const categories = ["All", ...new Set(DISCOUNTED_FOODS.map((food) => food.category))]

  // Group foods by discount
  const groupedByDiscount = groupByDiscount(filteredFoods)

  // Start animations when component mounts
  useEffect(() => {
    // Play confetti animation
    if (confettiRef.current) {
      confettiRef.current.play()
    }

    // Animate header elements
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1)),
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ),
    ]).start()

    // Fade out confetti after 5 seconds
    Animated.timing(confettiOpacity, {
      toValue: 0,
      duration: 1000,
      delay: 5000,
      useNativeDriver: true,
    }).start()
  }, [])

  // Calculate rotation for the star icon
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  // Handle food card press
  const handleFoodPress = (food) => {
    navigation.navigate("ViewFood", { food })
  }

  // Render food card with discount label
  const renderFoodCard = (item) => {
    return (
      <View style={styles.foodCardContainer}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}% OFF</Text>
        </View>
        <FoodCard item={item} handleToFoodViewPage={() => handleFoodPress(item)} onAddToCart={() => handleFoodPress(item)} />
      </View>
    )
  }

  // Render category pill
  const renderCategoryPill = (category) => (
    <TouchableOpacity
      key={category}
      style={[styles.categoryPill, activeCategory === category && styles.activeCategoryPill]}
      onPress={() => setActiveCategory(category)}
    >
      <Text style={[styles.categoryText, activeCategory === category && styles.activeCategoryText]}>{category}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar hidden={false} backgroundColor="#1B5E20" barStyle="light-content" />

      {/* Confetti Animation */}
      <Animated.View style={[styles.confettiContainer, { opacity: confettiOpacity }]}>
        <LottieView
          ref={confettiRef}
          source={require("../../assets/animation/blasting.json")}
          style={styles.confetti}
          autoPlay={false}
          loop={false}
        />
      </Animated.View>

      {/* Header */}
      <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.titleContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
              },
            ]}
          >
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <FontAwesome5 name="star" size={24} color="#FFD700" style={styles.starIcon} />
            </Animated.View>
            <Text style={styles.titleText}>Special Offers</Text>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <FontAwesome5 name="star" size={24} color="#FFD700" style={styles.starIcon} />
            </Animated.View>
          </Animated.View>

          <Animated.Text
            style={[
              styles.subtitleText,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }],
              },
            ]}
          >
            Limited time discounts on your favorite foods!
          </Animated.Text>
        </View>
      </LinearGradient>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {categories.map(renderCategoryPill)}
        </ScrollView>
      </View>

      {/* Food Items */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {groupedByDiscount.length > 0 ? (
          groupedByDiscount.map(([discount, foods]) => (
            <View key={discount} style={styles.discountSection}>
              <View style={styles.discountHeader}>
                <MaterialCommunityIcons name="sale" size={24} color="#4CAF50" />
                <Text style={styles.discountSectionTitle}>{discount}% OFF</Text>
              </View>

              <FlatList
                data={food_state}
                renderItem={({ item }) => renderFoodCard(item)}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                numColumns={1}
              />
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="food-off" size={64} color="#E0E0E0" />
            <Text style={styles.emptyText}>No discounted items found</Text>
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("Home")}>
        <AntDesign name="home" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  confettiContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    pointerEvents: "none",
  },
  confetti: {
    width: "100%",
    height: "100%",
  },
  header: {
    paddingTop: scaleHeight(20),
    paddingBottom: scaleHeight(30),
    borderBottomLeftRadius: scaleWidth(20),
    borderBottomRightRadius: scaleWidth(20),
  },
  headerContent: {
    paddingHorizontal: scaleWidth(16),
  },
  backButton: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(20),
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scaleHeight(16),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scaleHeight(8),
  },
  titleText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(28),
    color: "#FFFFFF",
    marginHorizontal: scaleWidth(12),
    textAlign: "center",
  },
  starIcon: {
    marginHorizontal: scaleWidth(8),
  },
  subtitleText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#E0E0E0",
    textAlign: "center",
    marginBottom: scaleHeight(8),
  },
  categoriesContainer: {
    marginTop: scaleHeight(-20),
    zIndex: 1,
  },
  categoriesScrollContent: {
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(8),
  },
  categoryPill: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(8),
    borderRadius: scaleWidth(20),
    marginRight: scaleWidth(8),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeCategoryPill: {
    backgroundColor: "#4CAF50",
  },
  categoryText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
  },
  activeCategoryText: {
    fontFamily: "poppins_semibold",
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: scaleWidth(16),
    paddingTop: scaleHeight(16),
  },
  discountSection: {
    marginBottom: scaleHeight(24),
  },
  discountHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(12),
  },
  discountSectionTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(18),
    color: "#333333",
    marginLeft: scaleWidth(8),
  },
  foodCardContainer: {
    position: "relative",
    marginBottom: scaleHeight(16),
  },
  discountBadge: {
    position: "absolute",
    top: scaleHeight(10),
    right: scaleWidth(10),
    backgroundColor: "#FF6B6B",
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(4),
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    transform: [{ rotate: "5deg" }],
  },
  discountText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(12),
    color: "#FFFFFF",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scaleHeight(50),
  },
  emptyText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#9E9E9E",
    marginTop: scaleHeight(16),
  },
  bottomSpacing: {
    height: scaleHeight(80),
  },
  fab: {
    position: "absolute",
    bottom: scaleHeight(20),
    right: scaleWidth(20),
    width: scaleWidth(56),
    height: scaleWidth(56),
    borderRadius: scaleWidth(28),
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
})

export default DiscountOffer

