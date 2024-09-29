import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import UserInput from '../../components/auth/UserInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/auth/Button';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import BigText from '../../components/auth/BigText';

const LoginScreens = () => {
    const [email, set_email] = useState(null)
    const [password, set_password] = useState(null)
    return (
        <SafeAreaView>
            <StatusBar hidden={false} backgroundColor='black' style='light' />
            <View style={styles.mainViewStyle}>
                <BigText headingText='Welcome Back,' line1='Sign in to continue your' line2='FadeFood account' style={styles.BigText_for_login}/>
                <UserInput value={email} onChangeText={set_email} inputBoxStyle={styles.inputField} authBox={[styles.authBox, { borderTopRightRadius: 10, borderTopLeftRadius: 10 }]} inputTopic='Email Address' eyeNeeded={false}/>
                <UserInput value={password} onChangeText={set_password} inputBoxStyle={styles.inputField} authBox={[styles.authBox,{borderBottomRightRadius:10,borderBottomLeftRadius:10}]} inputTopic='Password' eyeNeeded={true}  />
                <Text style={{color:'#757575',fontWeight:'bold',marginLeft:'auto',paddingRight:'10%',marginTop:20}}>Forget Password?</Text>
                <Button style={styles.loginButton} btnText='Login' />
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#757575',fontWeight:'bold',marginTop:10,fontSize:15}}>Dont have an account?</Text>
                <Text style={{color:'#009688',fontWeight:'bold',marginTop:10,fontSize:20}}> Sign Up</Text>
                </View>

            </View>
        </SafeAreaView>
    )
}
export default LoginScreens

