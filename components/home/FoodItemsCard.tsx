import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useContext } from 'react';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../../style/style';
// import { MyContext } from '../../context/AppProvider';

const FoodItems = ({ FoodImage, FoodPrice, TimeToCook, handleNavigation }) => {


    return (
        <TouchableWithoutFeedback onPress={handleNavigation}>
            <View style={styles.foodItemBox} >
                <View style={styles.foodImage}>
                    <Image style={{ height: '100%', width: '100%', borderTopRightRadius: 15, borderTopLeftRadius: 15 }} source={FoodImage}></Image>
                </View>
                <View style={{ paddingHorizontal: 6 }}>
                    <Text style={{ color: '#333333', fontFamily: 'montserrat_semibold' }}>Mo:Mo</Text>
                    <View style={styles.price_and_time}>
                        <View style={styles.price}>
                            <Text style={{ fontSize: 15, color: '#ff6b35', fontFamily: 'montserrat_semibold' }}>Rs.</Text>
                            <Text style={{ fontSize: 20, color: '#ff6b35', fontFamily: 'montserrat_semibold' }}>50</Text>
                        </View>
                        <View style={styles.time}>
                            <MaterialCommunity name='clock-time-eight-outline' size={15}></MaterialCommunity>
                            <Text> 20 mins</Text>
                        </View>
                    </View>
                    <View style={styles.location}>
                        <Ionicon name='location-sharp' style={{ color: 'grey' }} />
                        <Text style={{ fontSize: 12, color: 'grey', fontFamily: 'montserrat_semibold' }}>Dharan, Bhanuchowk</Text>
                    </View>

                </View>
            </View>
        </TouchableWithoutFeedback>

    );
}

export default FoodItems;


