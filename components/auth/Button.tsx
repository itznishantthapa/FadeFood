import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({style,btnText,handleAuthBtn}) => {
    return (
        <>
            <TouchableOpacity style={style} onPress={handleAuthBtn}>
                <Text style={{ fontWeight: 'bold', fontSize: 18,color:'#FFFFFF' }}>{btnText}</Text>
            </TouchableOpacity>
        </>
    )
}

export default Button
