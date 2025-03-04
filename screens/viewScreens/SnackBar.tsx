import React, { useEffect, useState } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth } from '../../Scaling';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you're using MaterialIcons

const SnackBar = ({ message, visible, duration = 3000, onDismiss, backgroundColor = '#80ed99', textColor = '#333333', closeButtonColor = '#FFEB3B' }) => {
  const [slideAnim] = useState(new Animated.Value(scaleHeight(100))); // Initial slide position

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        useNativeDriver: true,
      }).start();

      // Auto-dismiss after the specified duration
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.spring(slideAnim, {
      toValue: scaleHeight(100),
      friction: 7,
      useNativeDriver: true,
    }).start(() => {
      if (onDismiss) onDismiss();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.snackbar,
        {
          backgroundColor,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={[styles.snackbarText, { color: textColor }]}>{message}</Text>
      <TouchableOpacity onPress={handleClose}>
        <Icon name="close" size={scaleWidth(20)} color={closeButtonColor} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: scaleHeight(20),
    left: scaleWidth(20),
    right: scaleWidth(20),
    paddingHorizontal: scaleHeight(15),
    paddingVertical: scaleHeight(12),
    borderRadius: scaleWidth(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  snackbarText: {
    fontSize: scaleWidth(14),
    fontFamily: 'jakarta_bold',
    flex: 1,
    marginRight: scaleWidth(10),
  },
});

export default SnackBar;