import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
// import { styles } from '../../style/style'
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

const NabBar = ({ handleSearchScreen,handleBackButton,isTextInput,isBack }) => {
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
      { isBack? (
        <TouchableOpacity onPress={handleBackButton}>
          <AntDesign
            name='arrowleft'
            size={30}
            style={{ color: '#FF5722' }}
          />
        </TouchableOpacity>
      ):(
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
              isTextInput?(
                <TextInput
                selectionColor="#BDBDBD"
                style={styles.searchInput}
                placeholder={placeholders[currentPlaceholderIndex]}
                value={searchText}
                onChangeText={text => setSearchText(text)}
                returnKeyType="search"
              />
              ):(
                <TouchableWithoutFeedback onPress={handleSearchScreen} style={{justifyContent:'center',height:'100%',zIndex:-122}}>
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
                size={18}
                style={{ color: '#adb5bd' }}
              />
            </TouchableOpacity>
          )}

        </View>


        <View style={styles.searchView}>
          <Feather
            name="search"
            size={30}
            style={{ color: '#FF5722' }}
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
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#0d1b2a',
    // backgroundColor: '#dc2f02',
    backgroundColor: '#F0F4F8',
    zIndex: 10,
    // position: 'absolute', //need tp fixed 
    top: 0,
    gap: 5,
    paddingHorizontal: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FF5722',
    height: 45,
    width: '70%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 1,
    paddingLeft: 10,
    paddingRight: 2,

  },
  searchView: {
    height: 45,
    borderColor: '#FF5722',
    width: '15%',
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    // width: '75%',
    height: '80%',
    color: '#666666',
    fontSize: 16,
    fontFamily: 'poppins_regular',
    // backgroundColor: 'red',
    textAlignVertical: 'bottom',
    // justifyContent: 'center',
    // alignItems: 'center',


  },
  nav_logo: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  logoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
