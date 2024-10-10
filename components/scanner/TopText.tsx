import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
const { height } = Dimensions.get('window')

const TopText = () => {
    return (
        <View style={styles.intro} >
            <Image style={{ height: 100, width: 100 }} source={require('../../assets/fadefood_logo.png')}></Image>
            <View>
                <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Scan FadeFood to</Text>
                <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Pre-order & Payment</Text>
                <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>from anywhere</Text>
            </View>
        </View>
    )
}

export default TopText

const styles = StyleSheet.create({
    intro: {
        height: height * 0.2,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 10
      }
})