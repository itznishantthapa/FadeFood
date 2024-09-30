import { Text, TouchableWithoutFeedback, View } from 'react-native'
import React,{useState} from 'react'
import UserInput from '../../components/auth/UserInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/auth/Button';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import BigText from '../../components/auth/BigText';

const LoginScreens = ({navigation}) => {
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
                <BigText 
                headingText='Welcome Back,' 
                line1='Sign in to continue your' 
                line2='fadefood account' 
                style={styles.BigText_for_login}
                />
                <UserInput 
                value={email} 
                onChangeText={set_email} 
                inputBoxStyle={styles.inputField} 
                authBox={[styles.authBox, { borderTopRightRadius: 10, borderTopLeftRadius: 10 }]} 
                inputTopic='Email Address' 
                isEyeNeeded={false} 
                passwordVisible={passwordVisible} 
                togglePasswordVisibility={togglePasswordVisibility}
                />
                <UserInput 
                value={password} 
                onChangeText={set_password} 
                inputBoxStyle={styles.inputField} 
                authBox={[styles.authBox,{borderBottomRightRadius:10,borderBottomLeftRadius:10}]} 
                inputTopic='Password' 
                isEyeNeeded={true} 
                passwordVisible={passwordVisible} 
                togglePasswordVisibility={togglePasswordVisibility}
                />
                <Text style={{color:'#757575',marginLeft:'auto',paddingRight:'10%',marginTop:20}}>Forget Password?</Text>
                <Button style={styles.loginButton} btnText='Login' />
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#757575',marginTop:10,fontSize:15}}>Dont have an account?</Text>
                <TouchableWithoutFeedback onPress={()=>{navigation.navigate('SignupScreen')}}>
                <Text style={{color:'#009688',marginTop:10,fontSize:18}}> SignUp</Text>
                </TouchableWithoutFeedback>
                </View>

            </View>
        </SafeAreaView>
    )
}
export default LoginScreens

