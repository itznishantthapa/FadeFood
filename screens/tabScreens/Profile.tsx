import React from 'react';
import { View, Image, StyleSheet} from 'react-native';
import TopBar from '../../components/viewScreens/TopBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../../style/style';
import SettingMenu from '../../components/profile/SettingMenu';
import UserInfo from '../../components/profile/UserInfo';

const ProfileScreen = ({ navigation }) => {

    return (
        <SafeAreaView >
            <StatusBar hidden={false} backgroundColor='#dc2f02' style='light' />
            <View style={styles.home_screen}>
                <TopBar navigation={navigation} top_title='Profile' />
                <UserInfo />
                <SettingMenu menuName={'Account'} iconName={'person-outline'} />
                <SettingMenu menuName={'Privacy and Security'} iconName={'shield-outline'} />
                <SettingMenu menuName={'Help and Support'} iconName={'help-circle-outline'} />
                <SettingMenu menuName={'About'} iconName={'information-circle-outline'} />
                <SettingMenu menuName={'Logout'} iconName={'log-out-outline'} />
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