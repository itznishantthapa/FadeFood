import { View } from 'react-native'
import React, { useState } from 'react'
import UserInput from '../../components/auth/UserInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/auth/Button';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import IntroText from '../../components/auth/IntroText';

const ForgetPassword = ({ navigation }) => {
    const [email, set_email] = useState(null)
    return (
        <SafeAreaView>
            <StatusBar hidden={false} backgroundColor='#F5F5F5' style='dark' />
            <View style={styles.mainViewStyle}>
                <IntroText
                    headingText='Forget Password ?'
                    line1='Enter your email to reset' 
                    line2='' 
                    style={[styles.BigText_for_login,{marginBottom:0}]}
                />
                <UserInput
                    value={email}
                    onChangeText={set_email}
                    inputBoxStyle={[styles.inputField,{marginBottom:20}]}
                    authBox={[styles.authBox, { borderRadius: 8,height:60 }]}
                    inputTopic={null}
                    isEyeNeeded={false}
                    passwordVisible={null}
                    togglePasswordVisibility={undefined}
                />
                <Button style={styles.loginButton} btnText='Send Code' handleAuthBtn={() => navigation.navigate('VerificationScreen')} />
            </View>
        </SafeAreaView>
    )
}
export default ForgetPassword

