import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons from './Icons'


const TopBar = ({top_title,navigation}) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', marginTop: 10 }}>
            <Icons
                name={'chevron-left'}
                navigation={navigation}
            />
            <Text style={{ fontFamily: 'jakarta_bold', fontSize: 25 }}>{top_title}</Text>
            <View style={{ width: 40 }}></View>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({})