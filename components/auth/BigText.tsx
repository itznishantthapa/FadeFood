import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BigText = ({headingText,line1,line2,style}) => {
    return (
        <>
            <View style={style}>
                <Text style={{fontSize:45,color:'#000000',fontWeight:'bold'}}>{headingText}</Text>
                <Text style={{fontSize:30,color:'#757575'}}>{line1}</Text>
                <Text style={{fontSize:30,color:'#757575'}}>{line2}</Text>
            </View>

        </>
    )
}

export default BigText

