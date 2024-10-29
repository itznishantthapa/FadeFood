import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
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

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const ViewFood = ({ navigation }) => {
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
        {/* Main Content Section - Full Viewport Height */}
        <View style={ownstyles.mainSection}>
          <BigImage />

          {/* Restaurant Info Section */}
          <View style={ownstyles.restaurantInfo}>
            <ItemName
              foodName={"Momo"}
              restaurantName={"Delicious Restaurant"}
              fontsize={26}
            />

            <View style={ownstyles.priceSection}>
              <Text style={ownstyles.price}>$15.99</Text>
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
            <View style={ownstyles.restaurantDetails}>
              <Text style={ownstyles.restaurantName}>Delicious Restaurant</Text>
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
    </SafeAreaView>
  );
};

const ownstyles = StyleSheet.create({
  mainSection: {
    minHeight: SCREEN_HEIGHT ,
    backgroundColor: "#fff",
    // backgroundColor: 'red',
  },
  restaurantInfo: {
    paddingHorizontal:8,
    width: "100%",
    // backgroundColor:'black'
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E2E2E",
  },
  addToListButton: {
    backgroundColor: "#333333",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  restaurantDetails: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E2E2E",
  },
  restaurantAddress: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFB800",
  },
  ratingCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  reviewSection: {
    marginTop: 24,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E2E2E",
  },
  seeAllButton: {
    color: "#FF6B6B",
    fontSize: 14,
    // fontFamily:'poppins_bold'
    fontWeight: "600",
  },
  reviewPreview: {
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 12,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E2E2E",
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  similarItemsSection: {
    backgroundColor: "#F8F8F8",
    // width:SCREEN_WIDTH
  },
  sectionTitle: {
    padding: 16,
    fontSize: 20,
    // fontWeight: 'bold',
    color: "#2E2E2E",
    marginBottom: 16,
    fontFamily: "poppins_bold",
  },
});

export default ViewFood;
