import { View ,Text} from 'react-native'
import React, { useState } from 'react'
import UserInput from '../../components/auth/UserInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/auth/Button';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import IntroText from '../../components/auth/IntroText';

const Profile = ({ navigation }) => {
    return (
        <SafeAreaView>
            <StatusBar hidden={false} backgroundColor='#dc2f02' style='light' />
            <View style={styles.mainViewStyle}>
              <Text>THis is Profile</Text>
              
          </View>
        </SafeAreaView>
    )
}
export default Profile

