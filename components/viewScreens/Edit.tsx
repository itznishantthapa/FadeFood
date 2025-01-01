import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scaleHeight, scaleWidth } from '../../Scaling'

const Edit = ({handleEditPen}) => {
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

    onPress={handleEditPen}
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