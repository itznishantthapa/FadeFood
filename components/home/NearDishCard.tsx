import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native' // Add TouchableOpacity
import React, { useState } from 'react' // Add useState
import Price from '../viewScreens/Price'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Reviews from './Reviews'

const NearDishCard = ({ image, price, name, reiwesNumber, rating }) => {
    // Add state for tracking favorite status
    const [isFavorite, setIsFavorite] = useState(false);

    // Toggle favorite function
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <View style={{ height: 165, width: 150, backgroundColor: '#FFFFFF', borderRadius: 15, padding: 5 }}>
            <View style={{ height: '60%', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                <View style={{  position: 'absolute', top: -25, left: -25 }}>
                    <Image resizeMode='stretch' style={{ height: 120, width: 120, }} source={image}></Image>
                </View>
                
                {/* Wrap the favorite icon in TouchableOpacity */}
                <TouchableOpacity 
                    onPress={toggleFavorite}
                    style={{ 
                        height: 30, 
                        width: 40, 
                        backgroundColor: isFavorite ? '#FF6347' : '#FFFFFF', // Change background based on state
                        borderTopRightRadius: 12, 
                        borderBottomLeftRadius: 12, 
                        marginLeft: 'auto', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        elevation: 2 // Optional: adds shadow on Android
                    }}
                >
                    <MaterialIcon 
                        name={isFavorite ? 'favorite' : 'favorite-border'} // Change icon based on state
                        size={25} 
                        style={{ 
                            color: isFavorite ? '#8B0000' : '#FF6347' // Change color based on state
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ height: '40%', paddingHorizontal: 10 }}>
                <Price price={price} priceFontSize={15} />
                <Text style={{ fontFamily: 'poppins_semibold', fontSize: 14 }}>{name}</Text>
                <Reviews reviewsName={'Reviews'} reviewsNumber={320} rating={4.5} />
            </View>
        </View>
    )
}

export default NearDishCard