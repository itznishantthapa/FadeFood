import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import  SimpleLineIcon  from 'react-native-vector-icons/SimpleLineIcons'
import TopBar from '../../components/viewScreens/TopBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../../style/style';
import SettingMenu from '../../components/profile/SettingMenu';

const ProfileScreen = ({ navigation }) => {

    return (
        <SafeAreaView >
            <StatusBar hidden={false} backgroundColor='#dc2f02' style='light' />
            <View style={styles.home_screen}>
                <TopBar navigation={navigation} top_title='Profile' />
                <View style={styles1.profileImageContainer}>
                    <Image
                        source={require('../../assets/chatapate.jpeg')}
                        style={styles1.profileImage}
                    />
                    <View style={{alignItems:'center',gap:4}}>
                        <Text>Nishant Thapa</Text>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:5}}>
                            <SimpleLineIcon name='phone' size={20}/>
                            <Text>+977 9826327088</Text>
                        </View>
                    </View>
                </View>
                <SettingMenu menuName={'Account'} iconName={'person-outline'}/>
                <SettingMenu menuName={'Privacy and Security'} iconName={'shield-outline'}/>
                <SettingMenu menuName={'Help and Support'} iconName={'help-circle-outline'}/>
                <SettingMenu menuName={'About'} iconName={'information-circle-outline'}/>
                <SettingMenu menuName={'Logout'} iconName={'log-out-outline'}/>
            </View>
        </SafeAreaView>
    );
};

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileImageContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
        gap: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 75,
    },

});

export default ProfileScreen;