import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { scaleHeight, scaleWidth } from '../../Scaling';

const Reviews = ({ reviewsNumber, rating, reviewsName }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: scaleHeight(20), gap: scaleWidth(8), marginTop: scaleHeight(-5) }}>
      <Text style={{ fontFamily: 'poppins_semibold', fontSize: scaleWidth(12), color: 'grey' }}>{reviewsNumber} {reviewsName}</Text>
      <View style={styles.ratingContainer}>
        <AntDesign name="star" size={14} color="#FFD700" />
        <Text style={styles.rating}>{rating || "4.0"}</Text>
      </View>

    </View>

  )
}

export default Reviews

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9C4",
    paddingHorizontal: scaleWidth(6),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleWidth(4),
  },
  rating: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(12),
    color: "#333333",
    marginLeft: scaleWidth(4),
  },
})