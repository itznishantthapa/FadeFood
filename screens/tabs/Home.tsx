import { View, Text, ImageBackground, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import UserInput from '../../components/auth/UserInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/auth/Button';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import IntroText from '../../components/auth/IntroText';
import dessert from '../../assets/dessert.jpg'
import noodles from '../../assets/noodles.jpeg'
import momo from '../../assets/momo.jpeg'
import chatapate from '../../assets/chatapate.jpeg'
import FoodItems from '../../components/home/FoodItems';
import { ScrollView } from 'react-native-gesture-handler';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { MyContext } from '../../context/AppProvider';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'



const Home = ({ navigation }) => {
  const { numberOfItemOrdered } = useContext(MyContext);
  return (
    <SafeAreaView>
      <StatusBar hidden={false} backgroundColor='#0d1b2a' style='light' />
      <View style={{ flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#D7D7D7' }}>
        <View style={styles.dashboardContainer}>
          <View style={styles.homeHeading}>
            <View style={styles.navBar}>
              <Image source={require('../../assets/grey.png')} style={styles.logo}></Image>
              <View style={styles.searchBar}>
                <Feather name="search" size={30} style={{ color: '#666666' }} />
                <TextInput selectionColor="#BDBDBD" style={styles.searchInput} placeholder='your favorite restaurant...'></TextInput>
              </View>
              <Ionicons name='scan' size={35} style={{ color: 'white' }}></Ionicons>
            </View>
            <View style={{ padding: 10, width: '100%' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#eaf4f4' }}>Pre-order</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#eaf4f4' }}>your favorite meals</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#eaf4f4' }}>skip the wait!</Text>
            </View>
          </View>
          <View style={[styles.homeMap, { padding: 10, borderRadius: 20, width: '100%' }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Found restaurant nearby</Text>
            <View style={{ borderWidth: 10, borderColor: 'white', height: '90%', borderRadius: 20 }}>

            </View>
          </View>
          <View style={styles.home_categories_options}>
            <View style={{ width: 130, height: 50, backgroundColor: '#7CB518', borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', }}>Desert</Text>
            </View>
            <View style={{ width: 130, height: 50, backgroundColor: '#ffffff', borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Food</Text>
            </View>
            <View style={{ width: 130, height: 50, backgroundColor: '#ffffff', borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Drink</Text>
            </View>
          </View>
        </View>
        {
          numberOfItemOrdered ? <View style={{ backgroundColor: '#007200', width: 150, height: 50, borderRadius: 50, position: 'absolute', zIndex: 999, flexDirection: 'row', justifyContent: 'center', gap: 5, alignItems: 'center', marginLeft: '55%', marginTop: 30 }}>
            <Fontisto name='wallet' size={20} style={{ color: 'white' }} />
            <Text style={{ color: 'white', fontSize: 20 }}>Checkout</Text>
          </View> : null
        }


        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', width: '100%', gap: 10 }}>
            {/* I want to make here floating checkout button */}



            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />

          </View>


        </ScrollView>



      </View>
    </SafeAreaView>
  )
}
export default Home

