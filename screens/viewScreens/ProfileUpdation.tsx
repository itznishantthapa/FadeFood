import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import TopBar from '../../components/viewScreens/TopBar'
import { styles } from '../../style/style'
import UserInfo from '../../components/profile/UserInfo'
import { scaleWidth } from '../../Scaling'
import EditProfileButton from '../../components/profile/EditProfileButton'
import TextEditFields from '../../components/profile/TextEditFields'


const ProfileUpdation = ({ navigation }) => {
  const [inputNameValue, setInputNameValue] = useState('Nishant Thapa')
  const [inputPhoneValue, setInputPhoneValue] = useState('9826327088')
  const [inputEmailValue, setInputEmailValue] = useState('itsnishantu@gamil.com')

  const handleNameInputChange = (text) => {
    setInputNameValue(text)
  }
  const handlePhoneInputChange = (text) => {
    setInputPhoneValue(text)
  }
  const handleEmailInputChange = (text) => {
    setInputEmailValue(text)
  }
  return (
    <SafeAreaView >
      <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
      <TopBar navigation={navigation} top_title='Edit Profile' />
      <View style={[styles.home_screen, { alignItems: 'flex-start', paddingLeft: scaleWidth(40) }]}>


        <View style={ownstyle.image_container}>
          <UserInfo></UserInfo>
          <View style={ownstyle.button_container}>
            <EditProfileButton button_name={'Change Picture'} />
            <EditProfileButton button_name={'Delete Picture'} />
          </View>
        </View>

        <TextEditFields
          label_name={'Name'}
          inputmode={'text'}
          key_type={'default'}
          given_value={inputNameValue}
          handleInputChange={handleNameInputChange}
        />
        <TextEditFields
          label_name={'Phone'}
          inputmode={null}
          key_type={'number-pad'}
          given_value={inputPhoneValue}
          handleInputChange={handlePhoneInputChange}
        />
        <TextEditFields
          label_name={'Email'}
          inputmode={null}
          key_type={'email-address'}
          given_value={inputEmailValue}
          handleInputChange={handleEmailInputChange}
        />
      </View>

    </SafeAreaView>
  )
}

export default ProfileUpdation

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