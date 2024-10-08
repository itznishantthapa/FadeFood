import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../../style/style'

const Price = ({price}) => {
  return (
    <View style={styles.price}>
    <Text style={{ fontSize: 15, color: '#ff6b35', fontFamily: 'montserrat_semibold' }}>Rs.</Text>
    <Text style={{ fontSize: 30, color: '#ff6b35', fontFamily: 'montserrat_semibold' }}>{price}</Text>
  </View>
)}

export default Price

