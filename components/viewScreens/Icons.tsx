import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
// import Ant from 'react-native-vector-icons/AntDesign'
import FontAwe from 'react-native-vector-icons/FontAwesome'

const Icons = ({name,navigation}) => {
  return (
    <TouchableOpacity 
      style={{backgroundColor:'#ffffff',height:40,width:40,flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:10}} 
      onPress={() => navigation.goBack()}
    >
      <FontAwe name={name} size={25} />
    </TouchableOpacity>
  )
}

export default Icons

// const styles = StyleSheet.create({})