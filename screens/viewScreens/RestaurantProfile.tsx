import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import TopBar from '../../components/viewScreens/TopBar'
import { styles } from '../../style/style'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { scaleHeight, scaleWidth } from '../../Scaling'
import FoodItems from '../../components/home/FoodItemsCard'
import ItemName from '../../components/viewScreens/ItemName'
import Price from '../../components/viewScreens/Price'
import img3 from '../../assets/images/img1 (3).png'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { Video, ResizeMode } from 'expo-av'
import { AntDesign } from '@expo/vector-icons';
import Ionicon from 'react-native-vector-icons/Ionicons';


import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


const RestaurantProfile = ({ navigation }) => {
    const [isPlaying, setisPlaying] = useState(false)
    const [activeCategory, setactiveCategory] = useState('Items')

    const categories = ['Items', 'Drinks']

    const handleActiveCategory = (category) => {
        setactiveCategory(category)
        console.log(activeCategory)
    }

    const handlePlay = () => {
        setisPlaying(true)
    }

    const handleGoBack = () => {
        navigation.goBack()
    }



    return (

        <SafeAreaView >
            <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
            {/* <TopBar top_title={'Restaurant'} navigation={navigation}></TopBar> */}
            <ScrollView
                nestedScrollEnabled={true}
                overScrollMode="never"
                scrollEventThrottle={20}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[1]}
            >

                <View style={ownstyle.restaurant_intro}>
                    {!isPlaying ? (
                        <View style={ownstyle.poster}>
                            <View style={ownstyle.resNameContainer}>
                                <Text style={ownstyle.resText}>Delicious{'\n'}Restaurant</Text>
                                <View style={styles.location}>
                                    <Ionicon
                                        name="location-sharp"
                                        style={{ color: "grey", marginBottom: scaleHeight(3) }}
                                        size={scaleWidth(20)}
                                    />
                                    <Text style={{ fontSize: scaleWidth(15), color: "grey", fontFamily: "poppins_semibold", }}>
                                        1234, Sample Address, Sample City
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity style={ownstyle.playContainer} onPress={handlePlay}>
                                <AntDesign name='playcircleo' size={60} style={{ color: 'white' }}></AntDesign>
                            </TouchableOpacity>


                        </View>
                    ) : (
                        <View style={ownstyle.videoContainer}>
                            <Video
                                source={{ uri: 'https://videos.pexels.com/video-files/1111420/1111420-hd_1920_1080_30fps.mp4' }}
                                style={{ height: '100%', width: '100%' }}
                                rate={0.5}
                                volume={1.0}
                                isMuted={true}
                                shouldPlay
                                isLooping={false}
                                resizeMode={ResizeMode.COVER}
                                onPlaybackStatusUpdate={status => {
                                    if (status.isLoaded && !status.isPlaying) {
                                        setisPlaying(false);
                                    }
                                }}
                            />
                        </View>
                    )}
                    <TouchableOpacity
                        onPress={handleGoBack}
                        style={ownstyle.backButton}
                    >
                        <View style={ownstyle.backButtonContainer}>
                            <AntDesign
                                name='arrowleft'
                                size={scaleWidth(30)}
                                color='white'
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={ownstyle.sectionBarContainer}>

                        <View style={ownstyle.lineContainer}>
                            <View style={ownstyle.lines}></View>
                            <Text style={{ fontFamily: 'jakarta_bold', fontSize: 25, color: '#333333' }}>Our Menu</Text>
                            <View style={ownstyle.lines}></View>
                        </View>
                        <View style={ownstyle.categoryContainer}>
                            {
                                categories.map((category, index) => (
                                    <TouchableOpacity key={index} style={[ownstyle.category, activeCategory === category && ownstyle.activeStyle]} onPress={() => handleActiveCategory(category)}>
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
        backgroundColor: 'black',
        position: 'relative'
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
        fontSize: scaleWidth(12),
        fontFamily: 'poppins_regular',
        color: '#000000'
    },
    categoryContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: scaleWidth(10),
        gap: scaleWidth(10)
    },
    sectionBarContainer: {
        backgroundColor: '#F0F4F8',
        paddingBottom: scaleHeight(10),
        borderBottomLeftRadius: scaleWidth(40),
        borderBottomRightRadius: scaleWidth(40),
    },
    activeStyle: {
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderColor: 'red',
        borderBottomWidth: 2
    },
    poster: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row'
    },
    resNameContainer: {
        marginLeft: scaleWidth(20),
        marginTop: scaleHeight(50),
        width: '70%',
    },
    playContainer: {
        width: '30%',
        marginTop: scaleHeight(50),
    },
    resText: {
        color: '#fff',
        fontSize: scaleWidth(35),
        fontFamily: 'jakarta_bold',

    },
    videoContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    backButton: {
        position: 'absolute',
        top: 12,
        left: 16,
        zIndex: 10,
        elevation: 5, // Add this for Android
    },
    backButtonContainer: {
        width: scaleWidth(40),
        height: scaleWidth(40),
        borderRadius: scaleWidth(20),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

})