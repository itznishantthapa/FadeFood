import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native' // Add TouchableOpacity
import React, { useState } from 'react' // Add useState
import Price from '../viewScreens/Price'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Reviews from './Reviews'
import { scaleHeight, scaleWidth } from '../../Scaling'

const NearDishCard = ({ image, price, name, reiwesNumber, rating }) => {
    // Add state for tracking favorite status
    const [isFavorite, setIsFavorite] = useState(false);

    // Toggle favorite function
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <TouchableOpacity style={{ height: scaleHeight(165), width: scaleWidth(150), backgroundColor: '#FFFFFF', borderRadius: scaleWidth(15), padding: 5 }}>
            <View style={{ height: '60%', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                <View style={{  position: 'absolute', top:scaleHeight(-25), left: scaleWidth(-25) }}>
                    <Image resizeMode='stretch' style={{ height: scaleHeight(120), width: scaleWidth(120), }} source={image}></Image>
                </View>
                
                {/* Wrap the favorite icon in TouchableOpacity */}
                <TouchableOpacity 
                    onPress={toggleFavorite}
                    style={{ 
                        height: scaleHeight(30), 
                        width: scaleWidth(40), 
                        backgroundColor: isFavorite ? '#FF6347' : '#FFFFFF', // Change background based on state
                        borderTopRightRadius: 12, 
                        borderBottomLeftRadius: 12, 
                        marginLeft: 'auto', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                    }}
                >
                    <MaterialIcon 
                        name={isFavorite ? 'favorite' : 'favorite-border'} // Change icon based on state
                        size={scaleWidth(25)} 
                        style={{ 
                            color: isFavorite ? '#8B0000' : '#8D6E63' // Change color based on state
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ height: '40%', paddingHorizontal: scaleWidth(10) }}>
                <Price price={price} priceFontSize={15} />
                <Text style={{ fontFamily: 'poppins_semibold', fontSize:scaleWidth(14)  }}>{name}</Text>
                <Reviews reviewsName={'Reviews'} reviewsNumber={320} rating={4.5} />
            </View>
        </TouchableOpacity>
    )
}

export default NearDishCard