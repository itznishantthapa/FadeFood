import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../../style/style'
import { scaleWidth } from '../../Scaling'

const Price = ({price,priceFontSize}) => {
  return (
    <View style={styles.price}>
    <Text style={[ownstyles.price,{fontSize:priceFontSize}]}>Rs. {price}</Text>
  </View>
)}

export default Price


const ownstyles = StyleSheet.create({
  price: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#4CAF50",
  },
})

