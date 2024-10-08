import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import Ant from 'react-native-vector-icons/AntDesign'
import FontAwe from 'react-native-vector-icons/FontAwesome'

const Icons = ({name}) => {
  return (
    <View style={{backgroundColor:'#ffffff',height:50,width:50,flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:10}}>
      <FontAwe name={name} size={25} />
    </View>
  )
}

export default Icons

// const styles = StyleSheet.create({})