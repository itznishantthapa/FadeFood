// components/CustomSnackbar.js
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const CustomSnackbar = ({ message, visible=true }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300, // Fade in duration
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300, // Fade out duration
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.container]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#323232',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 999,
    opacity: 1,
  },
  message: {
    color: '#fff',
    fontSize: 14,
  },
});

export default CustomSnackbar;
