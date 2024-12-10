import React, { useEffect, useState } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth } from '../../Scaling';

const SnackBar = ({ message, visible }) => {
  const [slideAnim] = useState(new Animated.Value(50)); // Initial slide position

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto-dismiss after 3 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.snackbar, { transform: [{ translateY: slideAnim }] }]}>
      <Text style={styles.snackbarText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: scaleHeight(65),
    left: scaleWidth(20),
    right: scaleWidth(20),
    paddingHorizontal: scaleHeight(10),
    paddingVertical: scaleHeight(10),
    // backgroundColor: '#4CAF50',
    backgroundColor: '#80ed99',
    borderRadius: scaleWidth(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  snackbarText: {
    color: '#333333',
    fontSize: scaleWidth(14),
    fontFamily: 'jakarta_bold',
  },
  closeText: {
    color: '#FFEB3B',
    fontWeight: 'bold',
  },
});

export default SnackBar;
