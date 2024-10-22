import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../../style/style'
import { LinearGradient } from 'expo-linear-gradient';
const { width, height } = Dimensions.get('window');

const SloganBox = ({ solgan_line1, solgan_line2, solgan_line3 }) => {
    return (

        <LinearGradient
            style={[styles.homeHeading, { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }]}
            colors={['#dc2f02', '#e85d04', '#f48c06']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={{ width: width * 0.73 }}>
                <Text style={styles.homeHeadingText}>{solgan_line1}</Text>
                <Text style={styles.homeHeadingText}>{solgan_line2}</Text>
                <Text style={styles.homeHeadingText}>{solgan_line3}</Text>
            </View>
            <View style={{ marginLeft: width * 0.7, position: 'absolute' }}>
                <Image resizeMode='cover' style={{ height: height * 0.17, width: width * 0.27 }} source={require('../../assets/food.png')} />
            </View>


        </LinearGradient>

    )
}

export default SloganBox

// const styles = StyleSheet.create({})