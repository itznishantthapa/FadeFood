import { Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import UserInput from '../../components/auth/UserInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/auth/Button';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import IntroText from '../../components/auth/IntroText';
import { scaleHeight, scaleWidth } from '../../Scaling';

const LoginScreens = ({ navigation }) => {
    const [email, set_email] = useState(null)
    const [password, set_password] = useState(null)
    const [passwordVisible, setPasswordVisible] = useState(true);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        <SafeAreaView>
            <StatusBar hidden={false} backgroundColor='#F5F5F5' style='dark' />
            <View style={styles.mainViewStyle}>
                <IntroText
                    headingText='Hi Foodie,'
                    line1='Sign in to feast on your'
                    line2='fadefood delights'
                    style={styles.BigText_for_login}
                />
                <UserInput
                    value={email}
                    onChangeText={set_email}
                    inputBoxStyle={styles.inputField}
                    authBox={[styles.authBox, { borderTopRightRadius: 8, borderTopLeftRadius: 8 }]}
                    inputTopic='Email Address'
                    isEyeNeeded={false}
                    passwordVisible={passwordVisible}
                    togglePasswordVisibility={togglePasswordVisibility}
                />
                <UserInput
                    value={password}
                    onChangeText={set_password}
                    inputBoxStyle={styles.inputField}
                    authBox={[styles.authBox, { borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }]}
                    inputTopic='Password'
                    isEyeNeeded={true}
                    passwordVisible={passwordVisible}
                    togglePasswordVisibility={togglePasswordVisibility}
                />
                <TouchableWithoutFeedback onPress={() => navigation.navigate('ForgetPassword')}>
                    <Text style={{ color: '#757575', marginLeft: 'auto', paddingRight: '10%', marginTop: scaleHeight(20), fontFamily: 'poppins_regular', fontSize: scaleWidth(12) }}>Forget Password?</Text>
                </TouchableWithoutFeedback>
                <Button style={styles.loginButton} btnText='Login' handleAuthBtn={() => { navigation.navigate('TabBars') }} />
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#757575', marginTop: scaleHeight(10), fontSize: scaleWidth(15), fontFamily: 'poppins_regular' }}>Don&#39;t have an account ?</Text>
                    <TouchableWithoutFeedback onPress={() => { navigation.navigate('SignupScreen') }}>
                        <Text style={{ color: '#4CAF50', marginTop: scaleHeight(10), fontSize: scaleWidth(18), fontFamily: 'poppins_regular' }}> SignUp</Text>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        </SafeAreaView>
    )
}
export default LoginScreens

