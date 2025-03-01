import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export function StatusBarBackground({ bg_color }) {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(bg_color, true);  // Reset to white
      StatusBar.setBarStyle('dark-content', true);    // Ensure text is dark
    }, [bg_color])
  );

  return null;
}