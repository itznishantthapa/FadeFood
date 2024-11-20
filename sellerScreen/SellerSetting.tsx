import { StyleSheet, Text, View,Alert } from 'react-native'
import React, { useContext } from 'react'
import SettingMenu from '../components/profile/SettingMenu'
import UserInfo from '../components/profile/UserInfo'
import Name_Phone from '../components/profile/Name_Phone'
import TopBar from '../components/viewScreens/TopBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { styles } from '../style/style'
import { myContext } from '../context/AppProvider'

const SellerSetting = ({ navigation }) => {

    const handleEditProfileAccount = (screen_name) => {
        navigation.navigate(screen_name)
    }
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
                        console.log("Logout Pressed")
                    },
                },
            ],
            { cancelable: false }
        );
    }
    return (
        <SafeAreaView >
            <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
            <TopBar navigation={navigation} top_title='Settings' withSettingIcons={false} handleSetting={undefined} />
            <View style={styles.home_screen}>




                <SettingMenu
                    menuName={'Account'}
                    iconName={'person-outline'}
                    handleSettingPage={() => handleEditProfileAccount('AccountSwitch')}
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
    )
}

export default SellerSetting

// const styles = StyleSheet.create({})