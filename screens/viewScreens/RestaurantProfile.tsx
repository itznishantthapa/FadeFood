import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import TopBar from '../../components/viewScreens/TopBar'
import { styles } from '../../style/style'
import { ScrollView } from 'react-native-gesture-handler'
import { scaleHeight, scaleWidth } from '../../Scaling'
import FoodItems from '../../components/home/FoodItemsCard'
import ItemName from '../../components/viewScreens/ItemName'
import Price from '../../components/viewScreens/Price'
import img3 from '../../assets/images/img1 (3).png'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


const RestaurantProfile = ({ navigation }) => {
    const [activeCategory, setactiveCategory] = useState('Items')

    const categories = ['Items', 'Drinks']

    const handleActiveCategory = (category) => {
        setactiveCategory(category)
        console.log(activeCategory)
    }

    return (

        <SafeAreaView >
            <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
            <ScrollView
                nestedScrollEnabled={true}
                overScrollMode="never"
                scrollEventThrottle={20}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[1]}
            >

                <View style={ownstyle.restaurant_intro}></View>


                <View>

                    <View style={ownstyle.sectionBarContainer}>

                        <View style={ownstyle.lineContainer}>
                            <View style={ownstyle.lines}></View>
                            <Text style={{ fontFamily: 'LeckerliOne_regular', fontSize: 25, color: '#333333' }}>Our Menu</Text>
                            <View style={ownstyle.lines}></View>
                        </View>
                        <View style={ownstyle.categoryContainer}>
                            {
                                categories.map((category, index) => (
                                    <TouchableOpacity key={index} style={[ownstyle.category,activeCategory===category && ownstyle.activeStyle]} onPress={()=>handleActiveCategory(category)}>
                                        <Text style={ownstyle.categoryText}>{category}</Text>
                                    </TouchableOpacity>
                                ))
                            }

                        </View>
                    </View>

                </View>







                <View>

                    <View style={ownstyle.cardsContainer}>

                        {
                            Array(12).fill(0).map((_, index) => (
                                <View key={index} style={ownstyle.restaurantFoodCard}>
                                    <View style={ownstyle.foodImage}>
                                        <Image source={img3} style={{ height: '100%', width: '100%', borderRadius: scaleWidth(8) }} resizeMode='stretch' />
                                    </View>
                                    <View style={ownstyle.price_and_name}>
                                        <ItemName fontsize={20} foodName={'Momo'} />
                                        <Price price={300} priceFontSize={16}></Price>
                                    </View>
                                </View>

                            ))
                        }

                    </View>
                </View>


            </ScrollView>
        </SafeAreaView>

    )
}

export default RestaurantProfile

const ownstyle = StyleSheet.create({
    restaurant_intro: {
        height: scaleHeight(250),
        width: '100%',
        backgroundColor: 'black'
    },
    restaurantFoodCard: {
        height: scaleHeight(230),
        width: '48%',
        backgroundColor: '#ffffff',
        borderRadius: scaleWidth(8)
    },
    foodImage: {
        height: '75%',
        width: '100%',
        backgroundColor: 'transparent',
        borderRadius: scaleWidth(8)
    },
    cardsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: scaleHeight(10),
        paddingHorizontal: scaleWidth(10),
        marginTop: scaleHeight(10),
        backgroundColor: '#F0F4F8'
    },
    price_and_name: {
        height: '25%',
        width: '100%',
        alignItems: 'center',
    },
    lines: {
        height: scaleHeight(2),
        width: '30%',
        backgroundColor: '#000',
        marginVertical: scaleHeight(10)
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',


    },
    category: {
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,

    },
    categoryText: {
        fontSize: 13,
        fontFamily: 'poppins_regular',
        color: '#000000'
    },
    categoryContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: scaleWidth(10),
        marginTop: scaleHeight(10),
        gap: scaleWidth(10)
    },
    sectionBarContainer: {
        backgroundColor: '#F0F4F8',
        paddingBottom: scaleHeight(10),
        borderBottomLeftRadius: scaleWidth(40),
        borderBottomRightRadius: scaleWidth(40),
    },
    activeStyle:{
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderColor: 'red',
        borderBottomWidth: 2
    }
})