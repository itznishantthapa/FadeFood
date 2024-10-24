import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { styles } from '../../style/style';

const RecentSearchBar = ({search_pharse}) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
    <View style={[styles.searchBar, { height: 'auto', width: 'auto' }]}>
        <Text style={{fontFamily:'poppins_regular',fontSize:14}}>{search_pharse}</Text>
    </View>
    <View style={[styles.searchView, { height: 30, width: 35 }]}>
        <Feather
            name="search"
            size={20}
            style={{ color: '#FF5722' }}
        />
    </View>
</View>
  )
}

export default RecentSearchBar

// const styles = StyleSheet.create({})