import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../../components/viewScreens/TopBar';
import { StatusBar } from 'expo-status-bar';

const AboutScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
          <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
          <TopBar navigation={navigation} top_title='About Us' withSettingIcons={false} handleSetting={undefined}/>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:-12}} >
        <View style={styles.headerSection}>
          <Text style={styles.appName}>FadeFood</Text>
          <Text style={styles.tagline}>Your Smart Dining Companion</Text>
        </View>

        {/* Main Content */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.description}>
            Welcome to FadeFood, your ultimate restaurant discovery and dining experience app. 
            We're revolutionizing the way you dine out by making every step of your restaurant 
            visit smooth, efficient, and enjoyable.
          </Text>

          {/* Key Features Section */}
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featureContainer}>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>🍽️ Restaurant Discovery</Text>
              <Text style={styles.featureText}>
                Explore nearby restaurants and browse their current menu offerings in real-time.
              </Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>⏰ Smart Pre-ordering</Text>
              <Text style={styles.featureText}>
                Pre-order your meals and have them ready at your preferred time - no waiting required!
              </Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>💳 Contactless Experience</Text>
              <Text style={styles.featureText}>
                Complete your entire dining journey from ordering to payment without any physical contact.
              </Text>
            </View>
          </View>

          {/* How It Works Section */}
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepContainer}>
            <Text style={styles.step}>1. Browse restaurants and menus</Text>
            <Text style={styles.step}>2. Select your dishes and preferred dining time</Text>
            <Text style={styles.step}>3. Complete secure payment</Text>
            <Text style={styles.step}>4. Receive table assignment and timing</Text>
            <Text style={styles.step}>5. Arrive and enjoy your meal!</Text>
          </View>

          {/* Developer Info */}
          <View style={styles.developerSection}>
            <Text style={styles.sectionTitle}>Developer</Text>
            <Text style={styles.developerText}>
              Created as a Second Year BIT Project
            </Text>
            <Text style={styles.contactText}>
              For feedback and suggestions, contact us at: support@dineease.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerSection: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F0F4F8',

  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  contentSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginBottom: 20,
  },
  featureContainer: {
    marginBottom: 20,
  },
  featureItem: {
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 22,
  },
  stepContainer: {
    marginBottom: 20,
  },
  step: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 10,
    paddingLeft: 15,
  },
  developerSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  developerText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});

export default AboutScreen;