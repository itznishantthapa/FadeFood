import { Text, TouchableWithoutFeedback, View, Alert, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import UserInput from '../../components/auth/UserInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/auth/Button';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import IntroText from '../../components/auth/IntroText';
import { scaleWidth } from '../../Scaling';
import { post_data, signup } from '../../service';
import { myContext } from '../../context/AppProvider';
import LoadingScreen from '../../components/viewScreens/LoadingScreen';
import { CommonActions } from '@react-navigation/native';

const SignupScreen = ({ navigation }) => {
    const { fetchData, isLoading, setisLoading,dispatch } = useContext(myContext)
    const [email, set_email] = useState(null)
    const [password, set_password] = useState({ initialPassword: null, confirmPassword: null })
    const [passwordVisible, setPasswordVisible] = useState({ initialPassword: true, confirmPassword: true });

    const togglePasswordVisibility = (field: string) => {
        setPasswordVisible((prevState) => ({
            ...prevState, [field]: !prevState[field]
        }));
    };

    const handleSignUp = async () => {
        Keyboard.dismiss()
        setisLoading(true)
        if (email === null || password.initialPassword === null || password.confirmPassword === null) {
            setisLoading(false)
            Alert.alert('Error', 'Please fill all the fields')
            return
        }
        else if (password.initialPassword !== password.confirmPassword) {
            setisLoading(false)
            Alert.alert('Error', 'Password does not match')
            return
        }
        
        const response = await signup({ email: email, password: password.initialPassword })
        if (response.success) {
           await fetchData()
            setisLoading(false)
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'TabBars' }],
                })
            );

         
        } else {
            Alert.alert('Error', response.message)
            setisLoading(false)
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
                            btnText='Sign Up'
                            handleAuthBtn={handleSignUp}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#757575', marginTop: 10, fontSize: scaleWidth(15), fontFamily: 'poppins_regular' }}>Already have an account ?</Text>
                            <TouchableWithoutFeedback onPress={() => { navigation.navigate('LoginScreens') }}>
                                <Text style={{ color: '#4CAF50', marginTop: 10, fontSize: scaleWidth(18), fontFamily: 'poppins_regular' }}> Login</Text>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    )
}
export default SignupScreen;
