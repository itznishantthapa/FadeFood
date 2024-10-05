import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { styles } from '../../style/style'

const Map = () => {
  return (
    <View style={styles.homeMap}>
    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Found restaurant nearby</Text>
    <View style={styles.map_box}>
        <Image style={{height:'100%' ,width:'100%',borderRadius:10}} source={require('../../assets/map.jpg')}></Image>
    </View>
  </View>
  )
}

export default Map

// const styles = StyleSheet.create({})