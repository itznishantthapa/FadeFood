import React, { useState, useContext, useRef } from "react";
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
import SnackBar from "./SnackBar";
import { myContext } from "../../context/AppProvider";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const ViewFood = ({ navigation }) => {

  const { snackBar, state,dispatch, setsnackBar } = useContext(myContext);


  const [isFavorite, setIsFavorite] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [onCheckout, setonCheckout] = useState(false);
  const handleSearchScreen = () => {
    navigation.navigate("SearchScreen");
  };
  const handleCheckoutButton = () => {
    console.log("Checkout Button Pressed");
  };
  const handleAddtoList = () => {
    setonCheckout(true);
  };
  const handleToRestaurantProfile = () => {
    navigation.navigate('RestaurantProfile')
  }





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
    dispatch({type:'snackmessage',payload:'Added to Favorites'})
    // setmessage("Added to Favorites")
    setTimeout(() => setsnackBar(false), 3000);



    setIsFavorite(!isFavorite);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={false} backgroundColor="#F0F4F8" style="dark" />
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
          <BigImage toggleFavorite={toggleFavorite} scaleAnim={scaleAnim} isFavorite={isFavorite} />
          <View style={ownstyles.restaurantInfo}>
            <ItemName
              foodName={"Momo"}
              fontsize={26}
            />
            <View style={ownstyles.priceSection}>
              <Price priceFontSize={24} price={200}></Price>
              {onCheckout ? (
                <TouchableOpacity
                  style={[
                    ownstyles.addToListButton,
                    { backgroundColor: "#4CAF50" },
                  ]}
                  onPress={handleCheckoutButton}
                >
                  <Text style={ownstyles.buttonText}>Go for Checkout</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={ownstyles.addToListButton}
                  onPress={handleAddtoList}
                >
                  <Text style={ownstyles.buttonText}>Add to List</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Restaurant Details */}
            <View style={ownstyles.restaurantDetails} >
              <TouchableOpacity onPress={handleToRestaurantProfile} >
                <Text style={ownstyles.restaurantName}>Delicious Restaurant</Text>
              </TouchableOpacity>
              <Text style={ownstyles.restaurantAddress}>
                123 Food Street, Foodville
              </Text>

              <View style={ownstyles.ratingContainer}>
                <Text style={ownstyles.rating}>4.5 ★</Text>
                <Text style={ownstyles.ratingCount}>(234 reviews)</Text>
              </View>
            </View>

            {/* Review Section */}
            <View style={ownstyles.reviewSection}>
              <View style={ownstyles.reviewHeader}>
                <Text style={ownstyles.reviewTitle}>Reviews</Text>
                <TouchableOpacity>
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

          <View style={[styles.foodItems_container]}>
            <View style={{ width: "50%", alignItems: "center" }}>
              {Array(5)
                .fill(null)
                .map((item, index) => (
                  <FoodCard
                    key={index}
                    food_picture={null}
                    price={112}
                    discount={null}
                    foodName={"Chowmin"}
                    no_fragments={null}
                    eatsNumber={22}
                    rating={3}
                    location={null}
                    handleToFoodViewPage={undefined}
                  />
                ))}
            </View>
            <View style={{ width: "50%", alignItems: "center" }}>
              {Array(5)
                .fill(null)
                .map((item, index) => (
                  <FoodCard
                    key={index}
                    food_picture={null}
                    price={112}
                    discount={null}
                    foodName={"Chowmin"}
                    no_fragments={null}
                    eatsNumber={22}
                    rating={3}
                    location={null}
                    handleToFoodViewPage={undefined}
                  />
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <SnackBar message={state.message} visible={snackBar} />
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
