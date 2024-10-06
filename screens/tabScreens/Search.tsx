import { View ,Text} from 'react-native'
import React, { useState } from 'react'
import UserInput from '../../components/auth/UserInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/auth/Button';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import IntroText from '../../components/auth/IntroText';

const Search = ({ navigation }) => {
    const [email, set_email] = useState(null)
    return (
        <SafeAreaView>
            <StatusBar hidden={false} backgroundColor='#F5F5F5' style='dark' />
            <View style={styles.mainViewStyle}>
              <Text>THis is Search</Text>
              
          </View>
        </SafeAreaView>
    )
}
export default Search

