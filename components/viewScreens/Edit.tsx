import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scaleHeight, scaleWidth } from '../../Scaling'

const Edit = ({handleEditPen}) => {
  return (
    <TouchableOpacity 
    style={{ 
        height: scaleHeight(30), 
        width: scaleWidth(40), 
        backgroundColor:  '#FFFFFF', // Change background based on state
        borderTopRightRadius: 12, 
        borderBottomLeftRadius: 12, 
        marginLeft: 'auto', 
        alignItems: 'center', 
        justifyContent: 'center',
        elevation: 2 // Optional: adds shadow on Android
    }}

    onPress={handleEditPen} // Add onPress event
>
    <AntDesign
        name={ 'edit'} // Change icon based on state
        size={scaleWidth(25)} 
        style={{ 
            color: '#FF6347' // Change color based on state
        }}
    />
</TouchableOpacity>
  )
}

export default Edit

const styles = StyleSheet.create({})