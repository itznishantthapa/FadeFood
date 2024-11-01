import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import TopBar from '../../components/viewScreens/TopBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../../style/style';
import SettingMenu from '../../components/profile/SettingMenu';
import UserInfo from '../../components/profile/UserInfo';
import Name_Phone from '../../components/profile/Name_Phone';

const ProfileScreen = ({ navigation }) => {

    const handleEditProfileAccount = (screen_name) => {
        navigation.navigate(screen_name)
    }

    const handleLogout = () => {
        Alert.alert("", "Are you want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Logout",
                    onPress: () => {
                        navigation.navigate('LoginScreens')
                    },
                },
            ],
            { cancelable: false } 
        );

    }

    return (
        <SafeAreaView >
            <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
            <TopBar navigation={navigation} top_title='Profile' />
            <View style={styles.home_screen}>
                <UserInfo />
                <Name_Phone />
                <SettingMenu
                    menuName={'Account'}
                    iconName={'person-outline'}
                    handleSettingPage={() => handleEditProfileAccount('ProfileUpdation')}
                />
                <SettingMenu
                    menuName={'Privacy and Security'}
                    iconName={'shield-outline'}
                    handleSettingPage={() => handleEditProfileAccount('PrivacyAndSecurity')}

                />
                <SettingMenu
                    menuName={'Help and Support'}
                    iconName={'help-circle-outline'}
                    handleSettingPage={() => handleEditProfileAccount('ProfileUpdation')}
                />
                <SettingMenu
                    menuName={'About'}
                    iconName={'information-circle-outline'}
                    handleSettingPage={() => handleEditProfileAccount('AboutScreen')}
                />
                <SettingMenu
                    menuName={'Logout'}
                    iconName={'log-out-outline'}
                    handleSettingPage={handleLogout}
                />
            </View>
        </SafeAreaView>
    );
};

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },


});

export default ProfileScreen;