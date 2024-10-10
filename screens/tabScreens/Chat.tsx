import { View, Text, Dimensions,FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import UserInput from '../../components/auth/UserInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/auth/Button';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import IntroText from '../../components/auth/IntroText';
import TopBar from '../../components/viewScreens/TopBar';
import grey from '../../assets/grey.png'
import RestaurantMsg from '../../components/chat/RestaurantMsg';

const { width, height } = Dimensions.get('window')


const Chat = ({ navigation }) => {
    const renderItem = ({ item }) => <RestaurantMsg navigation={navigation} />
       
        
    return (
        <SafeAreaView>
            <StatusBar hidden={false} backgroundColor='#dc2f02' style='light' />
            <TopBar navigation={navigation} top_title='Messages' />
            <View style={{ justifyContent: 'flex-start',borderTopRightRadius:15,height:'93%',marginTop:8 }}>
                <FlatList
                    data={Array(18).fill(null)} // Assuming you have 14 items
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{gap:6}}
                />
            </View>
        </SafeAreaView>
    )
}
export default Chat

