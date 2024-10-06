import { View,Text} from 'react-native'
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


const Home = ({ navigation }) => {
  const handleNavigation = () => {
    console.log('Navigating to food view page')
    navigation.navigate('ViewFood')
}

  
  return (
    <SafeAreaView>
      <StatusBar hidden={false} backgroundColor='#dc2f02' style='light' />
      <View style={styles.home_screen}>
        <NavBar />
        <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:-6}} stickyHeaderIndices={[1]}>

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
                stylesForBox={[styles.category_boxes, { backgroundColor: '#D4A373' }]}
                category='Desert'
              />
              <Categories
                stylesForBox={[styles.category_boxes,{backgroundColor:'#FF5722'}]}
                category='Snacks'
              />
              <Categories
                stylesForBox={[styles.category_boxes, { backgroundColor: '#3E2723' }]}
                category='Drinks'
              />
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

