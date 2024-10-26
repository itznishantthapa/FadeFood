import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import PagerView from 'react-native-pager-view'


const images = [
  require('../../assets/chatapate.jpeg'),
  require('../../assets/noodles.jpeg'), // Add your second image here
  require('../../assets/momo.jpeg'), // Add your third image here
];

const BigImage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <View style={{ height: '50%', width: '100%' }}>

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

      <View style={styles1.dotContainer}>
        {images.map((_, index) => (
          <Text key={index} style={index===activeIndex?styles1.activeDot:styles1.dot}>o</Text>
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
})