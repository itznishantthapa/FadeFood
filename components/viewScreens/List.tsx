import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemName from './ItemName'
import Price from './Price'
import Increment_Decrement from './Increment_Decrement'
import { Image } from 'react-native'
import Love from './Love'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { scaleHeight, scaleWidth } from '../../Scaling'

const List = ({ isLoveNeeded, image, foodName, restaurantName, price, navigation }) => {
    const handlePress = () => {
        console.log('Pressed');
        navigation.navigate('ViewFood');
    }
    return (
        <TouchableWithoutFeedback style={{ height: 'auto', width: 'auto', alignItems: 'center' }} onPress={handlePress}>
            <View style={{ height: scaleHeight(80), width: '100%',backgroundColor:'white', borderRadius:scaleWidth(10),flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image source={image} style={styles1.fod_img}></Image>
                <View style={styles1.fod_info}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:"100%"}}>
                        <ItemName foodName={foodName} restaurantName={restaurantName} fontsize={18}/>
                        {
                            isLoveNeeded ? (<Love />) : (<Increment_Decrement />)
                        }
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Price price={price} priceFontSize={18} />
                        {true && <Text style={{ color: '#708090', textAlignVertical: 'center', fontWeight: 'bold', fontSize: scaleWidth(12), borderRadius: 5, marginRight: scaleWidth(2) }}>get {30}% off</Text>}
                        { true && <Text style={{ backgroundColor: '#B0A4B5', paddingHorizontal: scaleWidth(5), alignSelf: 'flex-start', borderRadius: 4, marginBottom: scaleWidth(8), fontFamily: 'poppins_semibold', color: '#ffffff', fontSize: scaleWidth(12) }}>Collect Fragments {12}</Text> }


                    </View>
                </View>
            </View>

        </TouchableWithoutFeedback>
    )
}

export default List

const styles1 = StyleSheet.create({
    fod_img: {
        height: '100%',
        width: '25%',
        borderTopLeftRadius:scaleWidth(10),
        borderBottomLeftRadius:scaleWidth(10)
    },
    fod_info: {
        height: scaleHeight(130),
        width: '75%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 15,
        paddingRight:4

    }
})