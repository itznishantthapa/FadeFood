import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { styles } from '../../style/style'

const Map = () => {
  return (
    <View style={styles.homeMap}>
      <View style={{borderColor:'#000000',width:'65%',height:'auto',borderBottomWidth:2}}>
        <Text style={{  fontSize: 30, fontFamily:'pacifico',color:'#000000' }}>Explore your nearby</Text>
      </View>
    <View style={styles.map_box}>
        <Image style={{height:'100%' ,width:'100%',borderRadius:10}} source={require('../../assets/map.jpg')}></Image>
    </View>
  </View>
  )
}

export default Map;