import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../../style/style'
import { scaleWidth } from '../../Scaling'

const Price = ({price,priceFontSize}) => {
  return (
    <View style={styles.price}>
    <Text style={{ fontSize: scaleWidth(15), color: '#8D6E63', fontFamily: 'montserrat_semibold' }}>Rs.</Text>
    <Text style={{ fontSize: scaleWidth(priceFontSize), color: '#8D6E63', fontFamily: 'montserrat_semibold' }}>{price}</Text>
  </View>
)}

export default Price

