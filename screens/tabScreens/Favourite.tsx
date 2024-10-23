import React, { useState } from 'react';
import {  View, FlatList, StyleSheet,TouchableWithoutFeedback } from 'react-native';
import List from '../../components/viewScreens/List';
import chatpate from '../../assets/chatapate.jpeg';
import { styles } from '../../style/style';
import TopBar from '../../components/viewScreens/TopBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Favourite = ({ navigation }) => {

        // Sample data 
        const foodData = [
            {
                price: '$5.00',
                foodName: 'Chatpate',
                restaurantName: 'Food Corner',
                image: chatpate,
                isLoveNeeded: true
            },
            // Add more items here
            {
                price: '$7.00',
                foodName: 'Momo',
                restaurantName: 'Momo King',
                image: chatpate, // Use another image in real case
                isLoveNeeded: true
            },
            {
                price: '$10.00',
                foodName: 'Pizza',
                restaurantName: 'Pizza Hut',
                image: chatpate, // Use another image in real case
                isLoveNeeded: true
            },
            {
                price: '$15.00',
                foodName: 'Burger',
                restaurantName: 'Burger King',
                image: chatpate, // Use another image in real case
                isLoveNeeded: true
            },
            {
                price: '$5.00',
                foodName: 'Chatpate',
                restaurantName: 'Food Corner',
                image: chatpate,
                isLoveNeeded: true
            },
            {
                price: '$7.00',
                foodName: 'Momo',
                restaurantName: 'Momo King',
                image: chatpate, // Use another image in real case
                isLoveNeeded: true
            },
            {
                price: '$10.00',
                foodName: 'Pizza',
                restaurantName: 'Pizza Hut',
                image: chatpate, // Use another image in real case
                isLoveNeeded: true
            },
            {
                price: '$15.00',
                foodName: 'Burger',
                restaurantName: 'Burger King',
                image: chatpate, // Use another image in real case
                isLoveNeeded: true
            },
        ];

    const renderItem = ({item }) =>
       
        <List
            price={item.price}
            foodName={item.foodName}
            restaurantName={item.restaurantName}
            image={item.image}
            isLoveNeeded={item.isLoveNeeded}
            navigation={navigation}
        />
   


    return (
        <SafeAreaView >
              <StatusBar hidden={false} backgroundColor='#dc2f02' style='light' />
            <View style={styles.home_screen}>
                <TopBar navigation={navigation} top_title='Favorite' />
   
                <View style={{ height: '93%', width: '100%'}}>
                    <FlatList
                        data={foodData} 
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