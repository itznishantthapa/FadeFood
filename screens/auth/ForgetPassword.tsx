import { Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import UserInput from '../../components/auth/UserInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/auth/Button';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import BigText from '../../components/auth/BigText';

const ForgetPassword = ({ navigation }) => {
    const [email, set_email] = useState(null)
    return (
        <SafeAreaView>
            <StatusBar hidden={false} backgroundColor='#F5F5F5' style='dark' />
            <View style={styles.mainViewStyle}>
                <BigText
                    headingText='Forget Password ?'
                    line1='Enter your email to reset' 
                    line2='' 
                    style={[styles.BigText_for_login,{marginBottom:0}]}
                />
                <UserInput
                    value={email}
                    onChangeText={set_email}
                    inputBoxStyle={styles.inputField}
                    authBox={[styles.authBox, { borderRadius: 8 }]}
                    inputTopic='Email Address'
                    isEyeNeeded={false}
                    passwordVisible={null}
                    togglePasswordVisibility={undefined}
                />
                <Button style={styles.loginButton} btnText='Send Code' handleAuthBtn={() => console.log('Send Code btn is pressed')} />
            </View>
        </SafeAreaView>
    )
}
export default ForgetPassword

