import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { styles } from '../../style/style'

const Map = () => {
  return (
    <View style={styles.homeMap}>
      <View style={{borderColor:'#ffffff',width:'46%',height:'auto',borderBottomWidth:2}}>
        <Text style={{  fontSize: 20, fontFamily:'jakarta_bold',marginBottom:5,color:'#ffffff' }}>Explore your nearby</Text>
      </View>
    <View style={styles.map_box}>
        <Image style={{height:'100%' ,width:'100%',borderRadius:10}} source={require('../../assets/map.jpg')}></Image>
    </View>
  </View>
  )
}

export default Map;