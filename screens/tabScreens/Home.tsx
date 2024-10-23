import { View, Text, Dimensions, Image, ImageBackground, FlatList } from 'react-native'
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
import categoryMOMO from '../../assets/images/categoryMOMO.png'
import categoryNoodles from '../../assets/images/categoryNoodles.png'
import categoryBurger from '../../assets/images/categoryBurger.png'
import categoryCake from '../../assets/images/categoryCake.png'
import categoryPizza from '../../assets/images/categoryPizza.png'
import categoryChicken from '../../assets/images/categoryChicken.png'

import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window');
import { StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import CategoriesRestaurant from '../../components/home/CategoriesRestaurant';
import Price from '../../components/viewScreens/Price';
import NearDishCard from '../../components/home/NearDishCard';
import CardsCarousel from '../../components/home/Carousel';




const images = [
  burger,
  chicken,
  dishes,
];

const Home = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const dishItems = [
    {
      "image": categoryChicken,
      "price": "1500",
      "name": "Grilled Chicken",
      "reviewsNumber": 20,
      "rating": 4.5
    },
    {
      "image": categoryBurger,
      "price": "300",
      "name": "Burger",
      "reviewsNumber": 200,
      "rating": 4.5
    },
    {
      "image": categoryMOMO,
      "price": "1500",
      "name": "Grilled Chicken",
      "reviewsNumber": 20,
      "rating": 4.5
    },
    {
      "image": categoryNoodles,
      "price": "300",
      "name": "Burger",
      "reviewsNumber": 200,
      "rating": 4.5
    },
    {
      "image": categoryPizza,
      "price": "1500",
      "name": "Grilled Chicken",
      "reviewsNumber": 20,
      "rating": 4.5
    },
    {
      "image": categoryCake,
      "price": "300",
      "name": "Burger",
      "reviewsNumber": 200,
      "rating": 4.5
    },
  ]

  // const renderDishItems = ({ item }) => <NearDishCard
  //   image={item.image}
  //   price={item.price}
  //   name={item.name}
  //   reiwesNumber={item.reviewsNumber}
  //   rating={item.rating}
  // />

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
      <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
      <View style={styles.home_screen}>
        <NavBar />
        {/* <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}> */}
        <ScrollView showsVerticalScrollIndicator={false} >

          <View style={styles.dashboardContainer} >
            <View style={styles1.container}>
              <Text style={styles1.greeting}>Good Afternoon, Nishant</Text>
              <Text style={styles1.subText}>What would you like to have today?</Text>
            </View>
            {/* LinearGradient
            colors={['#dc2f02', '#e85d04', '#f48c06']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }} style={styles.dashboardContainer} */}
            <PagerView
              ref={pagerRef}
              style={{ width: width, height: 150 }}
              initialPage={0}
              onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
            >
              {images.map((image, index) => (
                <View key={index} style={{ alignItems: 'center', height: '100%', paddingHorizontal: 8 }}>
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

            <View style={{ gap: 5, marginTop: 10, backgroundColor: '#F0F4F8', paddingVertical: 10 }}>
              <View style={{ width: '100%', paddingHorizontal: 8 }}>
                <Text style={{ fontFamily: 'poppins_bold', fontSize: 18 }}>Restaurant Categories</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                <CategoriesRestaurant
                  dishImage={categoryMOMO}
                  dishName={'Momo'}
                />
                <CategoriesRestaurant
                  dishImage={categoryNoodles}
                  dishName={'Noodles'}
                />
                <CategoriesRestaurant
                  dishImage={categoryBurger}
                  dishName={'Burger'}
                />
                <CategoriesRestaurant
                  dishImage={categoryPizza}
                  dishName={'Pizza'}
                />
                <CategoriesRestaurant
                  dishImage={categoryChicken}
                  dishName={'Chicken'}
                />
                <CategoriesRestaurant
                  dishImage={categoryCake}
                  dishName={'Cake'}
                />
              </View>

            </View>

            <View style={{ gap: 5, marginTop: 10 }}>
              <View style={{ width: '100%', paddingHorizontal: 8 }}>
                <Text style={{ fontFamily: 'poppins_bold', fontSize: 18 }}>Explore on maps</Text>
              </View>
              <Map />
            </View>

            <View style={{ gap: 5, marginTop: 10, width: '100%', alignItems: 'center', backgroundColor: '#F0F4F8', paddingVertical: 5 }}>
              <View style={{ width: '100%', paddingHorizontal: 8 }}>
                <Text style={{ fontFamily: 'poppins_bold', fontSize: 18 }}>Best Selling Items Near Me</Text>
              </View>
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginLeft: 20 }}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ height: 200 }}>
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row', gap: 30, paddingHorizontal: 12 }}>
                      {
                        dishItems.map((item, index) => (
                          <View key={index} style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <NearDishCard
                              image={item.image}
                              price={item.price}
                              name={item.name}
                              reiwesNumber={item.reviewsNumber}
                              rating={item.rating}
                            />
                          </View>

                        ))
                      }
                    </View>
                  </ScrollView>


                </View>

              </View>
            </View>


          </View>

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
  },
  container: {
    padding: 10,
    // backgroundColor: '#fff',
    width:'100%',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 25,
    // fontWeight: '700',
    fontFamily: 'poppins_bold',
    color: '#1A1A1A',
    // marginBottom: 8,
    // Add text shadow for subtle depth
    textShadowColor: 'rgba(0, 0, 0, 0.05)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'poppins_semibold',
    letterSpacing: 0.3,
    marginTop:-5
  },


})