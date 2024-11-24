import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const WavePulse = ({ size, isActive , style }) => {
  // Create animated values for multiple waves
  const wave1 = new Animated.Value(0);
  const wave2 = new Animated.Value(0);
  const wave3 = new Animated.Value(0);
  
  // Create pulse animation
  const createWaveAnimation = (waveValue, delay = 0) => {
    return Animated.sequence([
      Animated.delay(delay),
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
            useNativeDriver: true,
          }),
          Animated.timing(waveValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ),
    ]);
  };

  // Start animation when component mounts or isActive changes
  useEffect(() => {
    if (isActive) {
      // Start animations with different delays for a wave effect
      Animated.parallel([
        createWaveAnimation(wave1, 0),
        createWaveAnimation(wave2, 666),
        createWaveAnimation(wave3, 1333),
      ]).start();
    } else {
      // Reset animations when inactive
      wave1.setValue(0);
      wave2.setValue(0);
      wave3.setValue(0);
    }
  }, [isActive]);

  // Interpolate values for scaling and opacity
  const getAnimatedStyle = (waveValue) => ({
    transform: [
      {
        scale: waveValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 4],
        }),
      },
    ],
    opacity: waveValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 0],
    }),
  });

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* Base circle */}
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            backgroundColor: isActive ? '#4CAF50' : '#FF5252',
          },
        ]}
      />
      
      {isActive && (
        <>
          {/* Animated waves */}
          <Animated.View
            style={[
              styles.wave,
              {
                width: size,
                height: size,
                backgroundColor: '#4CAF50',
              },
              getAnimatedStyle(wave1),
            ]}
          />
          <Animated.View
            style={[
              styles.wave,
              {
                width: size,
                height: size,
                backgroundColor: '#4CAF50',
              },
              getAnimatedStyle(wave2),
            ]}
          />
          <Animated.View
            style={[
              styles.wave,
              {
                width: size,
                height: size,
                backgroundColor: '#4CAF50',
              },
              getAnimatedStyle(wave3),
            ]}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    borderRadius: 100,
    position: 'absolute',
    zIndex: 2,
  },
  wave: {
    borderRadius: 100,
    position: 'absolute',
    zIndex: 1,
  },
});

export default WavePulse;
