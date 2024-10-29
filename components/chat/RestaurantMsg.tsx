import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import grey from '../../assets/grey.png';
import { scaleHeight, scaleWidth } from '../../Scaling';

const { width, height } = Dimensions.get('window');

const RestaurantMsg = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback
            style={styles.container}
            onPress={() => navigation.navigate('Inbox')}
        >
            <View style={styles.imageContainer}>
                <Image resizeMode='contain' style={styles.image} source={grey} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.restaurantName}>Delicious Restaurant</Text>
                <Text style={styles.message}>Your food is ready, sir</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default RestaurantMsg;

const styles = StyleSheet.create({
    container: {
        height: height * 0.08,
        width: width,
        backgroundColor: '#F0F4F8',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(15),
    },
    imageContainer: {
        backgroundColor: 'black',
        height: scaleHeight(60),
        width: scaleWidth(60),
        borderRadius: scaleWidth(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: scaleWidth(10),
    },
    restaurantName: {
        fontFamily: 'jakarta_bold',
        color: 'grey',
        fontSize: scaleWidth(18),
    },
    message: {
        // fontFamily: 'inter_semibold',
        color: 'grey',
        fontSize: scaleWidth(14),
    },
});
