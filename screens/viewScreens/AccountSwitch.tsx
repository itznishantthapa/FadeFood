import React, { useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import TopBar from '../../components/viewScreens/TopBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../../style/style';
import SettingMenu from '../../components/profile/SettingMenu';
import UserInfo from '../../components/profile/UserInfo';
import Name_Phone from '../../components/profile/Name_Phone';
import { myContext } from '../../context/AppProvider';
import LoadingScreen from '../../components/viewScreens/LoadingScreen';


const AccountSwitch = ({ navigation }) => {

    const handleEditProfileAccount = (screen_name) => {
        navigation.navigate(screen_name)
    }

    return (


        <SafeAreaView >
            <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
            <TopBar navigation={navigation} top_title='Manage Account' withSettingIcons={false} handleSetting={undefined} />
            <View style={styles.home_screen}>

                <SettingMenu
                    menuName={'Edit Info'}
                    iconName={'pencil'}
                    handleSettingPage={() => handleEditProfileAccount(true?'ProfileUpdation':'RegistrationScreen')}
                />
                {
                    true && (
                        <SettingMenu
                            menuName={'Switch To Bussiness Account'}
                            iconName={'business'}
                            handleSettingPage={() => handleEditProfileAccount('RegistrationScreen')}

                        />)
                }


            </View>
        </SafeAreaView>

    );
};

export default AccountSwitch;