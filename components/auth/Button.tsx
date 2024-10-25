import { Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { scaleWidth } from '../../Scaling'

const Button = ({style,btnText,handleAuthBtn}) => {
    return (
        <>
            <TouchableOpacity style={style} onPress={handleAuthBtn}>
                <Text style={{ fontFamily:'poppins_semibold', fontSize: scaleWidth(18),color:'#FFFFFF' }}>{btnText}</Text>
            </TouchableOpacity>
        </>
    )
}

export default Button
