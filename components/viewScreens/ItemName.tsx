import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItemName = () => {
  return (
    <View style={styles1.orderName}>
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'jakarta_bold', fontSize: 25 }}>Chatepate</Text>
      <Text style={{ fontFamily: 'jakarta_bold', color: 'grey' }}>by</Text>
    </View>
    <Text style={{ fontFamily: 'jakarta_bold', color: 'grey' }}>Deliceaous Restaurant</Text>
  </View>
  )
}

export default ItemName

const styles1 = StyleSheet.create({
    orderName: {
        width: 'auto',
        height: '100%',
        // backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
})