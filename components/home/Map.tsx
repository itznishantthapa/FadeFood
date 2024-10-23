import { StyleSheet, Text, View,Image,Dimensions  } from 'react-native'
import React from 'react'
import { styles } from '../../style/style'

const { width, height } = Dimensions.get('window');

const Map = () => {
  return (
    <View style={[styles.homeMap,{width:width*1}]}>
      {/* <View style={{borderColor:'#000000',width:width*0.60,height:'auto',borderBottomWidth:2}}>
        <Text style={{  fontSize:width*0.07, fontFamily:'pacifico',color:'#000000' }}>Explore your nearby</Text>
      </View> */}
    <View style={styles.map_box}>
        <Image style={{height:'100%' ,width:'100%',borderRadius:10}} resizeMode='cover' source={require('../../assets/map.jpg')}></Image>
    </View>
  </View>
  )
}

export default Map;