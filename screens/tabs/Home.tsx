import { View} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../style/style';
import { StatusBar } from 'expo-status-bar';
import dessert from '../../assets/dessert.jpg'
import noodles from '../../assets/noodles.jpeg'
import momo from '../../assets/momo.jpeg'
import chatapate from '../../assets/chatapate.jpeg'
import FoodItems from '../../components/home/FoodItems';
import { ScrollView } from 'react-native-gesture-handler';
import SloganBox from '../../components/home/SloganBox';
import Categories from '../../components/home/Categories';
import Map from '../../components/home/Map';
import NavBar from '../../components/home/NavBar';
import { nodeModuleNameResolver } from 'typescript';


const Home = ({ navigation }) => {
  return (
    <SafeAreaView>
      <StatusBar hidden={false} backgroundColor='#0d1b2a' style='light' />

      <View style={styles.home_screen}>
        <NavBar />
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 53 }} stickyHeaderIndices={[1]}>

          <View style={styles.dashboardContainer}>
            <SloganBox
              solgan_line1='Pre-order'
              solgan_line2='your favorite meals'
              solgan_line3='skip the wait!'
            />
            <Map />
          </View>

          <View style={styles.home_categories_options}>
            <View style={styles.category_container} >
              <Categories
                stylesForBox={[styles.category_boxes, { backgroundColor: 'white' }]}
                category='Desert'
              />
              <Categories
                stylesForBox={styles.category_boxes}
                category='Snacks'
              />
              <Categories
                stylesForBox={[styles.category_boxes, { backgroundColor: 'white' }]}
                category='Drinks'
              />
            </View>
          </View>

          <View style={styles.foodItems_container}>
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={momo}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={noodles}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={chatapate}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
            <FoodItems
              FoodImage={dessert}
              FoodPrice={50}
              TimeToCook={20}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
export default Home

