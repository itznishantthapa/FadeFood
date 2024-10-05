import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { styles } from '../../style/style'

const SloganBox = ({ solgan_line1, solgan_line2, solgan_line3 }) => {
    return (

        <View style={[styles.homeHeading, { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }]}>
            <View style={{ width: '75%' }}>
                <Text style={[styles.homeHeadingText]}>{solgan_line1}</Text>
                <Text style={styles.homeHeadingText}>{solgan_line2}</Text>
                <Text style={styles.homeHeadingText}>{solgan_line3}</Text>
            </View>

            <Image resizeMode='cover' style={{ height:155, width: 110,marginRight:20
             ,}} source={require('../../assets/mobile.png')} />


        </View>

    )
}

export default SloganBox

// const styles = StyleSheet.create({})