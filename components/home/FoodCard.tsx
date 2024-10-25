import { StyleSheet, Text, View,Dimensions,Image } from 'react-native'
import React from 'react'
import Price from '../viewScreens/Price'
import Reviews from './Reviews'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { styles } from '../../style/style'
import { scaleHeight, scaleWidth } from '../../Scaling'

const { width, height } = Dimensions.get('window')

const FoodCard = ({ food_picture,price, discount, foodName, no_fragments, eatsNumber, rating, location }) => {
  return (
    <View style={{ 
      
      backgroundColor: '#ffffff', 
       width: Dimensions.get('window').width / 2 - 15 ,
      marginBottom:10 }}
      
      >
      <View style={{ height: scaleHeight(150), width: '100%' }}>
        <Image resizeMode='cover' style={{height:'100%',width:'100%'}} source={food_picture}></Image>
      </View>


      {/* <View style={{ paddingLeft: 15, paddingBottom: 5 }}> */}
      <View style={{ padding:scaleWidth(15) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Price price={price} priceFontSize={24} />
          { discount && <Text style={{ color: '#708090', fontWeight: 'bold', fontSize:scaleWidth(14),borderWidth: scaleWidth(1), borderColor: '#D3D3D3', paddingHorizontal: scaleWidth(4), borderRadius: 5, marginRight: scaleWidth(2)}}>get {discount}% off</Text> }
        </View>
        <Text style={{ fontFamily: 'poppins_semibold', fontSize: scaleWidth(20) }}>{foodName}</Text>
        { no_fragments && <Text style={{ backgroundColor: '#B0A4B5', paddingHorizontal: scaleWidth(5), alignSelf: 'flex-start', borderRadius: 4, marginBottom: scaleWidth(8), fontFamily: 'poppins_semibold', color: '#ffffff', fontSize: scaleWidth(12) }}>Collect Fragments {no_fragments}</Text> }
        <Reviews reviewsName={'Eats'} reviewsNumber={eatsNumber} rating={rating} />
        <View style={styles.location}>
          <Ionicon name='location-sharp' style={{ color: 'grey', marginBottom: scaleHeight(3) }} size={scaleWidth(15)} />
          <Text style={{ fontSize: scaleWidth(12), color: 'grey', fontFamily: 'poppins_semibold' }}>{location}</Text>
        </View>
      </View>
    </View>
  )
}

export default FoodCard

// const styles = StyleSheet.create({})