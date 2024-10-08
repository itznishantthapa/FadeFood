import React, { useState } from 'react';
import {  View, FlatList, StyleSheet } from 'react-native';
import List from '../../components/viewScreens/List';
import chatpate from '../../assets/chatapate.jpeg';
import NabBar from '../../components/home/NavBar';
import { styles } from '../../style/style';
import TopBar from '../../components/viewScreens/TopBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Favourite = ({ navigation }) => {
    const renderItem = ({ item }) =>
        <List
            price='50'
            foodName='Chatpaate'
            restaurantName='Delicious Restaurant'
            image={chatpate}
            isLoveNeeded={true}
        />;

    return (
        <SafeAreaView >
              <StatusBar hidden={false} backgroundColor='#dc2f02' style='light' />
            <View style={styles.home_screen}>
                <View style={{height:'7%'}}>

                <TopBar navigation={navigation} top_title='Favorite' />
                </View>

                <View style={{ height: '93%', width: '100%'}}>
                    <FlatList
                        data={Array(14).fill(null)} // Assuming you have 14 items
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles1.contentContainer}
                    />
                </View>


            </View>
        </SafeAreaView>
    );
};

const styles1 = StyleSheet.create({

    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 17,
    },
});

export default Favourite;