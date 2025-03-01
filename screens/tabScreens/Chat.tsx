import { View, Text, Dimensions, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import TopBar from "../../components/viewScreens/TopBar";
import RestaurantMsg from "../../components/chat/RestaurantMsg";
import { ScrollView } from "react-native-gesture-handler";
import { scaleHeight } from "../../Scaling";

const { width, height } = Dimensions.get("window");

const Chat = ({ navigation }) => {
  // const renderItem = ({ item }) => <RestaurantMsg navigation={navigation} />

  return (
    <SafeAreaView style={{ backgroundColor: "#F0F4F8" }}>
      <TopBar navigation={navigation} top_title="Messages" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingBottom: scaleHeight(45),
          }}
        >
          {Array(12)
            .fill(null)
            .map((_, index) => (
              <RestaurantMsg key={index} navigation={navigation} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Chat;
