import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#ffffff" style='dark' />
            <ActivityIndicator 
                size="large"
                color="#333333"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',  // Semi-transparent white
        zIndex: 1000
    }
});

export default LoadingScreen;