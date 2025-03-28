import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import React, { useState, useRef } from 'react'
import { Image } from 'react-native'
import PagerView from 'react-native-pager-view'
import { scaleHeight, scaleWidth } from '../../Scaling';
import { AntDesign, Ionicons } from '@expo/vector-icons'; // Added Ionicons
import { scanFromURLAsync } from 'expo-camera';
import { baseURL } from '../../service';

const BigImage = ({scaleAnim, toggleFavorite, isFavorite, images, onShare}) => {
  // console.log('images -------------by big data',images)
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={{ height: scaleHeight(500), width: '100%' }}>
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
      >
        {images.map((img, index) => (
          <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image resizeMode='cover' style={{ height: '100%', width: '100%' }}  source={{ uri: `${baseURL}${img.image}` }} />
          </View>
        ))}
      </PagerView>
      <View style={styles1.actionButtonsContainer}>
        <TouchableOpacity 
          style={styles1.actionButton}
          onPress={toggleFavorite}
          activeOpacity={0.7}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <AntDesign 
              name={isFavorite ? "heart" : "hearto"} 
              size={scaleHeight(28)} 
              color={isFavorite ? "red" : "white"}
            />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles1.actionButton}
          onPress={onShare}
          activeOpacity={0.7}
        >
          <Ionicons name="share-social-outline" size={scaleHeight(28)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles1.dotContainer}>
        {images.map((_, index) => (
          <Text key={index} style={index === activeIndex ? styles1.activeDot : styles1.dot}>o</Text>
        ))}
      </View>
    </View>
  )
}

export default BigImage

const styles1 = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: scaleWidth(20),
    width: '100%',
  },
  dot: {
    fontSize: scaleWidth(15),
    color: '#888',
    margin: scaleWidth(3),
  },
  activeDot: {
    fontSize: scaleWidth(15),
    color: '#fff',
    margin: scaleWidth(3),
  },
  actionButtonsContainer: {
    position: 'absolute',
    top: scaleHeight(20),
    right: scaleWidth(20),
    zIndex: 1,
    flexDirection: 'row',
    gap: scaleWidth(10),
  },
  actionButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: scaleWidth(50),
    padding: scaleWidth(8),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scaleHeight(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})