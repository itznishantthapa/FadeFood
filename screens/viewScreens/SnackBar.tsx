import React, { useEffect, useState } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { scaleHeight } from '../../Scaling';

const SnackBar = ({ message, visible, onClose }) => {
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
      toValue: 50,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose && onClose());
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.snackbar, { transform: [{ translateY: slideAnim }] }]}>
      <Text style={styles.snackbarText}>{message}</Text>
      <TouchableOpacity onPress={handleClose}>
        <Text style={styles.closeText}>CLOSE</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: scaleHeight(65),
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#333333',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  snackbarText: {
    color: '#fff',
  },
  closeText: {
    color: '#FFEB3B',
    fontWeight: 'bold',
  },
});

export default SnackBar;
