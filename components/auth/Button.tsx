import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({style,btnText}) => {
    return (
        <>
            <TouchableOpacity style={style}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, }}>{btnText}</Text>
            </TouchableOpacity>
        </>
    )
}

export default Button
