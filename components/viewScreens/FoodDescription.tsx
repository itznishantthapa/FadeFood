import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FoodDescription = () => {
  return (
    <View style={styles1.description}>
    <Text style={{ fontFamily: 'jakarta_bold', fontSize: 20, color: 'black', marginTop: 10 }}>Description</Text>
    <Text style={{ fontFamily: 'montserrat_semibold', fontSize: 15, color: 'grey' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla facilisi. Donec ut ex nec enim tincidunt ultricies. Ut nec   </Text>
  </View>
  )
}

export default FoodDescription

const styles1 = StyleSheet.create({
    description: {
        width: '100%',
        padding: 10,
        alignItems: 'flex-start',
        borderRadius: 20,
        height: '15%',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 5,
      },
})