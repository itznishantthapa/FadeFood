import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { scaleHeight, scaleWidth } from '../../Scaling'
import { TouchableOpacity } from 'react-native-gesture-handler'


const CategoriesRestaurant = ({dishImage,dishName}) => {
  return (
    <TouchableOpacity style={{ backgroundColor: '#ffffff', height: scaleHeight(90), width: scaleWidth(70), justifyContent: 'center', alignItems: 'center', padding: 4, borderRadius: 6 }}>
    <View style={{ height: '80%', width: '100%' }}>
      <Image style={{ height: '100%', width: '100%' }} resizeMode='contain' source={dishImage}>

      </Image>
    </View>
    <View style={{height:'20%',width:'100%'}}>
     <Text style={{fontSize:scaleWidth(12),fontFamily:'poppins_regular'}}>{dishName}</Text>
    </View>

  </TouchableOpacity>
  )
}

export default CategoriesRestaurant

// const styles = StyleSheet.create({})