import { Text, TouchableWithoutFeedback, View, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useState, useContext } from 'react'
import UserInput from '../../components/auth/UserInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/auth/Button';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import IntroText from '../../components/auth/IntroText';
import { scaleHeight, scaleWidth } from '../../Scaling';
import { get_data, login, post_data, signup } from '../../service';
import { myContext } from '../../context/AppProvider';
import LoadingScreen from '../../components/viewScreens/LoadingScreen';

const LoginScreens = ({ navigation }) => {
    const { fetchData, setisUserLoggedIn, isLoading, setisLoading,setsnackBar,setmessage } = useContext(myContext)
    const [email, set_email] = useState(null)
    const [password, set_password] = useState(null)
    const [passwordVisible, setPasswordVisible] = useState(true);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async () => {
        Keyboard.dismiss()
        if (email === null || password === null) {
            Alert.alert('Error', 'Please fill all the fields')
            return
        }
        setisLoading(true)
        const response = await login({ email: email, password: password })
        if (response.success) {
            console.log('Fetching user data-------')
            fetchData()
            setisUserLoggedIn(true);
            setisLoading(false)
            console.log('User data fetched-------')
            navigation.navigate('Home')
            
            setsnackBar(true)
            setmessage(response.returnData)
            setTimeout(() => setsnackBar(false), 3000);
        } else {
            setisLoading(false)
            Alert.alert('Error', response.returnData)
        }

    }
    return (
        <>
            {
                isLoading && (
                    <LoadingScreen />
                )
            }
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

                    <StatusBar hidden={false} backgroundColor='#F5F5F5' style='dark' />

                    <View style={[styles.mainViewStyle, { justifyContent: 'center' }]}>
                        <IntroText
                            headingText='Hi Foodie,'
                            line1='Sign in to feast on your'
                            line2='fadefood delights'
                            style={styles.BigText_for_login}
                        />
                        <View style={{ width: '100%', alignItems: 'center' }}>
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

                            <Button style={styles.loginButton} btnText='Login' handleAuthBtn={handleLogin} />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#757575', marginTop: scaleHeight(10), fontSize: scaleWidth(15), fontFamily: 'poppins_regular' }}>Don&#39;t have an account ?</Text>
                                <TouchableWithoutFeedback onPress={() => { navigation.navigate('SignupScreen') }}>
                                    <Text style={{ color: '#4CAF50', marginTop: scaleHeight(10), fontSize: scaleWidth(18), fontFamily: 'poppins_regular' }}> SignUp</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>

                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    )
}
export default LoginScreens

