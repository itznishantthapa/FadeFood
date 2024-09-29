import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserInput from '../../components/auth/UserInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/auth/Button';

const LoginScreens = () => {
    return (
        <SafeAreaView >
            <View style={styles.mainViewStyle}>
               <UserInput value='' inputBoxStyle={[styles.inputField, { borderTopRightRadius: 10 }]} authBox={[styles.authBox,{borderTopRightRadius:10}]} inputTopic='Email' />
                <UserInput value=''  inputBoxStyle={styles.inputField} authBox={styles.authBox} inputTopic='Password'/>
                <Button style={styles.login} btnText='Login' />
            </View>
        </SafeAreaView>

  )
}

export default LoginScreens

const styles = StyleSheet.create({

    mainViewStyle:{
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection:'column',
       
    },
    inputField: {
        width: '100%',
        height: 50,
        // borderWidth: 1,
        // borderColor: '#adb5bd',
        color: '#adb5bd',
        fontWeight: 'bold',
    },
    login: {
        width: '80%',
        height: 55,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
    },
    authBox:{
        height:90,
        width:'80%',
        borderWidth:1,
        borderColor:'white',
        flexDirection:'column',
        justifyContent:'center',
        paddingLeft:20 
    }
})