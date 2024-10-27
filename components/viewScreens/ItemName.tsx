import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scaleWidth } from '../../Scaling'

const ItemName = ({foodName,restaurantName,fontsize}) => {

  return (
    <View style={styles1.orderName}>
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'jakarta_bold', fontSize: fontsize }}>{foodName}</Text>
      {/* <Text style={{ fontFamily: 'jakarta_bold', color: 'grey',fontSize:12 }}>by</Text> */}
    </View>
    <Text style={{ fontFamily: 'jakarta_bold', color: 'grey',fontSize:fontsize-scaleWidth(9) }}>{restaurantName}</Text>
  </View>
  )
}

export default ItemName

const styles1 = StyleSheet.create({
    orderName: {
        width: 'auto',
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
})