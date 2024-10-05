import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {styles} from '../../style/style'

const Categories = ({category,stylesForBox}) => {
  return (
    <View style={stylesForBox}>
    <Text style={styles.category_text}>{category}</Text>
  </View>
  )
}

export default Categories

// const styles = StyleSheet.create({})