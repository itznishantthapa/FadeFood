"use client"

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { memo, useState } from "react"
import Price from "../viewScreens/Price"
import { MaterialIcons } from "@expo/vector-icons"
import Reviews from "./Reviews"
import { scaleHeight, scaleWidth } from "../../Scaling"
import { baseURL } from "../../service"
import { FC } from "react"



interface NearDishCardProps {
  item: {
    images: { image: string }[];
    food_name: string;
    is_vegetarian: boolean;
    food_restaurant?: string;
    rating?: number;
    food_price: String;
    reviews:number;
  };
  onPress: () => void;
}



const NearDishCard:FC<NearDishCardProps> = memo(({ item, onPress }) => {

  if (!item || !item.images || item.images.length === 0) {
    return null
  }
  // Add state for tracking favorite status
  const [isFavorite, setIsFavorite] = useState(false)
  // console.log('this is the item in NearDishCard--------------->',item)

  // Toggle favorite function
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageWrapper}>
        <Image resizeMode="cover" style={styles.image} source={{ uri: `${baseURL}${item.images[0].image}` }} />
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
        <Price price={item.food_price} priceFontSize={15} />
        <Text style={styles.name} numberOfLines={1}>
          {item.food_name}
        </Text>
        <Reviews reviewsName={"Reviews"} reviewsNumber={item.reviews} rating={item.rating} />
      </View>



    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(165),
    width: scaleWidth(150),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(15),
    paddingBottom:scaleHeight(6)



  },
  imageWrapper: {
    height: "60%",
    alignSelf: 'center',
    width: '100%',
    borderRadius: scaleWidth(15)
  },
  imageContainer: {
    position: "absolute",
    top: scaleHeight(-25),
    left: scaleWidth(-25),
  },
  image: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: scaleWidth(15),
    borderTopLeftRadius: scaleWidth(15)
  },
  favoriteButton: {
    height: scaleHeight(30),
    width: scaleWidth(40),
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    top: 0,
    right: 0
  },
  infoContainer: {
    height: "40%",
    paddingHorizontal: scaleWidth(10),
  },
  name: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
  },
});

export default NearDishCard

