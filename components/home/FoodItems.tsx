import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useContext } from 'react';
import { ImageBackground } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { MyContext } from '../../context/AppProvider';

const FoodItems = ({ FoodImage, FoodPrice, TimeToCook }) => {
    const [numberOfItemOrdered, setnumberOfItemOrdered] = useState(null)
    const handleOrderItems = () => {
        setnumberOfItemOrdered(numberOfItemOrdered + 1)
    }
    const handleDeleteOrderItems = () => {
        setnumberOfItemOrdered(null)
    }
    return (
        <View style={{ height: 350, width: '48%', flexDirection: 'column', justifyContent: 'center' }}>
            <ImageBackground source={FoodImage} imageStyle={{ height: 350, borderRadius: 20 }} >
                <View style={{ height: '70%', width: '100%', alignItems: 'flex-end' }} >
                    <View style={{ borderRadius: 100, backgroundColor: 'orange', padding: 5 }}>
                        <MaterialCommunity name='glass-mug-variant' style={{ color: '#38040e' }} size={30} />
                    </View>
                </View>
                <View style={{ height: '30%', width: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 4, paddingLeft: 5, paddingBottom: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            numberOfItemOrdered ? <Text style={{ height: 30, width: 30, textAlign: 'center', paddingTop: 5, backgroundColor: '#4CAF50', borderRadius: 100, color: 'white', fontWeight: 'bold' }}>
                                {numberOfItemOrdered}
                            </Text> : null
                        }
                        <TouchableOpacity onPress={handleOrderItems}>
                            <Text style={{ padding: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 8, color: 'white' }}>
                                Italian Buff MoMo
                            </Text>
                        </TouchableOpacity>
                        {
                            numberOfItemOrdered ? <TouchableOpacity onPress={handleDeleteOrderItems}>
                                <MaterialCommunity name='delete-circle' size={30} style={{ color: 'red' }} />
                            </TouchableOpacity> : null
                        }

                    </View>
                    <View style={{ flexDirection: 'row', gap: 3 }}>
                        <Text style={{ padding: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 8, color: 'white' }}>
                            Rs. {FoodPrice}
                        </Text>
                        <Text style={{ padding: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 8, color: 'white' }}>
                            {TimeToCook} mins
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

export default FoodItems;
