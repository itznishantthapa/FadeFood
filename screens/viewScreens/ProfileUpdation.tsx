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




const ProfileUpdation = ({ navigation }) => {
  const { state, userData, dispatch, isLoading, setisLoading,snackBar,setsnackBar } = useContext(myContext);




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
      // setprofile_picture(selectedImage);
    }
  };


  const handleDeletePicture = () => {
    Keyboard.dismiss()
    if (state.profile_picture == null) {
      return;
    }
    Alert.alert(
      'Delete Picture',
      'Are you sure you want to delete your picture?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            setisLoading(true)
            const response = await delete_data('user_details');
            // setprofile_picture(null)
            setisLoading(false)
            setsnackBar(true)
            dispatch({type:'snackmessage',payload:response.data})
            setTimeout(() => setsnackBar(false), 3000);

          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleSave = async () => {
    Keyboard.dismiss()
    setisLoading(true)
    const method = state.name ? 'put' : 'post';
    console.log('Data is being ', method);
    const response = await post_data_with_img('edit_user_details', {name:state.name,phone:state.phone,email:state.email}, state.profile_picture, method);
    if (response.success) {
      setisLoading(false)
      setsnackBar(true)
      dispatch({type:'snackmessage',payload:response.data})
      setTimeout(() => setsnackBar(false), 3000);
    
    } else {
      setisLoading(false)
      Alert.alert('Error', response.data);
    }
  };

  return (
    <>
      {
        isLoading && (
          <LoadingScreen />
        )
      }

      <SafeAreaView >
        <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
        <TopBar navigation={navigation} top_title='Edit Profile' withSettingIcons={undefined} handleSettingIcon={undefined}/>
        <View style={[styles.home_screen, { alignItems: 'flex-start', paddingLeft: scaleWidth(40) }]}>


          <View style={ownstyle.image_container}>
            <UserInfo photo={state.profile_picture}></UserInfo>
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