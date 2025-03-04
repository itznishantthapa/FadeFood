"use client"

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { useState } from "react"
import Price from "../viewScreens/Price"
import { MaterialIcons } from "@expo/vector-icons"
import Reviews from "./Reviews"
import { scaleHeight, scaleWidth } from "../../Scaling"

const NearDishCard = ({ image, price, name, reiwesNumber, rating, onPress }) => {
  // Add state for tracking favorite status
  const [isFavorite, setIsFavorite] = useState(false)

  // Toggle favorite function
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageWrapper}>
        <View style={styles.imageContainer}>
          <Image resizeMode="stretch" style={styles.image} source={image} />
        </View>

        {/* Favorite button */}
        <TouchableOpacity
          onPress={toggleFavorite}
          style={[styles.favoriteButton, { backgroundColor: isFavorite ? "#FF6347" : "#FFFFFF" }]}
        >
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={scaleWidth(25)}
            style={{ color: isFavorite ? "#8B0000" : "#8D6E63" }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Price price={price} priceFontSize={15} />
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Reviews reviewsName={"Reviews"} reviewsNumber={reiwesNumber} rating={rating} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(165),
    width: scaleWidth(150),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(15),
    padding: 5,

 

  },
  imageWrapper: {
    height: "60%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "relative",
  },
  imageContainer: {
    position: "absolute",
    top: scaleHeight(-25),
    left: scaleWidth(-25),
  },
  image: {
    height: scaleHeight(120),
    width: scaleWidth(120),
  },
  favoriteButton: {
    height: scaleHeight(30),
    width: scaleWidth(40),
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    height: "40%",
    paddingHorizontal: scaleWidth(10),
  },
  name: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
  },
})

export default NearDishCard

