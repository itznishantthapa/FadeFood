import React, { useState, useContext, useRef, useEffect, useReducer, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import NabBar from "../../components/home/NavBar";
import FoodCard from "../../components/home/FoodCard";
import BigImage from "../../components/viewScreens/BigImage";
import ItemName from "../../components/viewScreens/ItemName";
import { styles } from "../../style/style";
import { scaleHeight, scaleWidth } from "../../Scaling";
import Price from "../../components/viewScreens/Price";
import { TouchableOpacity } from "react-native-gesture-handler";
import { myContext } from "../../context/AppProvider";
import { get_data, get_data_with_id } from "../../service";
import { getRestaurantInformation } from "../../apis/getRestaurantInformation";
import PreOrderBottomSheet from "./PreOrderBottomSheet";
import { useFocusEffect } from "@react-navigation/native";


const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

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
}
const food_details_reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FOOD_DETAILS':
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
      }
    default:
      return state;
  }
}
const ViewFood = ({ navigation, route }) => {

  const { snackBar, state, dispatch, setsnackBar, seller_dispatch, initialseller_state, getting_restaurant_details,food_state,seller_state } = useContext(myContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [food_details_state, food_details_dispatch] = useReducer(food_details_reducer, initial_food_details);
  const [preOrderVisible, setPreOrderVisible] = useState(false);

  useEffect(() => {
    food_details_dispatch({ type: 'SET_FOOD_DETAILS', payload: route.params.food_details });
    console.log("routted---->", route.params.food_details)
  }, [route.params.food_details])

  useEffect(() => {
    fetchRestaurantDetails(food_details_state.restaurant_name);
   
  }, [food_details_state])

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleSearchScreen = () => {
    navigation.navigate("SearchScreen");
  };
  
  const handlePreorderButton = () => {
    setPreOrderVisible(true);
  };
  
  const handleClosePreOrder = () => {
    setPreOrderVisible(false);
  };
  
  const handleAddtoList = () => {
    // setonCheckout(true);
  };
  
  const handleToRestaurantProfile = () => {
    navigation.navigate('RestaurantProfile', {
      restaurant: seller_state,
      foodItems: food_state
    });
  }

  // const { isLoading, setisLoading, snackBar, setsnackBar, initialseller_state, dispatch, state, seller_state, seller_dispatch, food_state, food_dispatch } = useContext(myContext);
  // const { restaurant_id } = route.params;


  // export const getRestaurantInformation = async (seller_dispatch,id,initialseller_state)
  const fetchRestaurantDetails = async (restaurantId) => {
    //food_details_state.restaurant_name is the restaurant_id
      await getRestaurantInformation(seller_dispatch,restaurantId,initialseller_state)
      console.log('-----------restaurant_name by Restaurant Profile>>---------------------------',restaurantId);
  };


  // const handleToRestaurantProfile = () => {
  //   navigation.navigate('RestaurantProfile', { restaurant_id: food_details_state.restaurant_name });
  // }



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
    ]).start();

    setsnackBar(true)
    dispatch({ type: 'snackmessage', payload: 'Added to Favorites' })
    setTimeout(() => setsnackBar(false), 3000);

    setIsFavorite(!isFavorite);
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NabBar
        handleSearchScreen={handleSearchScreen}
        isBack={true}
        navigation={navigation}
        isTextInput={false}
      />

      <ScrollView
        style={{ flex: 1 }}
        nestedScrollEnabled={true}
        overScrollMode="never"
        scrollEventThrottle={20}
        showsVerticalScrollIndicator={false}
      >
        <View style={ownstyles.mainSection}>
          <BigImage toggleFavorite={toggleFavorite} scaleAnim={scaleAnim} isFavorite={isFavorite} images={food_details_state.images} />
          <View style={ownstyles.restaurantInfo}>
            <ItemName
              foodName={food_details_state.food_name}
              fontsize={26}
            />
            <View style={ownstyles.priceSection}>
              <Price priceFontSize={24} price={food_details_state.food_price}></Price>
              <TouchableOpacity
                style={[
                  ownstyles.addToListButton,
                  { backgroundColor: "#4CAF50" },
                ]}
                onPress={handlePreorderButton}
              >
                <Text style={ownstyles.buttonText}>Pre-Order Now</Text>
              </TouchableOpacity>
            </View>

            {/* Restaurant Details */}
            <View style={ownstyles.restaurantDetails} >
              <TouchableOpacity onPress={handleToRestaurantProfile} >
                <Text style={ownstyles.restaurantName}>{food_details_state.food_restaurant}</Text>
              </TouchableOpacity>
              <Text style={ownstyles.restaurantAddress}>
                {food_details_state.food_location}
              </Text>

              <View style={ownstyles.ratingContainer}>
                <Text style={ownstyles.rating}>{food_details_state.rating} ★</Text>
                <Text style={ownstyles.ratingCount}>({food_details_state.reviews} reviews)</Text>
              </View>
            </View>

            {/* Review Section */}
            <View style={ownstyles.reviewSection}>
              <View style={ownstyles.reviewHeader}>
                <Text style={ownstyles.reviewTitle}>Reviews</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SeeReview")}>
                  <Text style={ownstyles.seeAllButton}>See All Reviews</Text>
                </TouchableOpacity>
              </View>

              {/* Preview of latest review */}
              <View style={ownstyles.reviewPreview}>
                <Text style={ownstyles.reviewerName}>John D.</Text>
                <Text style={ownstyles.reviewText} numberOfLines={2}>
                  "Amazing momos! The sauce was perfect and the service was
                  excellent..."
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Similar Items Section */}
        <View style={ownstyles.similarItemsSection}>
          <Text style={ownstyles.sectionTitle}>You May Also Like</Text>
        </View>
      </ScrollView>
      
      {/* Pre-Order Bottom Sheet */}
      <PreOrderBottomSheet 
        visible={preOrderVisible} 
        onClose={handleClosePreOrder} 
        foodDetails={food_details_state}
        navigation={navigation}
      />
      
    </SafeAreaView>
  );
};
const ownstyles = StyleSheet.create({
  mainSection: {
    minHeight: SCREEN_HEIGHT - scaleHeight(60),
    backgroundColor: "#F0F4F8",
  },
  restaurantInfo: {
    paddingHorizontal: 8,
    width: "100%",
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scaleHeight(12),
  },
  price: {
    fontSize: scaleWidth(18),
    fontWeight: "bold",
    color: "#2E2E2E",
  },
  addToListButton: {
    backgroundColor: "#333333",
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(10),
    borderRadius: scaleWidth(25),
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: scaleWidth(14),
  },
  restaurantDetails: {
    marginTop: scaleHeight(24),
    padding: scaleWidth(16),
    backgroundColor: "#F8F8F8",
    borderRadius: scaleWidth(12),
    alignItems: 'flex-start'
  },
  restaurantName: {
    fontSize: scaleWidth(20),
    fontWeight: "bold",
    color: "#2E2E2E",
  },
  restaurantAddress: {
    fontSize: scaleWidth(14),
    color: "#666",
    marginTop: scaleHeight(4),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(8),
  },
  rating: {
    fontSize: scaleWidth(16),
    fontWeight: "bold",
    color: "#FFB800",
  },
  ratingCount: {
    fontSize: scaleWidth(14),
    color: "#666",
    marginLeft: scaleWidth(8),
  },
  reviewSection: {
    marginTop: scaleHeight(24),
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleHeight(12),
  },
  reviewTitle: {
    fontSize: scaleWidth(18),
    fontWeight: "bold",
    color: "#2E2E2E",
  },
  seeAllButton: {
    color: "#FF6B6B",
    fontSize: scaleWidth(14),
    fontWeight: "600",
  },
  reviewPreview: {
    backgroundColor: "#F8F8F8",
    padding: scaleWidth(16),
    borderRadius: scaleWidth(12),
  },
  reviewerName: {
    fontSize: scaleWidth(14),
    fontWeight: "600",
    color: "#2E2E2E",
    marginBottom: scaleHeight(4),
  },
  reviewText: {
    fontSize: scaleWidth(14),
    color: "#666",
    fontStyle: "italic",
  },
  similarItemsSection: {
    backgroundColor: "#F0F4F8",
  },
  sectionTitle: {
    padding: scaleWidth(16),
    fontSize: scaleWidth(20),
    color: "#2E2E2E",
    fontFamily: "poppins_bold",
  },
});

export default ViewFood;
