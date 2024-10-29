import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import List from "../../components/viewScreens/List";
import chatpate from "../../assets/chatapate.jpeg";
import momo from "../../assets/momo.jpeg";
import noodles from "../../assets/noodles.jpeg";
import TopBar from "../../components/viewScreens/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import { scaleHeight } from "../../Scaling";

const Favourite = ({ navigation }) => {
  const foodData = [
    {
      price: "$5.00",
      foodName: "Chatpate",
      restaurantName: "Food Corner",
      image: { image1: chatpate, image2: momo, image3: noodles },
      isLoveNeeded: true,
    },
    {
      price: "$5.00",
      foodName: "Chatpate",
      restaurantName: "Food Corner",
      image: { image1: chatpate, image2: momo, image3: noodles },
      isLoveNeeded: true,
    },
    {
      price: "$5.00",
      foodName: "Chatpate",
      restaurantName: "Food Corner",
      image: chatpate,
      isLoveNeeded: true,
    },
    {
      price: "$5.00",
      foodName: "Chatpate",
      restaurantName: "Food Corner",
      image: chatpate,
      isLoveNeeded: true,
    },
  ];

  return (
    <SafeAreaView style={ownstyles.safeArea}>
      <StatusBar hidden={false} backgroundColor="#F0F4F8" style="dark" />
      <View style={ownstyles.homeScreen}>
        <TopBar navigation={navigation} top_title="Favorite" />

        <ScrollView style={ownstyles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={ownstyles.contentContainer}>
            {foodData.map((item, index) => (
              <List
                key={index}
                price={item.price}
                foodName={item.foodName}
                restaurantName={item.restaurantName}
                images={item.image}
                navigation={navigation}
              />
            ))}
          </View>
        </ScrollView>
        
      </View>
    </SafeAreaView>
  );
};

const ownstyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  homeScreen: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#F0F4F8",
    flex: 1,
  },
  contentContainer: {
    gap: scaleHeight(10),
    alignItems: "center",
  },
});

export default Favourite;