import React, { useContext, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import List from "../../components/viewScreens/List";
import TopBar from "../../components/viewScreens/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";

import { scaleHeight, scaleWidth } from "../../Scaling";
import { myContext } from "../../context/AppProvider";

const FavouriteContent = ({ navigation }) => {

  const { food_state, seller_state } = useContext(myContext)

  const handleToFoodViewPage = (item) => {
    navigation.navigate("ViewFood", { food_details: item })
  }

  return (
    <SafeAreaView style={ownstyles.safeArea}>
      <View style={ownstyles.homeScreen}>
        <TopBar navigation={navigation} top_title="Favorite" withSettingIcons={undefined} handleSettingIcon={undefined} />
        <FlatList
          data={food_state}
          renderItem={({ item }) => (<List
            images={item.images}
            foodName={item.food_name}
            restaurantName={item.restaurant_name}
            price={item.food_price}
            navigation={navigation}
            withRestaurant={true}
            handlePressonList={()=>{handleToFoodViewPage(item)}}
            handleEditPen={undefined}
            preparationTime={undefined}
            rating={undefined}
            category={undefined}
          />)}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}

        />

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

export default FavouriteContent;