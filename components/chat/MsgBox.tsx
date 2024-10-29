import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'
import { scaleWidth } from '../../Scaling'


const { width } = Dimensions.get('window')
const MsgBox = ({item}) => {
  return (
    <View style={[item.sender ? styles.senderMsg : styles.receiverMsg]}>
      <Text style={{ color: 'black',fontSize:scaleWidth(16)}}>{item.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  senderMsg: {
      alignSelf: 'flex-end', 
      backgroundColor: '#80ed99', 
      borderTopLeftRadius: scaleWidth(10),
      borderTopRightRadius: scaleWidth(10),
      borderBottomLeftRadius: scaleWidth(10),
      padding: width * 0.022, 
      marginBottom: width * 0.022, 
      maxWidth: '70%',
      // transform: [{ rotate: '-70deg' }],
      
  },
  receiverMsg: {
      alignSelf: 'flex-start', 
      backgroundColor: '#ffffff', 
      borderTopLeftRadius: scaleWidth(10),
      borderTopRightRadius: scaleWidth(10),
      borderBottomRightRadius: scaleWidth(10),
      padding: width * 0.022, 
      marginBottom: width * 0.022,
      maxWidth: '70%', 
  }})

export default MsgBox

