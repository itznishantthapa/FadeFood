import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import Price from '../viewScreens/Price'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'


const NearDishCard = ({image,price,name,reiwesNumber,rating}) => {
    return (
        <View style={{ height: 165, width: 150, backgroundColor: '#FFFFFF', borderRadius: 15, padding: 5 }}>
            <View style={{ height: '60%', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                <View style={{ height: 120, width: 120, position: 'absolute', top: -25, left: -25 }}>
                    <Image resizeMode='cover' style={{ height: '100%', width: '100%' }} source={image}></Image>

                </View>
                <View style={{ height: 30, width: 40, backgroundColor: '#FF6347', borderTopRightRadius: 12, borderBottomLeftRadius: 12, marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialIcon name='favorite' size={25} style={{color:'#8B0000'}}></MaterialIcon>
                </View>
            </View>
            <View style={{ height: '40%', paddingHorizontal: 10 }}>
                <Price price={price} priceFontSize={15} />
                <Text style={{ fontFamily: 'poppins_semibold', fontSize: 14 }}>{name}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 20, gap: 8, marginTop: -5 }}>
                    <Text style={{ fontFamily: 'poppins_semibold', fontSize: 12, color: 'grey' }}>{reiwesNumber} Reviews</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                        <FontAwesome name='star' size={15} color="#FFD700" />
                        <Text style={{ fontFamily: 'poppins_semibold', fontSize: 12, color: 'grey' }}>{rating}</Text>
                    </View>

                </View>

            </View>

        </View>
    )
}

export default NearDishCard

// const styles = StyleSheet.create({})