import React, { useReducer, useState } from 'react';
import {  StyleSheet, View, ScrollView, Text } from 'react-native';
import TextEditFields from '../components/profile/TextEditFields'
import TopBar from '../components/viewScreens/TopBar';
import LoadingScreen from '../components/viewScreens/LoadingScreen'
import SnackBar from '../screens/viewScreens/SnackBar'
import { scaleWidth } from '../Scaling';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../style/style';

const initialState = {
  // Basic Information
  name: '',
  ownerName: '',
  email: '',
  phone: '',

  // Address & Location
  streetAddress: '',
  city: '',


  // Business Details
  businessType: '',
  openingHours: '',

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

  return (
    <>
      {isLoading && <LoadingScreen />}

      <SafeAreaView>
        <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
        <TopBar navigation={navigation} top_title='Restaurant Registration' />
        <ScrollView >
          <View style={[ownstyles.container, { alignItems: 'flex-start', paddingLeft: scaleWidth(40) }]}>
            <SectionTitle title="Basic Information" />
            <TextEditFields
              label_name={'Restaurant Name'}
              inputmode={'text'}
              key_type={'default'}
              given_value={state.restaurantName}
              handleInputChange={(text) => dispatch({ type: 'restaurantName', payload: text })}
            />
            <TextEditFields
              label_name={'Owner\'s Name'}
              inputmode={'text'}
              key_type={'default'}
              given_value={state.ownerName}
              handleInputChange={(text) => dispatch({ type: 'ownerName', payload: text })}
            />
            <TextEditFields
              label_name={'Email'}
              inputmode={null}
              key_type={'email-address'}
              given_value={state.email}
              handleInputChange={(text) => dispatch({ type: 'email', payload: text })}
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
              given_value={state.streetAddress}
              handleInputChange={(text) => dispatch({ type: 'streetAddress', payload: text })}
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
                  selectedValue={state.businessType}
                  onValueChange={(itemValue) => dispatch({ type: 'businessType', payload: itemValue })}
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
              given_value={state.openingHours}
              handleInputChange={(text) => dispatch({ type: 'openingHours', payload: text })}
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
  },
  image_container: {
    flexDirection: 'row',
    gap: scaleWidth(10),
    alignItems: 'center',
    marginTop: scaleWidth(10)
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