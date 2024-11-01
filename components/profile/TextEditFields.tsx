import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import { scaleHeight, scaleWidth } from '../../Scaling'

const TextEditFields = ({label_name,inputmode,key_type}) => {
  return (
    <View style={ownstyle.text_container}>
    <Text style={ownstyle.label_style}>{label_name}</Text>
    <TextInput 
    style={ownstyle.text_field}
    cursorColor={'black'}
    selectionColor={'#a9d6e5'}
    keyboardType={key_type}
    inputMode={inputmode}
    />
  </View>
  )
}

export default TextEditFields

const ownstyle = StyleSheet.create({
     text_container: {
        marginTop:scaleHeight(20)
     },
     text_field:{
        borderBottomWidth:1,
        borderColor:'black',
        width:scaleWidth(300),
        fontSize:scaleWidth(15),
     },
     label_style:{
        fontFamily:'poppins_regular',
        fontSize:scaleWidth(15),
     }
})