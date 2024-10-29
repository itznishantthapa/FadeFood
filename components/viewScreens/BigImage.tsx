import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import React, { useState, useRef } from 'react'
import { Image } from 'react-native'
import PagerView from 'react-native-pager-view'
import { scaleHeight } from '../../Scaling';
import { AntDesign } from '@expo/vector-icons'; // Make sure you have expo vector icons installed

const images = [
  require('../../assets/chatapate.jpeg'),
  require('../../assets/noodles.jpeg'),
  require('../../assets/momo.jpeg'),
];

const BigImage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const toggleFavorite = () => {
    // Animation for heart press effect
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setIsFavorite(!isFavorite);
  };

  return (
    <View style={{ height: scaleHeight(500), width: '100%' }}>
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
      >
        {images.map((image, index) => (
          <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image resizeMode='cover' style={{ height: '100%', width: '100%' }} source={image} />
          </View>
        ))}
      </PagerView>

      {/* Heart Icon */}
      <TouchableOpacity 
        style={styles1.heartContainer}
        onPress={toggleFavorite}
        activeOpacity={0.7}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <AntDesign 
            name={isFavorite ? "heart" : "hearto"} 
            size={28} 
            color={isFavorite ? "#FF6B6B" : "white"}
          />
        </Animated.View>
      </TouchableOpacity>

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
    bottom: 10,
    width: '100%',
  },
  dot: {
    fontSize: 20,
    color: '#888',
    margin: 3,
  },
  activeDot: {
    fontSize: 20,
    color: '#fff',
    margin: 3,
  },
  heartContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 50,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})