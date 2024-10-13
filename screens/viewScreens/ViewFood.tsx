import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../../style/style';
import NabBar from '../../components/home/NavBar';
import Button from '../../components/auth/Button';
import ItemName from '../../components/viewScreens/ItemName';
import Price from '../../components/viewScreens/Price';
import Time_FeedBack from '../../components/viewScreens/Time_FeedBack';
import FoodDescription from '../../components/viewScreens/FoodDescription';
import BigImage from '../../components/viewScreens/BigImage';
import Love from '../../components/viewScreens/Love';


const ViewFood = ({ navigation }) => {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={false} backgroundColor='#dc2f02' style='light' />
      <View style={[styles.home_screen, { alignItems: 'center' }]}>
        <NabBar />
        <BigImage />

        <View style={styles1.foodInfo}>
          <ItemName
          foodName={'Chatpate'}
          restaurantName={'Delicious Restaurant'}
          />
          <View style={styles1.orderAmount}>
            <Price
            price={'50'}
            />
          <Love/>
          </View>
        </View>

        <Time_FeedBack />
        <FoodDescription />

        <Button
          btnText={'Add on list'}
          style={[styles.loginButton, { backgroundColor: '#ff6b35', width: '80%', marginTop: 10 }
          ]}
          handleAuthBtn={() => { navigation.navigate('FoodList') }}
        />

      </View>
    </SafeAreaView>
  );
};

const styles1 = StyleSheet.create({
  foodInfo: {
    height: '10%',
    width: '100%',
    backgroundColor: '#e9ecef',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  orderAmount: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },


});

export default ViewFood;