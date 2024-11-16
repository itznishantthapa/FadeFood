import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import TopBar from '../../components/viewScreens/TopBar'
import { styles } from '../../style/style'
import UserInfo from '../../components/profile/UserInfo'
import { scaleHeight, scaleWidth } from '../../Scaling'
import EditProfileButton from '../../components/profile/EditProfileButton'
import TextEditFields from '../../components/profile/TextEditFields'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'


const PrivacyAndSecurity = ({ navigation }) => {
    const [inputOldPassValue, setInputNameValue] = useState('')
    const [inputNewPassValue, setInputPhoneValue] = useState('')


    const handleOldPassInputChange = (text) => {
        setInputNameValue(text)
    }
    const handleNewPassInputChange = (text) => {
        setInputPhoneValue(text)
    }

    return (
        <SafeAreaView >
            <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
            <TopBar navigation={navigation} top_title='Privacy and Security' withSettingIcons={false} handleSetting={undefined} />
            <View style={[styles.home_screen, { alignItems: 'flex-start', paddingLeft: scaleWidth(40) }]}>

                <TextEditFields
                    label_name={'Your Password'}
                    inputmode={'text'}
                    key_type={'default'}
                    given_value={inputOldPassValue}
                    handleInputChange={handleOldPassInputChange}
                />
                <TextEditFields
                    label_name={'New Password'}
                    inputmode={'text'}
                    key_type={'default'}
                    given_value={inputNewPassValue}
                    handleInputChange={handleNewPassInputChange}
                />

                <TouchableWithoutFeedback onPress={() => navigation.navigate('ForgetPassword')}>
                    <Text style={{ color: '#757575', marginLeft: 'auto', paddingRight: '10%', marginTop: scaleHeight(20), fontFamily: 'poppins_regular', fontSize: scaleWidth(12) }}>Forget Password?</Text>
                </TouchableWithoutFeedback>
            </View>

        </SafeAreaView>
    )
}

export default PrivacyAndSecurity

const ownstyle = StyleSheet.create({
    image_container: {
        flexDirection: 'row',
        gap: scaleWidth(10),
        alignItems: 'center',
        marginTop: scaleWidth(10)
    },
    button_container: {
        flexDirection: 'column',
        gap: scaleWidth(5),
    }
})