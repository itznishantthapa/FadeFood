import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { scaleHeight, scaleWidth } from '../../Scaling';

const { width, height } = Dimensions.get('window');
// withSettingIcons={false} handleSetting={undefined}
const TopBar = ({ top_title, navigation, handleSettingIcon, withSettingIcons }) => {
  return (
    <View style={styles.topBarContainer} >

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={scaleWidth(25)} color="#333333" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.topBarTitle}>{top_title}</Text>
        <View style={styles.underline} />
      </View>
      {
        withSettingIcons?
        (<TouchableOpacity style={styles.menuButton} onPress={handleSettingIcon}>
          <Ionicons name="settings" size={scaleWidth(25)} color="#333333" />
        </TouchableOpacity>):(
          <View style={{padding:scaleWidth(25)}}></View>
        )
      }

    </View>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: width * 0.04,
    paddingBottom: scaleHeight(6),
    backgroundColor: '#F0F4F8',
    zIndex: 999
  },
  backButton: {
    padding: scaleWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  topBarTitle: {
    fontFamily: 'jakarta_bold',
    fontSize: scaleWidth(18),
    color: '#333333',
    textAlign: 'center',
  },
  underline: {
    width: '80%',
    height: scaleHeight(2),
    backgroundColor: '#333333',
    marginTop: scaleHeight(4),
    borderRadius: 1,
  },
  menuButton: {
    padding: scaleWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopBar;