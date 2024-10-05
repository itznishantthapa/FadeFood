import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {styles} from '../../style/style'

const SloganBox = ({solgan_line1,solgan_line2,solgan_line3}) => {
    return (

        <View style={styles.homeHeading}>
            <Text style={[styles.homeHeadingText]}>{solgan_line1}</Text>
            <Text style={styles.homeHeadingText}>{solgan_line2}</Text>
            <Text style={styles.homeHeadingText}>{solgan_line3}</Text>
        </View>

    )
}

export default SloganBox

// const styles = StyleSheet.create({})