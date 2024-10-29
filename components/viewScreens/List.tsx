import { StyleSheet, Text, View, TouchableWithoutFeedback, Image } from "react-native";
import React from "react";
import Price from "./Price";
import { scaleHeight, scaleWidth } from "../../Scaling";
import { TouchableOpacity } from "react-native-gesture-handler";
import Love from "./Love";

const List = ({
  images,
  foodName,
  restaurantName,
  price,
  navigation,
}) => {
  const handlePress = () => {
    navigation.navigate("ViewFood");
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>

      <View style={styles.container}>

        <View style={{flexDirection:'row'}}>
        <Image source={images.image1} resizeMode="cover" style={styles.foodImage} />
        <Image source={images.image2} resizeMode="cover" style={styles.foodImage} />
        <Image source={images.image3} resizeMode="cover" style={styles.foodImage} />
        </View>

        <View style={{position:'absolute',right:0}}>
        <Love />
        </View>
            
        
        <View style={styles.infoSection}>

          <View style={styles.namePriceRow}>
            <Text style={styles.foodName}>{foodName}</Text>
            <Price priceFontSize={18} price={price} />
          </View>

          <View style={styles.restaurantRow}>

            <View style={styles.restaurantInfo}>
              <View style={styles.restaurantLogo}></View>
              <Text style={styles.restaurantName}>{restaurantName}</Text>
            </View>

            <TouchableOpacity style={styles.addToListButton}>
            <Text style={styles.buttonText}>Add to List</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: scaleWidth(10),
    width: "95%",
    alignSelf: "center",
    marginVertical: scaleHeight(10),
    padding: scaleWidth(10),
    flexDirection: "column",
    alignItems: "center",
  },
  foodImage: {
    width: "30%",
    height: scaleHeight(150),
    backgroundColor: "#EAEAEA", 
  },
  infoSection: {
    width: "100%",
    marginTop: scaleHeight(10),
  },
  namePriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: scaleHeight(5),
  },
  foodName: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(20),
    color: "#333333",
  },
  restaurantRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scaleHeight(5),
  },
  restaurantInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantLogo: {
    backgroundColor: "#FFA726",
    height: scaleHeight(30),
    width: scaleWidth(30),
    borderRadius: scaleWidth(15),
    marginRight: scaleWidth(8),
  },
  restaurantName: {
    fontSize: scaleWidth(14),
    color: "#555555",
    fontFamily: "poppins_regular",
  },
  addToList: {
    fontSize: scaleWidth(14),
    color: "#0066CC",
    fontFamily: "poppins_semibold",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  addToListButton: {
    backgroundColor: "#333333",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
});
