import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'


const { width } = Dimensions.get('window')
const MsgBox = ({item}) => {
  return (
    <View style={[item.sender ? styles.senderMsg : styles.receiverMsg]}>
      <Text style={{ color: 'white' }}>{item.text}</Text>
    </View>
  )
}
const styles = StyleSheet.create({

  senderMsg: {
      alignSelf: 'flex-end', 
      backgroundColor: '#dc2f02', 
      borderRadius: width * 0.037,
      padding: width * 0.022, 
      marginBottom: width * 0.022, 
      maxWidth: '70%',
      
  },
  receiverMsg: {
      alignSelf: 'flex-start', 
      backgroundColor: '#6c757d', 
      borderRadius: width * 0.037, 
      padding: width * 0.022, 
      marginBottom: width * 0.022,
      maxWidth: '70%', 
  }

})

export default MsgBox

