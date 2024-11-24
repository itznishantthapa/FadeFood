import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Image, TouchableOpacity } from 'react-native'
import List from '../viewScreens/List';
import chatpate from '../../assets/chatapate.jpeg';
import m1 from '../../assets/images/img1 (1).png';
import m2 from '../../assets/images/img1 (2).png';
import m3 from '../../assets/images/img1 (3).png';
import FoodItems from '../home/FoodItemsCard';
import { myContext } from '../../context/AppProvider';
// import { useRoute } from '@react-navigation/native';


export const MenuItemsScreen = ({navigation,foodItems}) => {
  // const { seller_state,food_state } = useContext(myContext);

  console.log('--------------------------------->***',foodItems);

    // const foodItems1 = [
    //     {
    //         price: "$5.00",
    //         foodName: "Chatpate",
    //         restaurantName: "Food Corner",
    //         image: { image1: m1, image2: m2, image3: m3 },
    //         isLoveNeeded: true,
    //       },
    //       {
    //         price: "$5.00",
    //         foodName: "Chatpate",
    //         restaurantName: "Food Corner",
    //         image: { image1: m1, image2: m2, image3: m3 },
    //         isLoveNeeded: true,
    //       },
    //       {
    //         price: "$5.00",
    //         foodName: "Chatpate",
    //         restaurantName: "Food Corner",
    //         image: chatpate,
    //         isLoveNeeded: true,
    //       },
    //       {
    //         price: "$5.00",
    //         foodName: "Chatpate",
    //         restaurantName: "Food Corner",
    //         image: chatpate,
    //         isLoveNeeded: true,
    //       },
    // ];


  
    return (
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.cardsContainer}>
          {foodItems.map((item) => (
                         <List
                         key={item.id}
                         price={item.food_price}
                         foodName={item.food_name}
                         restaurantName={undefined}
                         images={undefined}
                         navigation={navigation}
                         withRestaurant={false}
                       />
          ))}
        </View>
      </ScrollView>
    );
  };


const styles = StyleSheet.create({
    
     tabContent: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  cardsContainer: {
    padding: 16,
  },
  foodCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  foodImage: {
    width: '100%',
    height: 200,
  },
  foodDetails: {
    padding: 16,
  },
  foodName: {
    fontSize: 18,
    fontFamily: 'poppins_semibold',
    color: '#333',
  },
  foodPrice: {
    fontSize: 16,
    fontFamily: 'poppins_regular',
    color: '#E23744',
    marginTop: 4,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#E23744',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'poppins_semibold',
  },

})