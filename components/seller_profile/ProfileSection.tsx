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
import TopBar from '../viewScreens/TopBar';

import SettingMenu from '../profile/SettingMenu';
import TextEditFields from '../profile/TextEditFields';

import { scaleHeight, scaleWidth } from '../../Scaling';
import { myContext } from '../../context/AppProvider';
import * as ImagePicker from 'expo-image-picker';
import { post_data_with_img, update_data } from '../../service';
import LoadingScreen from '../viewScreens/LoadingScreen';
import SnackBar from '../../screens/viewScreens/SnackBar';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native'
import UserInfo from '../profile/UserInfo';

const ProfileSection = () => {
      const { state, seller_state, seller_dispatch, dispatch, isLoading, setisLoading, snackBar, setsnackBar,clearAllData } = useContext(myContext);
    
      const [isActive, setIsActive] = useState(seller_state.is_active || false);

        const handleToggleActive = async () => {
          const newActiveState = !isActive;
          setIsActive(newActiveState);
          
          try {
            setisLoading(true);
            const response = await update_data('edit_restaurant', { is_active: newActiveState });
            if (response.success) {
              seller_dispatch({ type: 'SET_DATA', key: 'is_active', payload: newActiveState });
              dispatch({ type: 'snackmessage', payload: newActiveState ? 'Restaurant is now open' : 'Restaurant is now closed' });
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
  return (
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
  )
}

export default ProfileSection

const localStyles = StyleSheet.create({
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
})