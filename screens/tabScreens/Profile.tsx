import React from 'react';
import { View, Image, StyleSheet} from 'react-native';
import TopBar from '../../components/viewScreens/TopBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../../style/style';
import SettingMenu from '../../components/profile/SettingMenu';
import UserInfo from '../../components/profile/UserInfo';
import CardsCarousel from '../../components/home/Carousel';

const ProfileScreen = ({ navigation }) => {

    return (
        <SafeAreaView >
            <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
            <TopBar navigation={navigation} top_title='Profile' />
            <View style={styles.home_screen}>
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