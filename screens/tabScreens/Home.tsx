"use client"

import { useState, useContext, useMemo, useCallback } from "react"
import { View, Text, Dimensions, StyleSheet, FlatList, RefreshControl, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar as ExpoStatusBar } from "expo-status-bar"

// Components
import NavBar from "../../components/home/NavBar"
import Greeting from "../../components/home/Greeting"
import SlickCarousel from "../../components/home/SlickCarousel"
import CategoriesRestaurant from "../../components/home/CategoriesRestaurant"
import Map from "../../components/home/Map"
import NearDishCard from "../../components/home/NearDishCard"
import FoodCard from "../../components/home/FoodCard"


// Context and Services
import { myContext } from "../../context/AppProvider"
import { scaleHeight, scaleWidth } from "../../Scaling"

// Assets
import categoryMOMO from "../../assets/images/categoryMOMO.png"
import categoryNoodles from "../../assets/images/categoryNoodles.png"
import categoryBurger from "../../assets/images/categoryBurger.png"
import categoryCake from "../../assets/images/categoryCake.png"
import categoryPizza from "../../assets/images/categoryPizza.png"
import categoryChicken from "../../assets/images/categoryChicken.png"

const { width, height } = Dimensions.get("window")

const Home = ({ navigation }) => {
  const { food_state, snackBar, setsnackBar, state } = useContext(myContext)
  const [refreshing, setRefreshing] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // Categories data
  const categories = [
    { image: categoryMOMO, name: "Momo" },
    { image: categoryNoodles, name: "Noodles" },
    { image: categoryBurger, name: "Burger" },
    { image: categoryPizza, name: "Pizza" },
    { image: categoryChicken, name: "Chicken" },
    { image: categoryCake, name: "Cake" },
  ]

  // Near me dishes data
  const nearDishes = [
    {
      image: categoryChicken,
      price: "1500",
      name: "Grilled Chicken",
      reviewsNumber: 20,
      rating: 4.5,
    },
    {
      image: categoryBurger,
      price: "300",
      name: "Burger",
      reviewsNumber: 200,
      rating: 4.5,
    },
    {
      image: categoryMOMO,
      price: "1500",
      name: "Momo",
      reviewsNumber: 20,
      rating: 4.5,
    },
    {
      image: categoryNoodles,
      price: "300",
      name: "Noodles",
      reviewsNumber: 200,
      rating: 4.5,
    },
    {
      image: categoryPizza,
      price: "1500",
      name: "Pizza",
      reviewsNumber: 20,
      rating: 4.5,
    },
    {
      image: categoryCake,
      price: "300",
      name: "Cake",
      reviewsNumber: 200,
      rating: 4.5,
    },
  ]

  // Memoize food data to prevent unnecessary re-renders
  const foodData = useMemo(() => {
    return food_state.map((item) => ({
      ...item,
      key: item.id.toString(),
    }))
  }, [food_state])

  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    // Implement your refresh logic here
    // For example: await fetchData();
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  // Navigation handlers
  const handleSearchScreen = () => {
    navigation.navigate("SearchScreen")
  }

  const handleToFoodViewPage = (item) => {
    navigation.navigate("ViewFood", { food_details: item })
  }

  // Render header components
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Greeting name={state.name} />
      <SlickCarousel />

      {/* Categories Section */}
      <View style={styles.categoriesSection}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Restaurant Categories</Text>
        </View>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `category-${index}`}
            renderItem={({ item }) => <CategoriesRestaurant dishImage={item.image} dishName={item.name} onPress={()=>{navigation.navigate("RestaurantCategories",{category:"Momo"})}}/>}
          contentContainerStyle={styles.categoriesContainer}
        />
      </View>

      {/* Map Section */}
      <View style={styles.mapSection}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Explore on maps</Text>
        </View>
        <Pressable  onPress={() => navigation.navigate("ViewMap")}>

        <Map />
        </Pressable>
      </View>

      {/* Near Me Section */}
      <View style={styles.nearMeSection}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Best Selling Items Near Me</Text>
        </View>
        <FlatList
          data={nearDishes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `near-dish-${index}`}
          renderItem={({ item }) => (
            <NearDishCard
              image={item.image}
              price={item.price}
              name={item.name}
              reiwesNumber={item.reviewsNumber}
              rating={item.rating}
              onPress={undefined}
            />
          )}
          contentContainerStyle={styles.nearDishesContainer}
        />
      </View>

      {/* Food Items Title */}
      <View style={styles.foodItemsTitleContainer}>
        <Text style={styles.sectionTitle}>Popular Food Items</Text>
      </View>
    </View>
  )

  // Render food item
  const renderFoodItem = ({ item }) => (
    <FoodCard item={item} handleToFoodViewPage={() => handleToFoodViewPage(item)} onAddToCart={() => {}} />
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* <ExpoStatusBar hidden={false} backgroundColor="#333" style="dark" /> */}
      <View style={styles.mainContainer}>
        <NavBar handleSearchScreen={handleSearchScreen} isTextInput={false} isBack={false} navigation={navigation} />

        <FlatList
          data={foodData}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.key}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#FF7F50"]} tintColor={"#FF7F50"} />
          }
          contentContainerStyle={styles.listContentContainer}
        />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    // paddingBottom: scaleHeight(10),
    alignItems: "center",
  },
  categoriesSection: {
    paddingVertical: scaleHeight(10),
    backgroundColor: "#F0F4F8",
    width: "100%",
  },
  sectionTitleContainer: {
    width: "100%",
    paddingHorizontal: scaleWidth(8),
    marginBottom: scaleHeight(5),
  },
  sectionTitle: {
    fontFamily: "poppins_bold",
    fontSize: scaleWidth(18),
    color: "#333333",
  },
  categoriesContainer: {
    paddingHorizontal: scaleWidth(8),
    gap: scaleWidth(10),
  },
  mapSection: {
    marginTop: scaleHeight(10),
    paddingBottom: scaleHeight(10),
  },
  nearMeSection: {
    // marginTop: scaleHeight(10),
    paddingVertical: scaleHeight(10),
    backgroundColor: "#F0F4F8",
    width: "100%",
  },
  nearDishesContainer: {
    paddingLeft: scaleWidth(20),
    paddingRight: scaleWidth(10),
    gap: scaleWidth(30),
    paddingVertical: scaleHeight(15),
  },
  foodItemsTitleContainer: {
    // paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(8),
    backgroundColor: "#F0F4F8", 
    alignItems:'flex-start',
    width: "100%",

  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(8),
    

  },
  listContentContainer: {
    paddingBottom: scaleHeight(80),
  },
})

export default Home

