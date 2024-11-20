import { StyleSheet, Text, View, Alert,Keyboard } from 'react-native'
import React, { useContext,useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import TopBar from '../../components/viewScreens/TopBar'
import { styles } from '../../style/style'
import UserInfo from '../../components/profile/UserInfo'
import { scaleWidth } from '../../Scaling'
import EditProfileButton from '../../components/profile/EditProfileButton'
import TextEditFields from '../../components/profile/TextEditFields'
import * as ImagePicker from 'expo-image-picker';
import { delete_data, post_data_with_img } from '../../service'
import { myContext } from '../../context/AppProvider'
import LoadingScreen from '../../components/viewScreens/LoadingScreen'
import SnackBar from './SnackBar'



const ProfileUpdation = ({ navigation }) => {
  const { state, dispatch, imageURI, setImageURI } = useContext(myContext);




  const pickImage = async () => {
    Keyboard.dismiss()
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      console.log(selectedImage);
      setImageURI(selectedImage);
    }
  };


  const handleDeletePicture = () => {
    Keyboard.dismiss()
    if (imageURI == null) {
      return;
    }
  };

  const handleSave = async () => {
    // Keyboard.dismiss()
    // setisLoading(true)
    // const method = userData ? 'put' : 'post';
    // console.log('Data is being ', method);
    // console.log(userData);
    // const response = await post_data_with_img('user_details', state, imageURI, method);
    // if (response.success) {
    //   setisLoading(false)
    //   setsnackBar(true)
    //   setmessage(response.data)
    //   setTimeout(() => setsnackBar(false), 3000);
    
    // } else {
    //   setisLoading(false)
    //   Alert.alert('Error', response.data);
    // }
  };

  return (
    <>
      {
        false && (
          <LoadingScreen />
        )
      }

      <SafeAreaView >
        <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
        <TopBar navigation={navigation} top_title='Edit Profile' withSettingIcons={false} handleSetting={undefined} />
        <View style={[styles.home_screen, { alignItems: 'flex-start', paddingLeft: scaleWidth(40) }]}>


          <View style={ownstyle.image_container}>
            <UserInfo photo={imageURI}></UserInfo>
            <View style={ownstyle.button_container}>
              <EditProfileButton button_name={'Change Picture'} handleButton={pickImage} />
              <EditProfileButton button_name={'Delete Picture'} handleButton={handleDeletePicture} />
              <EditProfileButton button_name={'Save'} handleButton={handleSave} />
            </View>
          </View>

          <TextEditFields
            label_name={'Name'}
            inputmode={'text'}
            key_type={'default'}
            given_value={state.name}
            handleInputChange={(text) => dispatch({ type: 'name', payload: text })}
          />
          <TextEditFields
            label_name={'Phone'}
            inputmode={null}
            key_type={'number-pad'}
            given_value={state.phone}
            handleInputChange={(num) => dispatch({ type: 'phone', payload: num })}
          />
          <TextEditFields
            label_name={'Email'}
            inputmode={null}
            key_type={'email-address'}
            given_value={state.email}
            handleInputChange={(text) => dispatch({ type: 'email', payload: text })}
          />
        </View>
        {/* <SnackBar message={message} visible={snackBar}/> */}
      </SafeAreaView>
    </>
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