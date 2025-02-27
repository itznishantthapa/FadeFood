import React, { useContext, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Switch, 
  Alert, 
  ScrollView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TopBar from '../components/viewScreens/TopBar';
import UserInfo from '../components/profile/UserInfo';
import Name_Phone from '../components/profile/Name_Phone';
import SettingMenu from '../components/profile/SettingMenu';
import TextEditFields from '../components/profile/TextEditFields';
import { styles } from '../style/style';
import { scaleHeight, scaleWidth } from '../Scaling';
import { myContext } from '../context/AppProvider';
import * as ImagePicker from 'expo-image-picker';
import { post_data_with_img, update_data } from '../service';
import LoadingScreen from '../components/viewScreens/LoadingScreen';
import SnackBar from '../screens/viewScreens/SnackBar';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native'

const SellerProfile = ({ navigation }) => {
  //  const {  state, dispatch,  clearAllData,isLoading,setisLoading , isLogged} = useContext(myContext);
  const { state, seller_state, seller_dispatch, dispatch, isLoading, setisLoading, snackBar, setsnackBar,clearAllData } = useContext(myContext);
  const [isActive, setIsActive] = useState(seller_state.is_active || false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleToggleActive = async () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    
    try {
      setisLoading(true);
      const response = await update_data('update_restaurant_status', { is_active: newActiveState });
      if (response.success) {
        seller_dispatch({ type: 'SET_DATA', key: 'is_active', payload: newActiveState });
        dispatch({ type: 'snackmessage', payload: newActiveState ? 'Restaurant is now open' : 'Restaurant is now closed' });
        setsnackBar(true);
        setTimeout(() => setsnackBar(false), 3000);
      } else {
        Alert.alert('Error', response.data || 'Failed to update status');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setisLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      try {
        setisLoading(true);
        const response = await post_data_with_img('update_restaurant_logo', {}, { image: selectedImage }, 'PUT');
        if (response.success) {
          seller_dispatch({ type: 'SET_DATA', key: 'logo', payload: response.data.logo });
          dispatch({ type: 'snackmessage', payload: 'Logo updated successfully' });
          setsnackBar(true);
          setTimeout(() => setsnackBar(false), 3000);
        } else {
          Alert.alert('Error', response.data || 'Failed to update logo');
        }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred');
      } finally {
        setisLoading(false);
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      setisLoading(true);
      const restaurantData = {
        name: seller_state.name,
        street_address: seller_state.street_address,
        city: seller_state.city,
        business_type: seller_state.business_type,
        opening_hour: seller_state.opening_hour
      };
      
      const response = await update_data('update_restaurant', restaurantData);
      if (response.success) {
        setIsEditMode(false);
        dispatch({ type: 'snackmessage', payload: 'Profile updated successfully' });
        setsnackBar(true);
        setTimeout(() => setsnackBar(false), 3000);
      } else {
        Alert.alert('Error', response.data || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setisLoading(false);
    }
  };

  const handleEditProfileAccount = (screen_name) => {
    navigation.navigate(screen_name);
  };

      const handleLogout = async() => {
          Alert.alert("", "Are you want to logout?",
              [
                  {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                  },
                  {
                      text: "Logout",
                      onPress: async() => {
                          setisLoading(true)
                          await clearAllData()
                          setisLoading(false)
                          navigation.dispatch(
                              CommonActions.reset({
                                  index: 0,
                                  routes: [{ name: 'LoginScreens' }],
                              })
                          );
                      },
                  },
              ],
              { cancelable: false }
          );
      }

  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F4F8' }}>
        <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
        <TopBar 
          navigation={navigation} 
          top_title='Restaurant Profile' 
          withSettingIcons={false} 
          handleSettingIcon={undefined}
        />
        
        <ScrollView 
          style={localStyles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={localStyles.profileHeader}>
            <View style={localStyles.logoContainer}>
              <  UserInfo photo={seller_state.logo} />
          
              <TouchableOpacity 
                style={localStyles.editLogoButton}
                onPress={pickImage}
              >
                <FontAwesome name="camera" size={scaleWidth(16)} color="#FFF" />
              </TouchableOpacity>
            </View>
            
            <View style={localStyles.nameContainer}>
              <Text style={localStyles.restaurantName}>{seller_state.name}</Text>
              <Text style={localStyles.businessType}>{seller_state.business_type}</Text>
            </View>
            
            <View style={localStyles.statusContainer}>
              <Text style={localStyles.statusLabel}>Restaurant Status</Text>
              <View style={localStyles.statusToggle}>
                <Text style={[
                  localStyles.statusText, 
                  { color: isActive ? '#4CAF50' : '#757575' }
                ]}>
                  {isActive ? 'Open' : 'Closed'}
                </Text>
                <Switch
                  trackColor={{ false: '#E0E0E0', true: '#A5D6A7' }}
                  thumbColor={isActive ? '#4CAF50' : '#BDBDBD'}
                  onValueChange={handleToggleActive}
                  value={isActive}
                />
              </View>
            </View>
          </View>

          {isEditMode ? (
            <View style={localStyles.editContainer}>
              <TextEditFields
                label_name={'Restaurant Name'}
                inputmode={'text'}
                key_type={'default'}
                given_value={seller_state.name}
                handleInputChange={(text) => seller_dispatch({ type: 'SET_DATA', key: 'name', payload: text })}
              />
              <TextEditFields
                label_name={'Street Address'}
                inputmode={'text'}
                key_type={'default'}
                given_value={seller_state.street_address}
                handleInputChange={(text) => seller_dispatch({ type: 'SET_DATA', key: 'street_address', payload: text })}
              />
              <TextEditFields
                label_name={'City'}
                inputmode={'text'}
                key_type={'default'}
                given_value={seller_state.city}
                handleInputChange={(text) => seller_dispatch({ type: 'SET_DATA', key: 'city', payload: text })}
              />
              <TextEditFields
                label_name={'Opening Hours'}
                inputmode={'text'}
                key_type={'default'}
                given_value={seller_state.opening_hour}
                handleInputChange={(text) => seller_dispatch({ type: 'SET_DATA', key: 'opening_hour', payload: text })}
              />
              
              <View style={localStyles.buttonRow}>
                <TouchableOpacity 
                  style={[localStyles.button, localStyles.cancelButton]}
                  onPress={() => setIsEditMode(false)}
                >
                  <Text style={[localStyles.buttonText,{color:'black'}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[localStyles.button, localStyles.saveButton]}
                  onPress={handleSaveChanges}
                >
                  <Text style={localStyles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <View style={localStyles.infoSection}>
                <Text style={localStyles.sectionTitle}>Restaurant Information</Text>
                
                <View style={localStyles.infoRow}>
                  <Ionicons name="location" size={scaleWidth(20)} color="#333333" />
                  <View style={localStyles.infoTextContainer}>
                    <Text style={localStyles.infoLabel}>Address</Text>
                    <Text style={localStyles.infoValue}>
                      {seller_state.street_address}, {seller_state.city}
                    </Text>
                  </View>
                </View>
                
                <View style={localStyles.infoRow}>
                  <Ionicons name="time" size={scaleWidth(20)} color="#333333" />
                  <View style={localStyles.infoTextContainer}>
                    <Text style={localStyles.infoLabel}>Opening Hours</Text>
                    <Text style={localStyles.infoValue}>{seller_state.opening_hour}</Text>
                  </View>
                </View>
                
                <View style={localStyles.infoRow}>
                  <Ionicons name="star" size={scaleWidth(20)} color="#333333" />
                  <View style={localStyles.infoTextContainer}>
                    <Text style={localStyles.infoLabel}>Rating</Text>
                    <Text style={localStyles.infoValue}>{seller_state.rating} / 5</Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={localStyles.editProfileButton}
                  onPress={() => setIsEditMode(true)}
                >
                  <Text style={localStyles.editProfileButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
              
              <View style={localStyles.menuSection}>
                <Text style={localStyles.sectionTitle}>Account Settings</Text>
                
                <SettingMenu
                  menuName={'Menu Management'}
                  iconName={'restaurant-outline'}
                  handleSettingPage={() => navigation.navigate('Menu')}
                />
                
                <SettingMenu
                  menuName={'Business Information'}
                  iconName={'business-outline'}
                  handleSettingPage={() => handleEditProfileAccount('RegistrationScreen')}
                />
                
                <SettingMenu
                  menuName={'Payment Settings'}
                  iconName={'card-outline'}
                  handleSettingPage={() => handleEditProfileAccount('MethodSelection')}
                />
                
                <SettingMenu
                  menuName={'Notifications'}
                  iconName={'notifications-outline'}
                  handleSettingPage={() => navigation.navigate('Notifications')}
                />
                
                <SettingMenu
                  menuName={'Privacy and Security'}
                  iconName={'shield-outline'}
                  handleSettingPage={() => handleEditProfileAccount('PrivacyAndSecurity')}
                />
          
                <SettingMenu
                    menuName={'Logout'}
                    iconName={'log-out-outline'}
                    handleSettingPage={handleLogout}
                />
              </View>
            </>
          )}
        </ScrollView>
        <SnackBar message={state.snackmessage} visible={snackBar} />
      </SafeAreaView>
    </>
  );
};

const localStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    padding: scaleWidth(16),
    borderRadius: scaleWidth(10),
    margin: scaleWidth(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  editLogoButton: {
    position: 'absolute',
    bottom: scaleHeight(10),
    right: scaleWidth(130),
    backgroundColor: '#333333',
    width: scaleWidth(30),
    height: scaleWidth(30),
    borderRadius: scaleWidth(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    alignItems: 'center',
    marginTop: scaleHeight(5),
  },
  restaurantName: {
    fontFamily: 'poppins_semibold',
    fontSize: scaleWidth(22),
    color: '#333333',
  },
  businessType: {
    fontFamily: 'poppins_regular',
    fontSize: scaleWidth(14),
    color: '#757575',
    marginTop: scaleHeight(2),
  },
  statusContainer: {
    marginTop: scaleHeight(15),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: scaleHeight(15),
  },
  statusLabel: {
    fontFamily: 'poppins_semibold',
    fontSize: scaleWidth(16),
    color: '#333333',
    marginBottom: scaleHeight(8),
  },
  statusToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusText: {
    fontFamily: 'poppins_semibold',
    fontSize: scaleWidth(16),
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    padding: scaleWidth(16),
    borderRadius: scaleWidth(10),
    margin: scaleWidth(10),
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontFamily: 'poppins_semibold',
    fontSize: scaleWidth(18),
    color: '#333333',
    marginBottom: scaleHeight(15),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scaleHeight(15),
  },
  infoTextContainer: {
    marginLeft: scaleWidth(10),
    flex: 1,
  },
  infoLabel: {
    fontFamily: 'poppins_regular',
    fontSize: scaleWidth(14),
    color: '#757575',
  },
  infoValue: {
    fontFamily: 'poppins_semibold',
    fontSize: scaleWidth(16),
    color: '#333333',
    marginTop: scaleHeight(2),
  },
  editProfileButton: {
    backgroundColor: '#333333',
    padding: scaleWidth(12),
    borderRadius: scaleWidth(8),
    alignItems: 'center',
    marginTop: scaleHeight(10),
  },
  editProfileButtonText: {
    fontFamily: 'poppins_semibold',
    fontSize: scaleWidth(16),
    color: '#FFFFFF',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    padding: scaleWidth(16),
    borderRadius: scaleWidth(10),
    margin: scaleWidth(10),
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: scaleHeight(20),
  },
  editContainer: {
    backgroundColor: '#FFFFFF',
    padding: scaleWidth(16),
    borderRadius: scaleWidth(10),
    margin: scaleWidth(10),
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: scaleHeight(20),
  },
  button: {
    padding: scaleWidth(12),
    borderRadius: scaleWidth(8),
    alignItems: 'center',
    width: '48%',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontFamily: 'poppins_semibold',
    fontSize: scaleWidth(16),
    color: '#FFFFFF',
  },
});

export default SellerProfile;
