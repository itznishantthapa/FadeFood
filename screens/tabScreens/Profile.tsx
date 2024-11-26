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
import { CommonActions } from '@react-navigation/native';


const ProfileScreen = ({ navigation }) => {
    const {  state, dispatch,  clearAllData,isLoading,setisLoading , isLogged} = useContext(myContext);

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
                    onPress: async() => {
                        setisLoading(true)
                        await clearAllData()
                        setisLoading(false)
                        // navigation.navigate('TabBars')
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'TabBars' }],
                            })
                        );
                    },
                },
            ],
            { cancelable: false }
        );
    }

    const handleSignIn = () => {
        navigation.navigate('LoginScreens')
    }

    const handleSettingIcon = () => {
    navigation.navigate('SellerSetting')
    }

    return (
    <>
        {
                isLoading && (
                    <LoadingScreen />
                )
            }
   
        <SafeAreaView >
            <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
            <TopBar navigation={navigation} top_title='Profile' withSettingIcons={true} handleSettingIcon={handleSettingIcon}/>
            <View style={styles.home_screen}>
                <UserInfo photo={state.profile_picture} />
                {
                    state.name && (
                        <Name_Phone name={state.name} phone_number={state.phone} />
                    )
                }

                {
                    true && (
                        <>
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
                        </>
                    )
                }

                <SettingMenu
                    menuName={'About'}
                    iconName={'information-circle-outline'}
                    handleSettingPage={() => handleEditProfileAccount('AboutScreen')}
                />
                {
                    isLogged ? (
                        <SettingMenu
                            menuName={'Logout'}
                            iconName={'log-out-outline'}
                            handleSettingPage={handleLogout}
                        />
                    ) : (
                        <SettingMenu
                            menuName={'Sign In'}
                            iconName={'log-in-outline'}
                            handleSettingPage={handleSignIn}
                        />
                    )
                }

            </View>
        </SafeAreaView>
        </>
    );
};

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },


});

export default ProfileScreen;