import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'


const CategoriesRestaurant = ({dishImage,dishName}) => {
  return (
    <View style={{ backgroundColor: '#ffffff', height: 90, width: 70, justifyContent: 'center', alignItems: 'center', padding: 4, borderRadius: 6 }}>
    <View style={{ height: '80%', width: '100%' }}>
      <Image style={{ height: '100%', width: '100%' }} resizeMode='contain' source={dishImage}>

      </Image>
    </View>
    <View style={{height:'20%',width:'100%'}}>
     <Text style={{fontSize:12,fontFamily:'poppins_regular'}}>{dishName}</Text>
    </View>

  </View>
  )
}

export default CategoriesRestaurant

// const styles = StyleSheet.create({})