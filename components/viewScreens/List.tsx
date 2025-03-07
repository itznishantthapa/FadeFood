"use client"

import { useContext, useRef, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native"
import Price from "./Price"
import { scaleHeight, scaleWidth } from "../../Scaling"
import Love from "./Love"
import { AntDesign, Feather } from "@expo/vector-icons"
import Edit from "./Edit"
import { myContext } from "../../context/AppProvider"
import { baseURL } from "../../service"
import SkeletonPaper from "../../screens/viewScreens/SkeletonPaper"

const List = ({
  images,
  foodName,
  restaurantName,
  price,
  navigation,
  withRestaurant,
  handlePressonList,
  handleEditPen,
  rating,
  preparationTime,
  category,
}) => {
  const { state } = useContext(myContext)

  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current
  const opacityAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(20)).current

  // Run entrance animation on component mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start()
  }, [])

  const onPressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start()
  }

  const onPressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start()
  }

  const onListPress = (e) => {
    e.stopPropagation()
    console.log("Add to List")
  }

  return (
    <TouchableWithoutFeedback onPress={handlePressonList} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          styles.foodContainer,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
          },
        ]}
      >
        <View style={styles.imageContainer}>
          {images && Array.isArray(images) && images.length > 0 ? (
            <Image source={{ uri: `${baseURL}${images[0].image}` }} resizeMode="cover" style={styles.foodImage} />
          ) : (
            <SkeletonPaper SkeletonHeight={scaleHeight(150)} SkeletonWidth={"100%"} style={undefined} />
          )}

          {/* Category badge */}
          {category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          )}

          {/* Action button (Love or Edit) */}
          <View style={styles.actionButtonContainer}>
            {state.role === "customer" ? <Love /> : <Edit handleEditPen={handleEditPen} />}
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.namePriceRow}>
            {foodName ? (
              <Text style={styles.foodName} numberOfLines={1}>
                {foodName}
              </Text>
            ) : (
              <SkeletonPaper SkeletonHeight={25} SkeletonWidth={200} style={styles.foodName} />
            )}

            {price ? (
              <Price priceFontSize={18} price={price} />
            ) : (
              <SkeletonPaper SkeletonHeight={25} SkeletonWidth={60} style={undefined} />
            )}
          </View>

          {/* Restaurant info or rating/time */}
          {state.role === "customer" && (
            <View style={styles.detailsRow}>
              {withRestaurant && restaurantName ? (
                <View style={styles.restaurantInfo}>
                  <View style={styles.restaurantLogo}></View>
                  <Text style={styles.restaurantName} numberOfLines={1}>
                    {restaurantName}
                  </Text>
                </View>
              ) : (
                <View style={styles.foodMetrics}>
                  {rating && (
                    <View style={styles.ratingContainer}>
                      <AntDesign name="star" size={14} color="#FFD700" />
                      <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                  )}

                  {preparationTime && (
                    <View style={styles.timeContainer}>
                      <Feather name="clock" size={14} color="#757575" />
                      <Text style={styles.timeText}>{preparationTime} min</Text>
                    </View>
                  )}
                </View>
              )}

              <TouchableOpacity style={styles.addToListButton} onPress={onListPress} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Add</Text>
                <AntDesign name="plus" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  foodContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(12),
    marginBottom: scaleHeight(16),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "95%",
    alignSelf
    : "center"
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: scaleHeight(180),
  },
  foodImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: scaleWidth(12),
    borderTopRightRadius: scaleWidth(12),
  },
  categoryBadge: {
    position: "absolute",
    top: scaleHeight(12),
    left: scaleWidth(12),
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(20),
  },
  categoryText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#FFFFFF",
  },
  actionButtonContainer: {
    position: "absolute",
    top: scaleHeight(12),
    right: scaleWidth(12),
  },
  infoSection: {
    padding: scaleWidth(16),
  },
  namePriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleHeight(8),
  },
  foodName: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#333333",
    flex: 1,
    marginRight: scaleWidth(8),
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  restaurantInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  restaurantLogo: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    borderRadius: scaleWidth(12),
    backgroundColor: "#F0F0F0",
    marginRight: scaleWidth(8),
  },
  restaurantName: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
    flex: 1,
  },
  foodMetrics: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9C4",
    paddingHorizontal: scaleWidth(6),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleWidth(4),
    marginRight: scaleWidth(8),
  },
  ratingText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(12),
    color: "#333333",
    marginLeft: scaleWidth(4),
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#757575",
    marginLeft: scaleWidth(4),
  },
  addToListButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(6),
    borderRadius: scaleWidth(20),
  },
  buttonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(12),
    color: "#FFFFFF",
    marginRight: scaleWidth(4),
  },
})

export default List

