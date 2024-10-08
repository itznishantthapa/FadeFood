import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemName from './ItemName'
import Price from './Price'
import Increment_Decrement from './Increment_Decrement'
import { Image } from 'react-native'

const List = () => {
    return (
        <View style={{ height: 150, width: '95%', backgroundColor: '#ffffff', borderRadius: 20, flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/chatapate.jpeg')} style={styles1.fod_img}></Image>
            <View style={styles1.fod_info}>
                <ItemName />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Price />
                    <Increment_Decrement />
                </View>
            </View>
        </View>
    )
}

export default List

const styles1 = StyleSheet.create({
    fod_img: {
        height: '100%',
        width: '30%',
        borderRadius: 20,

    },
    fod_info: {
        height: 130,
        width: '70%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 10,
        paddingHorizontal: 15
    }
})