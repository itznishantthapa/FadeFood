import { View, Text, Dimensions, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import { nodeModuleNameResolver } from 'typescript';
import dessert from '../../assets/dessert.jpg'
import noodles from '../../assets/noodles.jpeg'
import momo from '../../assets/momo.jpeg'
import chatapate from '../../assets/chatapate.jpeg'
import FoodItems from '../../components/home/FoodItemsCard';
import { ScrollView } from 'react-native-gesture-handler';
import SloganBox from '../../components/home/SloganBox';
import Categories from '../../components/home/Categories';
import Map from '../../components/home/Map';
import NavBar from '../../components/home/NavBar';
import wallpaper from '../../assets/images/wallpaper.jpeg'
import chicken from '../../assets/images/chicken.png'
import burger from '../../assets/images/burger.png'
import dishes from '../../assets/images/dishes.png'

import Octicons from 'react-native-vector-icons/Octicons';
const { width, height } = Dimensions.get('window');
import { StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';


const images = [
  burger,
  chicken,
  dishes,
];

const Home = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change wallpaper every 4 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    if (pagerRef.current) {
      pagerRef.current.setPage(activeIndex);
    }
  }, [activeIndex]);

  const pagerRef = React.useRef(null);

  const handleNavigation = () => {
    console.log('Navigating to food view page')
    navigation.navigate('ViewFood')
  }
  return (
    <SafeAreaView>
      <StatusBar hidden={false} backgroundColor='#dc2f02' style='light' />
      <View style={styles.home_screen}>
        <NavBar />
        {/* <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}> */}
        <ScrollView showsVerticalScrollIndicator={false} >

          <LinearGradient
          colors={['#dc2f02', '#e85d04', '#f48c06']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }} style={styles.dashboardContainer}>
            <PagerView
              ref={pagerRef}
              // style={{width:width,height:'60%'}}
              style={{width:width,height:150}}
              initialPage={0}
              onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
            >
              {images.map((image, index) => (
                <View  key={index} style={{alignItems:'center',height:'100%',paddingHorizontal:8}}>
                  <View style={{ width: '100%', backgroundColor: "black", borderRadius: 20 }}>
                    <Image resizeMode='stretch' style={{ height: '100%', width: '100%', borderRadius: 20 }} source={image}></Image>
                  </View>
                </View>

              ))}
            </PagerView>
          

            <View style={styles1.dashContainer}>
              {images.map((_, index) => (
                <View key={index} style={index === activeIndex ? [styles1.activeDash, { width: 50 - (index * 10) }] : [styles1.dash, { width: 50 - (index * 10) }]} />
              ))}
            </View>


          </LinearGradient>
{/* 
          <View style={styles.home_categories_options}>
            <View style={styles.category_container} >
              <Categories
                stylesForBox={[styles.category_boxes, { backgroundColor: '#D4A373', width: width * 0.303 }]}
                category='Desert'
              />
              <Categories
                stylesForBox={[styles.category_boxes, { backgroundColor: '#FF5722', width: width * 0.303 }]}
                category='Snacks'
              />
              <Categories
                stylesForBox={[styles.category_boxes, { backgroundColor: '#3E2723', width: width * 0.303 }]}
                category='Drinks'
              />
            </View>
          </View> */}

          <View style={styles.foodItems_container}>
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
              handleNavigation={handleNavigation}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
              handleNavigation={handleNavigation}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
              handleNavigation={handleNavigation}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
              handleNavigation={handleNavigation}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
              handleNavigation={handleNavigation}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
              handleNavigation={handleNavigation}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
              handleNavigation={handleNavigation}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
              handleNavigation={handleNavigation}
            />

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
export default Home

const styles1 = StyleSheet.create({
  dashContainer: {
    flexDirection: 'row',
    gap: 10,
    position: 'static',
    bottom: 15,
    width: '100%',
    zIndex: 1,
    // backgroundColor: 'black',
    justifyContent: 'center',
  },
  dash: {
    borderBottomWidth: 6,
    borderColor: 'grey',
    height: 0,
    borderRadius: 5
  },
  activeDash: {
    borderBottomWidth: 6,
    borderColor: 'white',
    height: 0,
    borderRadius: 5
  }

})