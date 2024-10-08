import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../../style/style';
import NabBar from '../../components/home/NavBar';
import Button from '../../components/auth/Button';
import ItemName from '../../components/viewScreens/ItemName';
import Price from '../../components/viewScreens/Price';
import Increment_Decrement from '../../components/viewScreens/Increment_Decrement';
import Time_FeedBack from '../../components/viewScreens/Time_FeedBack';
import FoodDescription from '../../components/viewScreens/FoodDescription';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BigImage from '../../components/viewScreens/BigImage';


const ViewFood = ({ navigation }) => {
  const [isFavorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    setFavorite(!isFavorite);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={false} backgroundColor='#dc2f02' style='light' />
      <View style={[styles.home_screen, { alignItems: 'center' }]}>
        <NabBar />
        <BigImage />

        <View style={styles1.foodInfo}>
          <ItemName />
          <View style={styles1.orderAmount}>
            <Price />
            {
              isFavorite ? (<TouchableOpacity onPress={handleFavorite}>
                <MaterialIcons
                  style={{
                    color: 'red',
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 7
                  }}
                  name='favorite'
                  size={40}
                />
              </TouchableOpacity>) : (<TouchableOpacity onPress={handleFavorite}>
                <MaterialIcons
                  style={{
                    color: 'grey',
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 7
                  }}
                  name='favorite-outline'
                  size={40}
                />
              </TouchableOpacity>
              )
            }
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