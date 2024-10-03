import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
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

const Home = ({ navigation }) => {
  const { numberOfItemOrdered } = useContext(MyContext);
  return (
    <SafeAreaView>
      <StatusBar hidden={false} backgroundColor='black' style='light' />
      <View style={{ flexDirection: 'column', height: '100%', width: '100%', backgroundColor: 'black' }}>
        <Text style={{ textAlign: 'center', color: 'white' }}>Explore</Text>
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
              FoodImage={noodles}
              FoodPrice={100}
              TimeToCook={30}
            />
            <FoodItems
              FoodImage={momo}
              FoodPrice={30}
              TimeToCook={10}
            />
            <FoodItems
              FoodImage={chatapate}
              FoodPrice={200}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={chatapate}
              FoodPrice={200}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={chatapate}
              FoodPrice={200}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={chatapate}
              FoodPrice={200}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={chatapate}
              FoodPrice={200}
              TimeToCook={20}
            />




          </View>


        </ScrollView>



      </View>
    </SafeAreaView>
  )
}
export default Home

