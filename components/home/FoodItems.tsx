import { StyleSheet, Text, View,Image } from 'react-native';
import React, { useState, useContext } from 'react';
import { ImageBackground } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { MyContext } from '../../context/AppProvider';

const FoodItems = ({ FoodImage, FoodPrice, TimeToCook }) => {

    return (
        <View style={styles.foodItemBox} >
            <View style={styles.foodImage}>
            <Image style={{height:'100%' ,width:'100%',borderTopRightRadius:15,borderTopLeftRadius:15}} source={FoodImage}></Image>
            </View>
            <View style={{paddingHorizontal:6}}>
                <Text style={{color:'#333333',  fontFamily:'inter_semibold' }}>टमाटर अचारको झोल मोमो</Text>
                    <View style={styles.price_and_time}>
                    <View style={styles.price}>
                    <Text style={{ fontSize: 15,color:'#ff6b35' ,fontFamily:'inter_semibold'}}>Rs.</Text>
                    <Text style={{ fontSize: 20,color:'#ff6b35',fontFamily:'inter_semibold' }}>50</Text>
                </View>
                <View style={styles.time}>
                    <MaterialCommunity name='clock-time-eight-outline' size={15}></MaterialCommunity>
                    <Text> 20 mins</Text>
                </View>
                    </View>
                <View style={styles.location}>
                    <Ionicon name='location-sharp' style={{ color: 'grey' }} />
                    <Text style={{ fontSize: 12, color: 'grey',  fontFamily:'inter_semibold' }}>Dharan, Bhanuchowk</Text>
                </View>

            </View>
        </View>
    );
}

export default FoodItems;

const styles = StyleSheet.create({
    foodItemBox: {
        height: 380,
        width: '47%',
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding:5
    },
    foodImage: {
        height: '82%',
        backgroundColor: 'grey',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    price: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    time:{
        flexDirection: 'row',
        alignItems: 'center',
        padding:5,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
    },
    price_and_time:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})