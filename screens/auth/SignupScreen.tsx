import { Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import UserInput from '../../components/auth/UserInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/auth/Button';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import IntroText from '../../components/auth/IntroText';

const SignupScreen = ({ navigation }) => {
    const [email, set_email] = useState(null)
    const [password, set_password] = useState({ initialPassword: '', confirmPassword: '' })
    const [passwordVisible, setPasswordVisible] = useState({ initialPassword: true, confirmPassword: true });

    const togglePasswordVisibility = (field: string) => {
        setPasswordVisible((prevState) => ({
            ...prevState, [field]: !prevState[field]
        }));


    };
    return (
        <SafeAreaView>
            <StatusBar hidden={false} backgroundColor='#F5F5F5' style='dark' />
            <View style={styles.mainViewStyle}>
                <IntroText
                    headingText='Join Us,'
                    line1='Sign up to connect with'
                    line2='your favorite food'
                    style={styles.BigText_for_login}
                />
                <UserInput
                    value={email}
                    onChangeText={set_email}
                    inputBoxStyle={styles.inputField}
                    authBox={[styles.authBox, { borderTopRightRadius: 10, borderTopLeftRadius: 10 }]}
                    inputTopic='Email Address'
                    isEyeNeeded={false}
                    passwordVisible={false}
                    togglePasswordVisibility={undefined}
                />
                <UserInput
                    value={password.initialPassword}
                    onChangeText={(text) => set_password({ ...password, initialPassword: text })}
                    inputBoxStyle={styles.inputField}
                    authBox={styles.authBox}
                    inputTopic='Password'
                    isEyeNeeded={true}
                    passwordVisible={passwordVisible.initialPassword}
                    togglePasswordVisibility={() => togglePasswordVisibility('initialPassword')}
                />
                <UserInput
                    value={password.confirmPassword}
                    onChangeText={(text) => set_password({ ...password, confirmPassword: text })}
                    inputBoxStyle={styles.inputField}
                    authBox={[styles.authBox, { borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }]}
                    inputTopic='Confirm Password'
                    isEyeNeeded={true}
                    passwordVisible={passwordVisible.confirmPassword}
                    togglePasswordVisibility=
                    {() => togglePasswordVisibility('confirmPassword')}
                />
                <Button
                    style={styles.loginButton}
                    btnText='Sign In'
                    handleAuthBtn={() => console.log('signup btn is pressed')}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#757575', marginTop: 10, fontSize: 15 }}>Already have an account ?</Text>
                    <TouchableWithoutFeedback onPress={() => { navigation.navigate('LoginScreens') }}>
                        <Text style={{ color: '#4CAF50', marginTop: 10, fontSize: 18 }}> Login</Text>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        </SafeAreaView>
    )
}
export default SignupScreen;

