import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

const LoadingScreen = () => {
    return (
        <View style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey', zIndex: 999 }}>
            <StatusBar hidden={false} backgroundColor='grey' style='light' />
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}
export default LoadingScreen