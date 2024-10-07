import React, { useState } from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import PagerView from 'react-native-pager-view';
import { styles } from '../../style/style';
import NabBar from '../../components/home/NavBar';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Button from '../../components/auth/Button';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const images = [
  require('../../assets/chatapate.jpeg'),
  require('../../assets/noodles.jpeg'), // Add your second image here
  require('../../assets/momo.jpeg'), // Add your third image here
];

const ViewFood = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={false} backgroundColor='#dc2f02' style='light' />
      <View style={[styles.home_screen, { alignItems: 'center' }]}>
        <NabBar />
        <View style={{ height: '50%', width: '100%' }}>
          <PagerView
            style={{ flex: 1 }}
            initialPage={0}
            onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
          >
            {images.map((image, index) => (
              <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image resizeMode='cover' style={{ height: '100%', width: '100%' }} source={image} />
              </View>
            ))}
          </PagerView>
          <View style={styles1.dotContainer}>
            {images.map((_, index) => (
              <Text key={index} style={index === activeIndex ? styles1.activeDot : styles1.dot}>o</Text>
            ))}
          </View>
        </View>
        {/* I am going to add the name of the food and price and name of the restaurant here with its logo and also -1+ number of food item */}
        <View style={styles1.foodInfo}>
          <View style={styles1.orderName}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'jakarta_bold', fontSize: 25 }}>Chatepate</Text>
              <Text style={{ fontFamily: 'jakarta_bold', color: 'grey' }}>by</Text>
            </View>
            <Text style={{ fontFamily: 'jakarta_bold', color: 'grey' }}>Deliceaous Restaurant</Text>
          </View>

          <View style={styles1.orderAmount}>
            <View style={styles.price}>
              <Text style={{ fontSize: 15, color: '#ff6b35', fontFamily: 'montserrat_semibold' }}>Rs.</Text>
              <Text style={{ fontSize: 30, color: '#ff6b35', fontFamily: 'montserrat_semibold' }}>50</Text>
            </View>
            <View style={styles1.orderNumber}>
              <SimpleLineIcons name='minus' size={40}></SimpleLineIcons>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>1</Text>
              <SimpleLineIcons name='plus' size={40}></SimpleLineIcons>
            </View>
          </View>
        </View>
        <View style={styles1.time_and_feedback}>
          <View style={styles1.time}>
            <Text style={styles1.timeText}>Ready in </Text>
            <Text style={[styles1.timeText,{fontSize:18}]}>( 20 mins </Text>
            <MaterialCommunity name='clock-time-eight-outline' style={{ marginTop: 5 }} size={20} color="grey" />
          </View>
          <Text style={styles1.separator}>|</Text>
          <View style={styles1.feedback}>
          <FontAwesome name='star' size={20} style={{ marginTop: 5 }} color="#FFD700" />
            <Text style={styles1.feedbackText}>4.5 ) Feedback</Text>

          </View>
        </View>
        {/* food description here */}
        <View style={styles1.description}>
          <Text style={{ fontFamily: 'jakarta_bold', fontSize: 20, color: 'black', marginTop: 10 }}>Description</Text>
          <Text style={{ fontFamily: 'montserrat_semibold', fontSize: 15, color: 'grey' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla facilisi. Donec ut ex nec enim tincidunt ultricies. Ut nec   </Text>
        </View>
        <Button
          btnText={'Add on list'}
          style={[styles.loginButton, { backgroundColor: '#ff6b35', width: '80%', marginTop: 10 }
          ]}
          handleAuthBtn={() => console.log('Adding to cart')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles1 = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  dot: {
    fontSize: 20,
    color: '#888',
    margin: 3,
  },
  activeDot: {
    fontSize: 20,
    color: '#fff',
    margin: 3,
  },
  foodInfo: {
    height: '10%',
    width: '100%',
    backgroundColor: '#e9ecef',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,

  },
  orderNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 110,
    // backgroundColor: 'white',
  },
  orderName: {
    width: 'auto',
    height: '100%',
    // backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  orderAmount: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time_and_feedback: {
    height: '7%',
    width: '100%',
    // backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '49%',
    padding: 3,
    // gap: 5,
  },
  timeText: {
    color: 'grey',
    fontFamily: 'jakarta_bold',
    fontSize: 18,
  },
  separator: {
    fontSize: 40,
    color: 'grey',
  },
  feedback: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '49%',
    gap: 5,
  },
  feedbackText: {
    color: 'grey',
    fontFamily: 'jakarta_bold',
    fontSize: 18,
  },
  description: {
    width: '100%',
    padding: 10,
    alignItems: 'flex-start',
    borderRadius: 20,
    height: '15%',
    flexDirection:'column',
    justifyContent:'center',
    gap:5,
  },
});

export default ViewFood;