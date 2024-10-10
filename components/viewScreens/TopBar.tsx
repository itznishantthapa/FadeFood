import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const TopBar = ({ top_title, navigation }) => {
  return (
<LinearGradient
  colors={['#dc2f02', '#e85d04', '#f48c06']}
  start={{ x: 0, y: 0 }}
  end={{ x: 0, y: 1 }}
  style={styles.topBarContainer}
>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="white" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.topBarTitle}>{top_title}</Text>
        <View style={styles.underline} />
      </View>

      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>
    </LinearGradient>
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
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
    color: 'white',
    textAlign: 'center',
  },
  underline: {
    width: '80%',
    height: 2,
    backgroundColor: 'white',
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