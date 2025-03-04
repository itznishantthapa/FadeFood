import React, { useEffect, useRef, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import PagerView from 'react-native-pager-view';
import chicken from '../../assets/images/chicken.png';
import dishes from '../../assets/images/dishes.png';
import { scaleHeight, scaleWidth } from '../../Scaling';

const { width } = Dimensions.get('window');
const ASPECT_RATIO = 16 / 7;
const IMAGE_HEIGHT = width / ASPECT_RATIO;

const images = [dishes, chicken, dishes, dishes, dishes, dishes, dishes];

const SlickCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pagerRef = useRef(null);
  const animatedScale = useRef(images.map(() => new Animated.Value(1))).current;
  const extendedImages = [images[images.length - 1], ...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= images.length) {
        pagerRef.current?.setPageWithoutAnimation(1);
        nextIndex = 0;
      } else {
        pagerRef.current?.setPage(nextIndex + 1);
      }
      setActiveIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePageChange = (position) => {
    let newIndex = position - 1;
    if (position === 0) {
      pagerRef.current?.setPageWithoutAnimation(images.length);
      newIndex = images.length - 1;
    } else if (position === extendedImages.length - 1) {
      pagerRef.current?.setPageWithoutAnimation(1);
      newIndex = 0;
    }
    setActiveIndex(newIndex);
    animateDots(newIndex);
  };

  const animateDots = (newIndex) => {
    animatedScale.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === newIndex ? 1.3 : 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={{ width:"100%", height: scaleHeight(155)}}
        initialPage={1}
        onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
      >
        {extendedImages.map((image, index) => (
          <TouchableOpacity key={index} style={{ paddingHorizontal: scaleWidth(8) }} activeOpacity={0.9}>
            <View style={styles.imageContainer}>
              <Image resizeMode="cover" style={styles.image} source={image} />
            </View>
          </TouchableOpacity>
        ))}
      </PagerView>
      
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                transform: [{ scale: animatedScale[index] }],
                backgroundColor: activeIndex === index ? '#FF7F50' : '#dadada',
                height: activeIndex === index ?  scaleWidth(10): scaleWidth(7),
                width: activeIndex === index ?  scaleWidth(10): scaleWidth(7),
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginHorizontal: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',

  },
  image: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'rgba(0, 0, 0, 0.4)',
    paddingVertical: scaleWidth(6),
    paddingHorizontal: scaleWidth(10),
    borderRadius: scaleWidth(15),
  },
  dot: {
    borderRadius: scaleWidth(5),
    marginHorizontal: scaleWidth(4),
  },
});

export default SlickCarousel;