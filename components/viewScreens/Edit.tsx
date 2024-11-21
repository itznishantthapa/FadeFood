import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scaleHeight, scaleWidth } from '../../Scaling'

const Edit = () => {
  return (
    <TouchableOpacity 
    style={{ 
        height: scaleHeight(30), 
        width: scaleWidth(40), 
        backgroundColor:  '#FFFFFF', 
        borderTopRightRadius: 12, 
        borderBottomLeftRadius: 12, 
        marginLeft: 'auto', 
        alignItems: 'center', 
        justifyContent: 'center',
        elevation: 2 
    }}
>
    <AntDesign
        name={ 'edit'} 
        size={scaleWidth(25)} 
        style={{ 
            color: '#FF6347'
        }}
    />
</TouchableOpacity>
  )
}

export default Edit

const styles = StyleSheet.create({})