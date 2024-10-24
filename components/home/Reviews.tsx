import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const Reviews = ({reviewsNumber,rating,reviewsName}) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 20, gap: 8, marginTop: -5 }}>
    <Text style={{ fontFamily: 'poppins_semibold', fontSize: 12, color: 'grey' }}>{reviewsNumber} {reviewsName}</Text>

    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <FontAwesome name='star' size={15} color="#FFD700" />
        <Text style={{ fontFamily: 'poppins_semibold', fontSize: 12, color: 'grey' }}>{rating}</Text>
    </View>

</View>

  )
}

export default Reviews

const styles = StyleSheet.create({})