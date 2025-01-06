import { Text, View, Dimensions } from 'react-native'
import React from 'react'
import { scaleWidth } from '../../Scaling'

const { width } = Dimensions.get('window')

const IntroText = ({ headingText, line1, line2, style }) => {
    return (
        <>
            <View style={style}>
                <Text style={{ fontSize: scaleWidth(30), color: '#000000', fontFamily: 'poppins_bold' }}>
                    {headingText}{"\n"}{line1}{"\n"}{line2}
                </Text>
            </View>
        </>
    )
}

export default IntroText

