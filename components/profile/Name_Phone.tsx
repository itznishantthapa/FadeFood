import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { scaleHeight, scaleWidth } from '../../Scaling'


const Name_Phone = ({name,phone_number}) => {
    return (

        <View style={{ alignItems: 'center', gap: scaleHeight(4),marginBottom:scaleHeight(20) }}>
            <Text style={ownstyle.nameText}>{name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: scaleWidth(5) }}>
                <SimpleLineIcon name='phone' size={scaleWidth(20)} />
                <Text>+977 {phone_number}</Text>
            </View>
        </View>
    )
}

export default Name_Phone

const ownstyle = StyleSheet.create({
    nameText: {
        fontFamily: 'poppins_regular'
    },
  
})