import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../../style/style'
const { width, height } = Dimensions.get('window');

const SloganBox = ({ solgan_line1, solgan_line2, solgan_line3 }) => {
    return (

        <View style={[styles.homeHeading, { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }]}>
            <View style={{ width: width * 0.73}}>
                <Text style={[styles.homeHeadingText, { fontSize: width * 0.07 }]}>{solgan_line1}</Text>
                <Text style={[styles.homeHeadingText, { fontSize: width * 0.069 }]}>{solgan_line2}</Text>
                <Text style={[styles.homeHeadingText, { fontSize: width * 0.07 }]}>{solgan_line3}</Text>
            </View>
            <View style={{marginLeft:width*0.7,position:'absolute'}}>
                <Image resizeMode='cover' style={{ height: height * 0.17, width: width * 0.27}} source={require('../../assets/food.png')} />
            </View>


        </View>

    )
}

export default SloganBox

// const styles = StyleSheet.create({})