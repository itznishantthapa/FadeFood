import React, { useContext, useReducer } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Text, 
  Keyboard, 
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  Platform 
} from 'react-native';
import TextEditFields from '../components/profile/TextEditFields';
import TopBar from '../components/viewScreens/TopBar';
import LoadingScreen from '../components/viewScreens/LoadingScreen';
import { scaleHeight, scaleWidth } from '../Scaling';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../style/style';
import Button from '../components/auth/Button';
import { get_data, post_data, update_data } from '../service';
import { myContext } from '../context/AppProvider';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');


const RestaurantRegistration = ({ navigation }) => {
  const { isLoading, setisLoading, snackBar, setsnackBar, dispatch,state,seller_state,seller_dispatch } = useContext(myContext);

  const handleRegister = async () => {
    Keyboard.dismiss();
    setisLoading(true);
    console.log(seller_state)
    
    const response = await post_data('register_restaurant', seller_state);
    
    if (response.success) {
      setisLoading(false);
      setsnackBar(true);
      dispatch({ type: 'snackmessage', payload: response.data });
      setTimeout(() => setsnackBar(false), 3000);
    } else {
      setisLoading(false);
      Alert.alert('Error', response.data);
    }
  };

  return (
    <SafeAreaView style={ownstyles.safeArea}>
      {isLoading && <LoadingScreen />}
      <TopBar navigation={navigation} top_title='Restaurant Registration' withSettingIcons={undefined} handleSettingIcon={undefined} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={ownstyles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={ownstyles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={ownstyles.formContainer}>
            <SectionTitle title="Basic Information" />
            <TextEditFields
              label_name={'Restaurant Name'}
              inputmode={'text'}
              key_type={'default'}
              given_value={seller_state.name}
              handleInputChange={(text) => seller_dispatch({ type: 'name', payload: text })}
            />

            <SectionTitle title="Address & Location" />
            <TextEditFields
              label_name={'Street Address'}
              inputmode={'text'}
              key_type={'default'}
              given_value={seller_state.street_address}
              handleInputChange={(text) => seller_dispatch({ type: 'street_address', payload: text })}
            />
            <TextEditFields
              label_name={'City'}
              inputmode={'text'}
              key_type={'default'}
              given_value={seller_state.city}
              handleInputChange={(text) => seller_dispatch({ type: 'city', payload: text })}
            />

            <SectionTitle title="Business Details" />
            <View style={ownstyles.pickerContainer}>
              <Text style={ownstyles.pickerLabel}>Business Type : </Text>
              <View style={ownstyles.picker}>
                <Picker
                  style={{ width: scaleWidth(150) }}
                  selectedValue={seller_state.business_type}
                  onValueChange={(itemValue) => seller_dispatch({ type: 'business_type', payload: itemValue })}
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
              given_value={seller_state.opening_hour}
              handleInputChange={(text) => seller_dispatch({ type: 'opening_hour', payload: text })}
            />

            <SectionTitle title="KYC" />
            <TextEditFields
              label_name={'Citizenship Number'}
              inputmode={'text'}
              key_type={'default'}
              given_value={seller_state.citizenship_number}
              handleInputChange={(text) => seller_dispatch({ type: 'citizenship_number', payload: text })}
            />
            <TextEditFields
              label_name={'PAN Number'}
              inputmode={'text'}
              key_type={'default'}
              given_value={seller_state.pan_number}
              handleInputChange={(text) => seller_dispatch({ type: 'pan_number', payload: text })}
            />

            <View style={ownstyles.buttonContainer}>
              <Button
                style={styles.loginButton}
                btnText={state.role==='customer'?'Register':'Update'}
                handleAuthBtn={handleRegister}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const SectionTitle = ({ title }) => (
  <View style={ownstyles.sectionTitleContainer}>
    <Text style={ownstyles.sectionTitle}>{title}</Text>
  </View>
);

const ownstyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  formContainer: {
    paddingHorizontal: scaleWidth(40),
    paddingBottom: scaleWidth(20),
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  pickerLabel: {
    fontFamily: 'poppins_regular',
    fontSize: scaleWidth(15),
  },
  picker: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
  },
  buttonContainer: {
    width:'100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: Platform.OS === 'ios' ? 40 : 20,
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