import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { scaleWidth } from "../../Scaling";

const ItemName = ({ foodName, restaurantName, fontsize }) => {
  return (
    <View style={styles.orderName}>
      <View style={styles.foodNameContainer}>
        <Text style={[styles.foodName, { fontSize: scaleWidth(fontsize) }]}>
          {foodName}
        </Text>
      </View>
    </View>
  );
};

export default ItemName;

const styles = StyleSheet.create({
  orderName: {
    width: "auto",
    height: "auto",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  foodNameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  foodName: {
    fontFamily: "jakarta_bold",
  },
  restaurantName: {
    fontFamily: "jakarta_bold",
    color: "grey",
  },
});
