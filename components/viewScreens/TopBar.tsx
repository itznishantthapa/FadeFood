import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const TopBar = ({ top_title, navigation }) => {
  return (
    <View style={styles.topBarContainer} >

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.topBarTitle}>{top_title}</Text>
        <View style={styles.underline} />
      </View>

      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor:'#F0F4F8'
  },
  backButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  topBarTitle: {
    fontFamily: 'jakarta_bold',
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
  underline: {
    width: '80%',
    height: 2,
    backgroundColor: 'black',
    marginTop: 5,
    borderRadius: 1,
  },
  menuButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopBar;