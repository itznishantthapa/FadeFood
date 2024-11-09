import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

// Restaurant Looks Tab Component
const LooksScreen = () => {
  const restaurantViews = [
    { 
      id: 1, 
      image: require('../../assets/images/wallpaper.jpeg'),
      description: 'Elegant dining area with modern aesthetics'
    },
    { 
      id: 2, 
      image: require('../../assets/images/wallpaper.jpeg'),
      description: 'Peaceful outdoor seating with garden view'
    },
    { 
      id: 3, 
      image: require('../../assets/images/wallpaper.jpeg'),
      description: 'Premium bar with extensive collection'
    },
    // Add more views as needed
  ];

  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {restaurantViews.map((view) => (
        <View key={view.id} style={styles.lookCard}>
          <Image source={view.image} style={styles.lookImage} resizeMode="cover" />
          <Text style={styles.lookDescription}>{view.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

// Menu Items Tab Component
const MenuItemsScreen = () => {
  const foodItems = [
    { id: 1, name: 'Chicken Biryani', price: 350, image: require('../../assets/images/img1 (3).png') },
    { id: 2, name: 'Butter Chicken', price: 400, image: require('../../assets/images/img1 (3).png') },
    // Add more items as needed
  ];

  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.cardsContainer}>
        {foodItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.foodCard}>
            <Image source={item.image} style={styles.foodImage} resizeMode="cover" />
            <View style={styles.foodDetails}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodPrice}>₹{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// Drinks Tab Component
const DrinksScreen = () => {
  const drinks = [
    { id: 1, name: 'Fresh Lime Soda', price: 80, image: require('../../assets/images/sprite.jpg') },
    { id: 2, name: 'Mango Lassi', price: 100, image: require('../../assets/images/sprite.jpg') },
    // Add more drinks as needed
  ];

  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.cardsContainer}>
        {drinks.map((drink) => (
          <TouchableOpacity key={drink.id} style={styles.foodCard}>
            <Image source={drink.image} style={styles.foodImage} resizeMode="cover" />
            <View style={styles.foodDetails}>
              <Text style={styles.foodName}>{drink.name}</Text>
              <Text style={styles.foodPrice}>₹{drink.price}</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const RestaurantProfile = ({ navigation }) => {
  const handleGoBack = () => navigation.goBack();

  const openMaps = () => {
    const latitude = "26.8217"; 
    const longitude = "87.2863";
    const label = "Delicious Restaurant";

    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Restaurant Profile Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <AntDesign name="arrowleft" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Image 
            source={require('../../assets/transparent_logo.png')} 
            style={styles.restaurantLogo}
          />
          
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>Delicious Restaurant</Text>
            <Text style={styles.cuisineText}>Italian • Continental • Chinese</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <AntDesign name="star" size={16} color="#FFD700" />
                <Text style={styles.statText}>4.5 (500+)</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <MaterialIcons name="access-time" size={16} color="#666" />
                <Text style={styles.statText}>30-40 min</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.locationContainer} onPress={openMaps}>
              <Ionicons name="location-sharp" size={18} color="#E23744" />
              <Text style={styles.locationText}>1234, Sample Address, Sample City</Text>
              <MaterialIcons name="directions" size={20} color="#E23744" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Navigation Tabs */}
      <Tab.Navigator
        style={styles.tabNavigator}
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.tabIndicator,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: '#E23744',
          tabBarInactiveTintColor: '#666',
        }}
      >
        <Tab.Screen name="Menu Items" component={MenuItemsScreen} />
        <Tab.Screen name="Drinks" component={DrinksScreen} />
        <Tab.Screen name="Looks" component={LooksScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    // backgroundColor: '#F0F4F8',
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 16,
    position: 'absolute',
    zIndex: 1,
    left: 16,
    top: 4
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor:'transparent',
    marginTop: 18,
  },
  restaurantLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 24,
    fontFamily: 'poppins_semibold',
    color: '#333',
    marginBottom: 4,
  },
  cuisineText: {
    fontSize: 14,
    fontFamily: 'poppins_regular',
    color: '#666',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'poppins_semibold',
    color: '#333',
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F1',
    padding: 8,
    borderRadius: 8,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'poppins_regular',
    color: '#666',
    marginHorizontal: 8,
  },
  tabNavigator: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#F0F4F8',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabIndicator: {
    backgroundColor: '#E23744',
    height: 3,
  },
  tabLabel: {
    fontFamily: 'poppins_semibold',
    textTransform: 'none',
  },
  tabContent: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  cardsContainer: {
    padding: 16,
  },
  foodCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  foodImage: {
    width: '100%',
    height: 200,
  },
  foodDetails: {
    padding: 16,
  },
  foodName: {
    fontSize: 18,
    fontFamily: 'poppins_semibold',
    color: '#333',
  },
  foodPrice: {
    fontSize: 16,
    fontFamily: 'poppins_regular',
    color: '#E23744',
    marginTop: 4,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#E23744',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'poppins_semibold',
  },
  lookCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  lookImage: {
    width: '100%',
    height: 250,
  },
  lookDescription: {
    padding: 16,
    fontSize: 16,
    fontFamily: 'poppins_semibold',
    color: '#333',
  },
});

export default RestaurantProfile;