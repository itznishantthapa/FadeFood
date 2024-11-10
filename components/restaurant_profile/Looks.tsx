import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import {StyleSheet} from 'react-native';

// Restaurant Looks Tab Component
export const LooksScreen = () => {
    const restaurantViews = [
      { 
        id: 1, 
        image: require('../../assets/images/wallpaper.jpeg'),
        description: 'Elegant dining area with modern aesthetics'
      },
      { 
        id: 2, 
        image: require('../../assets/images/wallpaper.jpeg'),
        description: 'Peaceful outdoor seating with garden view'
      },
      { 
        id: 3, 
        image: require('../../assets/images/wallpaper.jpeg'),
        description: 'Premium bar with extensive collection'
      },
      // Add more views as needed
    ];
  
    return (
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {restaurantViews.map((view) => (
          <View key={view.id} style={styles.lookCard}>
            <Image source={view.image} style={styles.lookImage} resizeMode="cover" />
            <Text style={styles.lookDescription}>{view.description}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    lookCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        overflow: 'hidden',
        elevation: 2,
      },
      lookImage: {
        width: '100%',
        height: 250,
      },
      lookDescription: {
        padding: 16,
        fontSize: 16,
        fontFamily: 'poppins_semibold',
        color: '#333',
      },
      tabContent: {
        flex: 1,
        backgroundColor: '#F0F4F8',
      },
  })