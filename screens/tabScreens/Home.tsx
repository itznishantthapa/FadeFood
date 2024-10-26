import { View, Text, Dimensions, Image, ImageBackground, FlatList } from 'react-native'
import TouchableWithoutFeedback from 'react-native-gesture-handler';
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
import biryani from '../../assets/biryani.jpg'
// import chatapate from '../../assets/chatapate.jpg'

import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import CategoriesRestaurant from '../../components/home/CategoriesRestaurant';
import Price from '../../components/viewScreens/Price';
import NearDishCard from '../../components/home/NearDishCard';
import CardsCarousel from '../../components/home/Carousel';
import Greeting from '../../components/home/Greeting';
import FoodCard from '../../components/home/FoodCard';
import { scaleHeight, scaleWidth } from '../../Scaling';


const { width, height } = Dimensions.get('window');


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

  const FoodData = [
    {
      "food_picture": biryani,
      "price": 1500,
      "discount": 10,
      "foodName": "Burger",
      "no_fragments": null,
      "eatsNumber": 120,
      "rating": 4.5,
      "location": "Dharan, Bhanuchowk"
    },
    {
      "food_picture": chatapate,
      "price": 1200,
      "discount": null,
      "foodName": "Pizza",
      "no_fragments": "8",
      "eatsNumber": 200,
      "rating": 4.8,
      "location": "Kathmandu, Thamel"
    },
    {
      "food_picture": momo,
      "price": 800,
      "discount": 5,
      "foodName": "Pasta",
      "no_fragments": null,
      "eatsNumber": 90,
      "rating": 4.2,
      "location": "Pokhara, Lakeside"
    },
    {
      "food_picture": noodles,
      "price": 500,
      "discount": 20,
      "foodName": "Sandwich",
      "no_fragments": "6",
      "eatsNumber": 70,
      "rating": 4.0,
      "location": "Biratnagar, Main Road"
    },
    {
      "price": 300,
      "discount": 10,
      "foodName": "Momo",
      "no_fragments": "3",
      "eatsNumber": 150,
      "rating": 4.7,
      "location": "Chitwan, Narayangarh"
    },
    {
      "price": 2000,
      "discount": 25,
      "foodName": "Steak",
      "no_fragments": "10",
      "eatsNumber": 80,
      "rating": 4.9,
      "location": "Lalitpur, Jhamsikhel"
    },
    {
      "price": 400,
      "discount": 12,
      "foodName": "Fries",
      "no_fragments": "2",
      "eatsNumber": 110,
      "rating": 4.1,
      "location": "Itahari, Bus Park"
    },
    {
      "price": 1800,
      "discount": 30,
      "foodName": "Sushi",
      "no_fragments":null,
      "eatsNumber": 130,
      "rating": 4.6,
      "location": "Bhaktapur, Durbar Square"
    },
    {
      "price": 1000,
      "discount": 18,
      "foodName": "Tacos",
      "no_fragments": "7",
      "eatsNumber": 95,
      "rating": 4.3,
      "location": "Butwal, Traffic Chowk"
    },
    {
      "price": 1000,
      "discount": 18,
      "foodName": "Tacos",
      "no_fragments": null,
      "eatsNumber": 95,
      "rating": 4.3,
      "location": "Butwal, Traffic Chowk"
    },

  ]
  // Split data into two columns
  const leftColumn = FoodData.filter((_, i) => i % 2 === 0);
  const rightColumn = FoodData.filter((_, i) => i % 2 === 1);


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
  const handleSearchScreen = () => {
    navigation.navigate('SearchScreen')
    console.log('Navigating to search screen')
  }
  return (
    <SafeAreaView>
      <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
      <View style={styles.home_screen}>

        <NavBar handleSearchScreen={handleSearchScreen} isTextInput={false} isBack={false} navigation={navigation} />

        {/* <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}> */}
        <ScrollView showsVerticalScrollIndicator={false} >

          <View style={styles1.dashboardContainer} >
            <Greeting />
            <PagerView
              ref={pagerRef}
              style={{ width: width, height: scaleHeight(150) }}
              initialPage={0}
              onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
            >
              {images.map((image, index) => (
                <View key={index} style={{ alignItems: 'center', height: '100%', paddingHorizontal: scaleWidth(8) }}>
                  <View style={{ width: '100%', backgroundColor: "black", borderRadius: scaleWidth(20) }}>
                    <Image resizeMode='stretch' style={{ height: '100%', width: '100%', borderRadius: scaleWidth(20) }} source={image}></Image>
                  </View>
                </View>

              ))}
            </PagerView>


            <View style={styles1.dashContainer}>
              {images.map((_, index) => (
                <View key={index} style={index === activeIndex ? [styles1.activeDash, { width: scaleWidth(50) - (index * scaleWidth(10)) }] : [styles1.dash, { width: scaleWidth(50) - (index * scaleWidth(10)) }]} />
              ))}
            </View>

            <View style={{ gap: scaleHeight(5), marginTop: scaleHeight(10), backgroundColor: '#F0F4F8', paddingVertical: scaleHeight(10),width:'100%' }}>
              <View style={{ width: '100%', paddingHorizontal: scaleWidth(8) }}>
                <Text style={{ fontFamily: 'poppins_bold', fontSize: scaleWidth(18) }}>Restaurant Categories</Text>
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

            <View style={{ gap: scaleHeight(5), marginTop: scaleHeight(10) }}>
              <View style={{ width: '100%', paddingHorizontal: scaleWidth(8) }}>
                <Text style={{ fontFamily: 'poppins_bold', fontSize: scaleWidth(18) }}>Explore on maps</Text>
              </View>
              <Map />
            </View>

            <View style={{ gap: scaleHeight(5), marginTop: scaleHeight(10), width: '100%', alignItems: 'center', backgroundColor: '#F0F4F8', paddingVertical: scaleHeight(5) }}>
              <View style={{ width: '100%', paddingHorizontal: scaleWidth(8) }}>
                <Text style={{ fontFamily: 'poppins_bold', fontSize: scaleWidth(18) }}>Best Selling Items Near Me</Text>
              </View>

              <View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', width: '100%', marginLeft: scaleWidth(20) }}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ height: scaleHeight(200) }}>
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row', gap: scaleWidth(30), paddingHorizontal: scaleWidth(12) }}>
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
                  {/* <View style={{width:width,borderWidth:1,borderColor:'grey',bottom:10,position:'absolute'}}></View> */}
                </View>
              </View>
            </View>



          </View>


          <View style={styles.foodItems_container}>
            <View style={{ width: '50%', alignItems: 'center'}}>
              {
                leftColumn.map((item, index) => (
                  <FoodCard
                    key={index}
                    food_picture={item.food_picture}
                    price={item.price}
                    discount={item.discount}
                    foodName={item.foodName}
                    no_fragments={item.no_fragments}
                    eatsNumber={item.eatsNumber}
                    rating={item.rating}
                    location={item.location}
                  />
                ))
              }
            </View>

            <View style={{ width: '50%', alignItems: 'center' }}>
              {
                rightColumn.map((item, index) => (
                  <FoodCard
                    key={index}
                    food_picture={item.food_picture}
                    price={item.price}
                    discount={item.discount}
                    foodName={item.foodName}
                    no_fragments={item.no_fragments}
                    eatsNumber={item.eatsNumber}
                    rating={item.rating}
                    location={item.location}
                  />
                ))
              }
            </View>








          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
export default Home

const styles1 = StyleSheet.create({
  dashboardContainer: {
    height: height - scaleHeight(120),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#ff7900',
    // backgroundColor: '#ced4da',
    backgroundColor: '#DDE1E3',
    // padding: 10,
    //  marginBottom: scaleHeight(10),
    //  paddingBottom: scaleHeight(10),
  },
  dashContainer: {
    flexDirection: 'row',
    gap: scaleWidth(10),
    position: 'static',
    bottom: scaleHeight(15),
    width: '100%',
    zIndex: 1,
    justifyContent: 'center',
  },
  dash: {
    borderBottomWidth: scaleWidth(6),
    borderColor: 'grey',
    height: 0,
    borderRadius: 5
  },
  activeDash: {
    borderBottomWidth: scaleWidth(6),
    borderColor: 'white',
    height: 0,
    borderRadius: 5
  },


})