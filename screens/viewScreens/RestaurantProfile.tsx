import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import TopBar from '../../components/viewScreens/TopBar'
import { styles } from '../../style/style'
import { ScrollView } from 'react-native-gesture-handler'
import { scaleHeight } from '../../Scaling'

const RestaurantProfile = ({ navigation }) => {
    return (
        <SafeAreaView >
            <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
            <ScrollView
                nestedScrollEnabled={true}
                overScrollMode="never"
                scrollEventThrottle={20}
                showsVerticalScrollIndicator={false}
            >
                <View style={ownstyle.container}>
                    <View style={ownstyle.restaurant_intro}></View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RestaurantProfile

const ownstyle = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        gap: scaleHeight(10),
    },
    restaurant_intro: {
        height: scaleHeight(250),
        width: '100%',
        backgroundColor: 'red'
    }
})