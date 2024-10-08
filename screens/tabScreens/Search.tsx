import { View ,Text} from 'react-native'
import React, { useState } from 'react'
import UserInput from '../../components/auth/UserInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/auth/Button';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import IntroText from '../../components/auth/IntroText';
import NavBar from '../../components/home/NavBar';

const Search = ({ navigation }) => {
    return (
        <SafeAreaView>
        <StatusBar hidden={false} backgroundColor='#dc2f02' style='light' />
        <View style={styles.home_screen}>
          <NavBar />
              
          </View>
        </SafeAreaView>
    )
}
export default Search

