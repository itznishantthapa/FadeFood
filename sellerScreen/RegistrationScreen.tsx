import React, { useReducer, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import TextEditFields from '../components/profile/TextEditFields'
import TopBar from '../components/viewScreens/TopBar';
import LoadingScreen from '../components/viewScreens/LoadingScreen'
import SnackBar from '../screens/viewScreens/SnackBar'
import { scaleWidth } from '../Scaling';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../style/style';
import Button from '../components/auth/Button';
import { post_data, post_data_with_img, signup } from '../service';

const initialState = {
  // Basic Information
  restaurant_name: '',
  name: '',
  phone: '',


  // Address & Location
  street_address: '',
  city: '',


  // Business Details
  business_type: '',
  opening_hours: '',

  is_seller: true,

};

const reducer = (state, action) => {
  return {
    ...state,
    [action.type]: action.payload
  };
};

const RestaurantRegistration = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [message, setMessage] = useState('');
  const [imageURI, setImageURI] = useState(null);

  const pickImage = async () => {
    // Image picking logic here
  };

  const handleDeletePicture = () => {
    setImageURI(null);
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Save logic here
    setIsLoading(false);
    setMessage('Restaurant registered successfully!');
    setSnackBar(true);
  };

  const handleRegister = async () => {
  
    console.log(state);
    const response = await post_data('user_details', { name: state.name, phone: state.phone, is_seller: true });
    if (response.success) {
      console.log(response.returnData);
    } else {
      console.log(response.returnData);
    }


  }

  return (
    <>
      {isLoading && <LoadingScreen />}

      <SafeAreaView>
        <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
        <TopBar navigation={navigation} top_title='Restaurant Registration' withSettingIcons={false} handleSetting={undefined}/>
        <ScrollView >
          <View style={[ownstyles.container, { alignItems: 'flex-start', paddingLeft: scaleWidth(40), marginBottom: 40 }]}>
            <SectionTitle title="Basic Information" />
            <TextEditFields
              label_name={'Restaurant Name'}
              inputmode={'text'}
              key_type={'default'}
              given_value={state.restaurant_name}
              handleInputChange={(text) => dispatch({ type: 'restaurant_name', payload: text })}
            />
            <TextEditFields
              label_name={'Owner\'s Name'}
              inputmode={'text'}
              key_type={'default'}
              given_value={state.name}
              handleInputChange={(text) => dispatch({ type: 'name', payload: text })}
            />

            <TextEditFields
              label_name={'Phone'}
              inputmode={null}
              key_type={'phone-pad'}
              given_value={state.phone}
              handleInputChange={(text) => dispatch({ type: 'phone', payload: text })}
            />

            {/* Address & Location */}
            <SectionTitle title="Address & Location" />
            <TextEditFields
              label_name={'Street Address'}
              inputmode={'text'}
              key_type={'default'}
              given_value={state.street_address}
              handleInputChange={(text) => dispatch({ type: 'street_address', payload: text })}
            />
            <TextEditFields
              label_name={'City'}
              inputmode={'text'}
              key_type={'default'}
              given_value={state.city}
              handleInputChange={(text) => dispatch({ type: 'city', payload: text })}
            />

            {/* Business Details */}
            <SectionTitle title="Business Details" />

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
              <Text style={{ fontFamily: 'poppins_regular', fontSize: scaleWidth(15), }}>Business Type : </Text>

              <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }}>
                <Picker
                  style={{ width: scaleWidth(150) }}
                  selectedValue={state.business_type}
                  onValueChange={(itemValue) => dispatch({ type: 'business_type', payload: itemValue })}
                >
                  <Picker.Item label="Cafe" value="cafe" />
                  <Picker.Item label="Restaurant" value="restaurant" />
                  <Picker.Item label="Bakery" value="bakery" />
                </Picker>
              </View>
            </View>



            <TextEditFields
              label_name={'Opening Hours'}
              inputmode={'text'}
              key_type={'default'}
              given_value={state.opening_hours}
              handleInputChange={(text) => dispatch({ type: 'opening_hours', payload: text })}
            />




            <Button
              style={styles.loginButton}
              btnText='Register'
              handleAuthBtn={handleRegister}
            />

          </View>
        </ScrollView>

      </SafeAreaView>
    </>
  );
};

const SectionTitle = ({ title }) => (
  <View style={ownstyles.sectionTitleContainer}>
    <Text style={ownstyles.sectionTitle}>{title}</Text>
  </View>
);

const ownstyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: scaleWidth(20),
    backgroundColor: '#F0F4F8',
  },
  image_container: {
    flexDirection: 'row',
    gap: scaleWidth(10),
    alignItems: 'center',
    marginTop: scaleWidth(10),
    // backgroundColor:'black'
    // backgroundColor:'#F0F4F8'
  },
  button_container: {
    flexDirection: 'column',
    gap: scaleWidth(5),
  },
  sectionTitleContainer: {
    marginTop: scaleWidth(20),
    marginBottom: scaleWidth(10),
    width: '100%',
  },
  sectionTitle: {
    fontSize: scaleWidth(18),
    fontWeight: 'bold',
    color: '#333',
  }
});

export default RestaurantRegistration;