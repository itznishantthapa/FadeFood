import { StyleSheet, TextInput, View,Text } from 'react-native'
import React from 'react'

const UserInput = ({value,inputBoxStyle,inputTopic,authBox}) => {
  return (
    <>
        <View style={authBox}>
        <Text style={{color:'white'}}>{inputTopic}</Text>
        <TextInput value={value}  style={inputBoxStyle}  placeholderTextColor='#adb5bd' />
        </View>

    </>
  )
}

export default UserInput

