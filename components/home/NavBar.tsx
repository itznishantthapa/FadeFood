import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
// import { styles } from '../../style/style'
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { scaleWidth,scaleHeight } from '../../Scaling';



const NabBar = ({ handleSearchScreen, isTextInput, isBack,navigation }) => {
  const [searchText, setSearchText] = useState('');
  // Array of placeholder texts that will rotate
  const placeholders = [
    'Go for your favorite restaurant',
    'Mo:mo',
    'Keema Noodles',
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

  const handleBackButton = () => {
    navigation.goBack();
}

  return (
    <View style={styles.navBar}>
      {isBack ? (
        <TouchableOpacity onPress={handleBackButton}>
          <AntDesign
            name='arrowleft'
            size={scaleWidth(30)}
            style={{ color: '#333333' }}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/fadefood_logo.png')}
            style={styles.nav_logo}
          />
        </View>
      )
      }


      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>




        <View style={styles.searchBar} >


          <Animated.View style={{ opacity: fadeAnim, width: '90%' }}>
            {
              isTextInput ? (
                <TextInput
                  autoFocus={true}
                  selectionColor="#BDBDBD"
                  cursorColor={'grey'}
                  style={styles.searchInput}
                  placeholder={placeholders[currentPlaceholderIndex]}
                  value={searchText}
                  onChangeText={text => setSearchText(text)}
                  returnKeyType="search"
                />
              ) : (
                <TouchableWithoutFeedback onPress={handleSearchScreen} style={{ justifyContent: 'center', height: '100%' }} >
                  <TextInput
                    selectionColor="#BDBDBD"
                    style={styles.searchInput}
                    placeholder={placeholders[currentPlaceholderIndex]}
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                    returnKeyType="search"
                    editable={false}
                  />
                </TouchableWithoutFeedback>

              )
            }

          </Animated.View>


          {searchText.length > 0 && (
            <TouchableOpacity onPress={handleClear}>
              <Entypo
                name='circle-with-cross'
                size={scaleWidth(18)}
                style={{ color: '#adb5bd' }}
              />
            </TouchableOpacity>
          )}

        </View>


        <View style={styles.searchView}>
          <Feather
            name="search"
            size={scaleWidth(30)}
            style={{ color: '#333333' }}
          />
        </View>

      </View>
      {/* </TouchableWithoutFeedback> */}

    </View>
  )
}

export default NabBar

//create stylesheets funcation here
const styles = StyleSheet.create({
  navBar: {
    width: '100%',
    height: scaleHeight(60),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    zIndex: 10,
    top: 0,
    gap: 5,
    paddingHorizontal: scaleWidth(8),
    
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: scaleWidth(2),
    borderTopWidth: scaleWidth(2),
    borderBottomWidth: scaleWidth(2),
    // borderColor: '#FF5722',
    borderColor: '#333333',
    height: scaleHeight(45),
    width: '74%',
    borderTopLeftRadius: scaleWidth(20),
    borderBottomLeftRadius: scaleWidth(20),
    // backgroundColor: '#F5F5F5',
    paddingHorizontal: scaleWidth(1),
    paddingLeft: scaleWidth(10),
    paddingRight: scaleWidth(2),

  },
  searchView: {
    height: scaleHeight(45),
    borderColor: '#333333',
    width: '15%',
    borderWidth: scaleWidth(2),
    borderLeftWidth: 0,
    borderTopRightRadius: scaleWidth(20),
    borderBottomRightRadius: scaleWidth(20),
    borderBottomLeftRadius: scaleWidth(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: '80%',
    color: '#666666',
    fontSize: scaleWidth(16),
    fontFamily: 'poppins_regular',
    textAlignVertical: 'bottom',
  },
  nav_logo: {
    height: scaleHeight(30),
    width: scaleWidth(30),
    resizeMode: 'cover',
  },
  logoContainer: {
    backgroundColor: 'red',
    padding: scaleWidth(8),
    borderRadius: scaleWidth(10),
  },
});
