import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../../style/style'

const NabBar = () => {
  return (
    <View style={styles.navBar}>
      <Image source={require('../../assets/grey.png')} style={styles.logo}></Image>
      <View style={styles.searchBar}>
        <Feather name="search" size={30} style={{ color: '#666666' }} />
        <TextInput selectionColor="#BDBDBD" style={styles.searchInput} placeholder='your favorite restaurant...'></TextInput>
      </View>
      <Ionicons name='scan' size={35} style={{ color: 'white' }}></Ionicons>
    </View>
  )
}

export default NabBar