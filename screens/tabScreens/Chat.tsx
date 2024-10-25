import { View, Text, Dimensions,FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TopBar from '../../components/viewScreens/TopBar';
import RestaurantMsg from '../../components/chat/RestaurantMsg';

const { width, height } = Dimensions.get('window')


const Chat = ({ navigation }) => {
    const renderItem = ({ item }) => <RestaurantMsg navigation={navigation} />
       
        
    return (
        <SafeAreaView>
             <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
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

