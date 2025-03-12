import { Text, View, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { scaleWidth } from '../../Scaling'

const { width } = Dimensions.get('window')

const IntroText = ({ headingText, line1, line2 }) => {
    return (
        <>
            <View style={styles.introTextContainer}>
                <Text style={styles.headingText}>{headingText}</Text>
                <Text style={styles.lineText}>{line1}</Text>
                <Text style={styles.lineText}>{line2}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    introTextContainer: {
        marginBottom: 20
    },
    headingText: {
        fontSize: scaleWidth(30),
        fontFamily: 'poppins_bold',
        color: '#C0C0C0',
        lineHeight: scaleWidth(35)
    },
    lineText: {
        fontSize: scaleWidth(30),
        fontFamily: 'poppins_bold', 
        color: '#000000',
        lineHeight: scaleWidth(35)
    }
})

export default IntroText

