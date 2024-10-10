import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dimensions, Image } from 'react-native'
import grey from '../../assets/grey.png'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
const { width, height } = Dimensions.get('window')

const RestaurantMsg = ({navigation}) => {
    return (
        <TouchableWithoutFeedback style={{ height: height * 0.08, width: width, backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', gap: 10, paddingHorizontal: 10 }} onPress={()=>{navigation.navigate('Inbox')}}>
            <View style={{ backgroundColor: 'red', height: 60, width: 60, borderRadius: 50, alignItems: 'center' }}>
                <Image resizeMode='contain' style={{ height: '100%', width: '100%' }} source={grey}></Image>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={{ fontFamily: 'jakarta_bold', color: 'grey', fontSize: 20 }}>Delicious Restaurant</Text>
                <Text style={{ fontFamily: 'inter_semibold', color: 'grey' }}>your food is ready sir</Text>
            </View>

        </TouchableWithoutFeedback>
    )
}

export default RestaurantMsg

const styles = StyleSheet.create({})