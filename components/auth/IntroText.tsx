import {  Text, View,Dimensions } from 'react-native'
import React from 'react'

const { width } = Dimensions.get('window')

const IntroText = ({headingText,line1,line2,style}) => {
    return (
        <>
            <View style={style}>
                <Text style={{fontSize:width * 0.0999,color:'#000000',fontFamily:'poppins_bold'}}>{headingText}</Text>
                <Text style={{fontSize:width * 0.0666,color:'#757575',fontFamily:'poppins_semibold'}}>{line1}</Text>
                <Text style={{fontSize:width * 0.0666,color:'#757575',fontFamily:'poppins_semibold'}}>{line2}</Text>
            </View>
        </>
    )
}

export default IntroText

