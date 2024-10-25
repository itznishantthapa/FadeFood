import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { styles } from '../../style/style';
import { scaleHeight, scaleWidth } from '../../Scaling';

const RecentSearchBar = ({search_pharse}) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>

    <View style={[styles.searchBar, { height: 'auto', width: 'auto' }]}>
        <Text style={{fontFamily:'poppins_regular',fontSize:scaleWidth(14)}}>{search_pharse}</Text>
    </View>

    <View style={[styles.searchView, { height: scaleHeight(30), width: scaleWidth(35) }]}>
        <Feather
            name="search"
            size={scaleWidth(20)}
            style={{ color: '#FF5722' }}
        />
    </View>

</View>
  )
}

export default RecentSearchBar

// const styles = StyleSheet.create({})