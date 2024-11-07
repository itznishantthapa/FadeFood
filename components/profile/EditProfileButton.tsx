import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scaleWidth } from '../../Scaling'
import { TouchableOpacity } from 'react-native-gesture-handler'

const EditProfileButton = ({button_name,handleButton}) => {
  return (
    <TouchableOpacity style={{padding:scaleWidth(8),borderWidth:scaleWidth(1),borderColor:'grey',justifyContent:'center',alignItems:'center',borderRadius:scaleWidth(10)}} onPress={handleButton}>
    <Text style={ownstyle.text_style}>{button_name}</Text>
  </TouchableOpacity>
  )
}

export default EditProfileButton

const ownstyle = StyleSheet.create({
    text_style:{
        fontFamily:'poppins_regular',
        fontSize:scaleWidth(14),
    }
})