import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../../style/style';
import NavBar from '../../components/home/NavBar';
import Button from '../../components/auth/Button';
import ItemName from '../../components/viewScreens/ItemName';
import Price from '../../components/viewScreens/Price';
import Time_FeedBack from '../../components/viewScreens/Time_FeedBack';
import FoodDescription from '../../components/viewScreens/FoodDescription';
import BigImage from '../../components/viewScreens/BigImage';
import Love from '../../components/viewScreens/Love';
import { scaleHeight, scaleWidth } from '../../Scaling';
import { bundlerModuleNameResolver } from 'typescript';
import { FontAwesome } from '@expo/vector-icons';
import Ant from 'react-native-vector-icons/AntDesign';
import ReviewSection from '../../components/viewScreens/ReviewSection';
import { ScrollView } from 'react-native-gesture-handler';


const ViewFood = ({ navigation }) => {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
      
      <View style={[styles.home_screen, { alignItems: 'center' }]}>

      {/* <ScrollView style={{width:'100%'}}> */}

    
        <BigImage />

        <View style={styles1.foodInfo}>
          <ItemName
            foodName={'Chatpate'}
            restaurantName={'Delicious Restaurant'}
            fontsize={scaleWidth(24)}
          />



        </View>

        <View style={styles1.review_container}>
          {/* Header Section */}
          <View style={styles1.header}>
            <Text style={styles1.headerTitle}>
              Rating & Reviews ({30})
            </Text>
            <TouchableOpacity
              style={styles1.seeMoreButton}
            // onPress={{}}
            >
              <Text style={styles1.seeMoreText}>See more</Text>
              <FontAwesome
                name="angle-right"
                size={scaleWidth(15)}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          <View style={{ gap: scaleHeight(5) }}>
            <ReviewSection person_name={'Nishant Thapa'} comment={'Food is very very testy'} ratingNumber={4}></ReviewSection>
            <ReviewSection person_name={'Rohan Rai'} comment={'Ekdam tasty raixa , love it....'} ratingNumber={3}></ReviewSection>
            <ReviewSection person_name={'Rohan Rai'} comment={'Ekdam tasty raixa , love it....'} ratingNumber={3}></ReviewSection>
          </View>
        </View>



        <View style={styles1.checkoutPriceBtnContainer}>
          <View>
            <Text style={{ fontFamily: 'poppins_semibold', fontSize: scaleWidth(25), color: 'white' }}>Rs. 120</Text>
          </View>
          <View style={styles1.checkoutBtn}>
            <Text style={{ fontFamily: 'poppins_semibold', fontSize: scaleWidth(16), color: '#FF5722' }}>Add Item</Text>
          </View>
        </View>
      {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

const styles1 = StyleSheet.create({
  foodInfo: {
    // height: '10%',
    width: '100%',
    backgroundColor: '#e9ecef',
    // padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingBottom: scaleWidth(5),
    paddingLeft: scaleWidth(15)
  },
  orderAmount: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutPriceBtnContainer: {
    width: '98%',
    height: scaleHeight(95),
    backgroundColor: '#FF5722',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scaleWidth(40),
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(30),
    // paddingLeft:scaleWidth(10),
    position: 'absolute',
    top: '89%'

  },
  checkoutBtn: {
    width: '35%',
    height: scaleHeight(50),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(20),
  },
  review_container: {
    width: '100%',
    // height:450,
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(12),
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(16),
  },
  headerTitle: {
    fontSize: scaleWidth(18),
    fontWeight: '700',
    color: '#1A1A1A',
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(4),
  },
  seeMoreText: {
    fontSize: scaleWidth(15),
    color: '#666',
  },


});

export default ViewFood;