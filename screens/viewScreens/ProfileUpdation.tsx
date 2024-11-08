import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useContext } from 'react'
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



const ProfileUpdation = ({ navigation }) => {
  const { state, userData, dispatch, imageURI, setImageURI } = useContext(myContext);



  const pickImage = async () => {
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

    if (imageURI == null) {
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
            const response=await delete_data('user_details');
            setImageURI(null)
            Alert.alert('Success',response.data );

          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleSave = async () => {
    const method = userData ? 'put' : 'post';
    console.log('Data is being ', method);
    console.log(userData);
    const response = await post_data_with_img('user_details', state, imageURI, method);
    if (response.success) {
      Alert.alert('Success', response.data);
    } else {
      Alert.alert('Error', response.data);
    }
  };

  return (
    <SafeAreaView >
      <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
      <TopBar navigation={navigation} top_title='Edit Profile' />
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