import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import chicken from '../../assets/images/chicken.png';
import dishes from '../../assets/images/dishes.png';
import { scaleHeight, scaleWidth } from '../../Scaling';

const { width } = Dimensions.get('window');
const ASPECT_RATIO = 16 / 7;
const IMAGE_HEIGHT = width / ASPECT_RATIO;

const images = [
  dishes,
  chicken,
  dishes,
  dishes,
  dishes,
  dishes,
  dishes,
];

const SlickCarousel = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const pagerRef = React.useRef(null);

  // Add extra items for looping
  const extendedImages = [images[images.length - 1], ...images, images[0]];

  // Handle page change
  const handlePageChange = (position) => {
    let newIndex = position - 1; // Adjust index for the extended array

    // Handle looping
    if (position === 0) {
      // If user swipes to the first extra item, jump to the last real item
      pagerRef.current?.setPageWithoutAnimation(images.length);
      newIndex = images.length - 1;
    } else if (position === extendedImages.length - 1) {
      // If user swipes to the last extra item, jump to the first real item
      pagerRef.current?.setPageWithoutAnimation(1);
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      {/* Carousel */}
      <PagerView
        ref={pagerRef}
        style={{ width: width, height: scaleHeight(155), backgroundColor: '#ffffff' }}
        initialPage={0} // Start at the first real item
        onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
      >
        {extendedImages.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={{ paddingHorizontal: scaleWidth(8) }}
            activeOpacity={0.9}
          >
            <View style={styles.imageContainer}>
              <Image resizeMode="cover" style={styles.image} source={image} />
            </View>
          </TouchableOpacity>
        ))}
      </PagerView>

      {/* Dot Indicators */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
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
    marginTop: scaleHeight(10),
  },
  dot: {
    marginHorizontal: scaleWidth(4), // Margin between dots
  },
  inactiveDot: {
    width: scaleWidth(5),
    height: scaleWidth(5),
    borderRadius: scaleWidth(2.5),
    backgroundColor: '#cccccc', // Inactive dot color
  },
  activeDot: {
    width: scaleWidth(6),
    height: scaleWidth(6),
    borderRadius: scaleWidth(4),
    backgroundColor: '#FF7F50', // Active dot color
  },
});

export default SlickCarousel;