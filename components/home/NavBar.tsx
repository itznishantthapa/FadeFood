import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../../style/style'
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const NabBar = () => {
  const [searchText, setSearchText] = useState('');
  // Array of placeholder texts that will rotate
  const placeholders = [
    'Go for your favorite restaurant',
    'Mo:mo',
    'Sadeko Sukuti',
    'Find delicious meals'
  ];

  // State to keep track of current placeholder index
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  // State for fade animation
  const [fadeAnim] = useState(new Animated.Value(1));

  // Function to handle text clearing
  const handleClear = () => {
    setSearchText('');
  };

  // Store interval ID in a ref so we can clear it
  const intervalRef = useRef(null);

  useEffect(() => {
    // If there's text in the search box, clear the animation interval
    if (searchText.length > 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Only start animations if search box is empty
    const fadeOut = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentPlaceholderIndex(
          (prevIndex) => (prevIndex + 1) % placeholders.length
        );
        fadeIn();
      });
    };

    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    // Start the interval only if search box is empty
    intervalRef.current = setInterval(() => {
      fadeOut();
    }, 5000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [searchText]); // Now depends on searchText to restart animation when text is cleared


  return (
    <View style={styles.navBar}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/fadefood_logo.png')}
          style={styles.nav_logo}
        />
      </View>

      <View style={styles.searchBar}>
        <Animated.View style={{ opacity: fadeAnim, width: '70%' }}>
          <TextInput
            selectionColor="#BDBDBD"
            style={styles.searchInput}
            placeholder={placeholders[currentPlaceholderIndex]}
            value={searchText}
            onChangeText={text => setSearchText(text)}
            returnKeyType="search"
          />
        </Animated.View>

        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Entypo
              name='circle-with-cross'
              size={18}
              style={{ color: '#adb5bd' }}
            />
          </TouchableOpacity>
        )}

        <View style={{
          height: '94%',
          width: '18%',
          borderWidth:2,
          backgroundColor: '#FF5722',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          marginLeft: 'auto',
          borderColor: '#FF5722'
        }}>
          <Feather
            name="search"
            size={30}
            style={{ color: '#ffffff' }}
          />
        </View>
      </View>
    </View>
  )
}

export default NabBar