import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../../style/style'
import { Entypo } from '@expo/vector-icons';

const NabBar = () => {
  const [searchText, setsearchText] = useState('');
  const handleClear = () => {
    setsearchText('');
  }
  return (
    <View style={styles.navBar}>

      <View style={styles.logoContainer}>
        <Image source={require('../../assets/fadefood_logo.png')} style={styles.logo}></Image>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          selectionColor="#BDBDBD"
          style={styles.searchInput}
          placeholder='Go for your favorite restaurant'
          value={searchText}
          onChangeText={text => setsearchText(text)}
        />
        {
        searchText.length > 0 &&
          <TouchableOpacity onPress={handleClear}>
            <Entypo name='circle-with-cross' size={18} style={{ color: '#ced4da' }}></Entypo>
          </TouchableOpacity>
        }

        <View style={{ height: '95%', width: '18%', backgroundColor: '#FF5722', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginLeft: 'auto' }}>
          <Feather name="search" size={30} style={{ color: '#000000' }} />
        </View>
      </View>

    </View>
  )
}

export default NabBar