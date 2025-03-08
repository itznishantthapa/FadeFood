"use client"

import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform } from "react-native"
import { useCallback, useContext } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import ProfileHeader from "../components/restaurant_profile/ProfileHeader"
import { myContext } from "../context/AppProvider"
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons"
import { scaleHeight, scaleWidth } from "../Scaling"
import { useFocusEffect } from "@react-navigation/native"

const Menu = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor('#333333');
      StatusBar.setBarStyle('light-content');

      return () => {
        StatusBar.setBackgroundColor('#ffffff'); 
        StatusBar.setBarStyle('dark-content');
      };
    }, [])
  );
  const { seller_state, food_state } = useContext(myContext)

  const openMaps = () => {
    const latitude = "26.8217"
    const longitude = "87.2863"
    const label = "Delicious Restaurant"

    const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" })
    const latLng = `${latitude},${longitude}`
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    })

    Linking.openURL(url)
  }

  const handleManageMenu = () => {
    navigation.navigate("DishManagement")
  }

  const handleViewOrders = () => {
    // Navigate to orders screen
    // navigation.navigate('Orders');
  }

  const handleViewReviews = () => {
    // Navigate to reviews screen
    // navigation.navigate('Reviews');
  }

  // Get top selling items (example logic)
  const topSellingItems = food_state.sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0)).slice(0, 3)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} backgroundColor="#333333" barStyle="light-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <ProfileHeader
        handleGoBack={undefined}
        openMaps={openMaps}
        restaurantName={seller_state.name}
        openingHour={seller_state.opening_hour}
        rating={seller_state.rating}
        cityName={seller_state.city}
        streetAddress={seller_state.street_address}
        activeStatus={seller_state.is_active}
        businessType={seller_state.business_type}
        logo={seller_state.logo}
        navigation={navigation}
      />

     
        {/* Menu Management Card */}
        <TouchableOpacity style={styles.actionCard} onPress={handleManageMenu}>
          <View style={styles.actionCardContent}>
            <View style={styles.actionCardIconContainer}>
              <MaterialIcons name="restaurant-menu" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.actionCardTextContainer}>
              <Text style={styles.actionCardTitle}>Manage Menu</Text>
              <Text style={styles.actionCardDescription}>Add, edit or remove menu items</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#757575" />
        </TouchableOpacity>

        {/* Top Selling Items Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Selling Items</Text>
            <TouchableOpacity onPress={handleManageMenu}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {topSellingItems.length > 0 ? (
            topSellingItems.map((item, index) => (
              <View key={index} style={styles.topSellingItem}>
                <View style={styles.topSellingRank}>
                  <Text style={styles.rankText}>{index + 1}</Text>
                </View>
                <View style={styles.topSellingInfo}>
                  <Text style={styles.topSellingName}>{item.name}</Text>
                  <Text style={styles.topSellingPrice}>₹{item.price?.toFixed(2)}</Text>
                </View>
                <View style={styles.topSellingStats}>
                  <Text style={styles.topSellingCount}>
                    {item.orderCount || Math.floor(Math.random() * 100) + 20} orders
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No sales data available yet</Text>
            </View>
          )}
        </View>

        {/* Recent Reviews Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Reviews</Text>
            <TouchableOpacity onPress={handleViewReviews}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Example review - replace with actual data */}
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Rahul S.</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons key={star} name={star <= 4 ? "star" : "star-outline"} size={16} color="#FFD700" />
                ))}
              </View>
            </View>
            <Text style={styles.reviewText}>The food was delicious and delivery was quick. Will order again!</Text>
            <Text style={styles.reviewDate}>2 days ago</Text>
          </View>

          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Priya M.</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons key={star} name={star <= 5 ? "star" : "star-outline"} size={16} color="#FFD700" />
                ))}
              </View>
            </View>
            <Text style={styles.reviewText}>Amazing food quality and packaging. The momo was especially good!</Text>
            <Text style={styles.reviewDate}>1 week ago</Text>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickActionButton} onPress={handleViewOrders}>
            <View style={[styles.quickActionIcon, { backgroundColor: "#2196F3" }]}>
              <FontAwesome5 name="clipboard-list" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.quickActionText}>Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionButton} onPress={handleViewReviews}>
            <View style={[styles.quickActionIcon, { backgroundColor: "#FF9800" }]}>
              <MaterialIcons name="rate-review" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.quickActionText}>Reviews</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate("SellerSetting")}>
            <View style={[styles.quickActionIcon, { backgroundColor: "#9C27B0" }]}>
              <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.quickActionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
    marginTop: scaleHeight(-8),
    marginBottom: scaleHeight(52),
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(10),
    margin: scaleWidth(16),
    padding: scaleWidth(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionCardIconContainer: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(20),
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scaleWidth(12),
  },
  actionCardTextContainer: {
    flex: 1,
  },
  actionCardTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#333333",
  },
  actionCardDescription: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#757575",
  },
  sectionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(10),
    margin: scaleWidth(16),
    marginTop: 0,
    padding: scaleWidth(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleHeight(12),
  },
  sectionTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#333333",
  },
  viewAllText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#4CAF50",
  },
  topSellingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scaleHeight(8),
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  topSellingRank: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    borderRadius: scaleWidth(12),
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scaleWidth(12),
  },
  rankText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(12),
    color: "#FFFFFF",
  },
  topSellingInfo: {
    flex: 1,
  },
  topSellingName: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#333333",
  },
  topSellingPrice: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#4CAF50",
  },
  topSellingStats: {
    backgroundColor: "#F0F4F8",
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(4),
  },
  topSellingCount: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#757575",
  },
  emptyStateContainer: {
    padding: scaleHeight(20),
    alignItems: "center",
  },
  emptyStateText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#9E9E9E",
    fontStyle: "italic",
  },
  reviewCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: scaleWidth(8),
    padding: scaleWidth(12),
    marginBottom: scaleHeight(8),
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleHeight(8),
  },
  reviewerName: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#333333",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  reviewText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
    marginBottom: scaleHeight(8),
  },
  reviewDate: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#9E9E9E",
    textAlign: "right",
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(10),
    margin: scaleWidth(16),
    marginTop: 0,
    padding: scaleWidth(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: scaleHeight(20),
  },
  quickActionButton: {
    alignItems: "center",
  },
  quickActionIcon: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(20),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scaleHeight(8),
  },
  quickActionText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#333333",
  },
})

export default Menu

