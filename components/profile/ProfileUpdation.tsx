import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import TopBar from '../viewScreens/TopBar'
import { styles } from '../../style/style'
import UserInfo from './UserInfo'
import { scaleWidth } from '../../Scaling'
import EditProfileButton from './EditProfileButton'
import TextEditFields from './TextEditFields'


const ProfileUpdation = ({ navigation }) => {
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

        <TextEditFields label_name={'Name'} inputmode={'text'} key_type={'default'}/>
        <TextEditFields label_name={'Phone'} inputmode={null} key_type={'number-pad'}/>
        <TextEditFields label_name={'Email'} inputmode={null} key_type={'email-address'} />


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