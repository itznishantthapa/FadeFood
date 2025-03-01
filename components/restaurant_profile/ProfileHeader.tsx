"use client"

import { useContext } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, Switch } from "react-native"
import { AntDesign, Ionicons, FontAwesome5, Feather } from "@expo/vector-icons"
import { myContext } from "../../context/AppProvider"
import { SkeletonCircle } from "../../screens/viewScreens/SkeletonPaper"
import { scaleHeight, scaleWidth } from "../../Scaling"
import { baseURL } from "../../service"
import { LinearGradient } from "expo-linear-gradient"

const ProfileHeader = ({
  handleGoBack,
  logo,
  openMaps,
  restaurantName,
  openingHour,
  rating,
  cityName,
  streetAddress,
  activeStatus,
  businessType,
  navigation,
}) => {
  const { state, seller_state, seller_dispatch } = useContext(myContext)

  const handleToggleStatus = async () => {
    // Toggle restaurant active status
    const newStatus = !activeStatus
    seller_dispatch({ type: "SET_DATA", key: "is_active", payload: newStatus })

    // Here you would typically make an API call to update the status
    // For example: await update_data('update_restaurant_status', { is_active: newStatus });
  }

  const handleAddFood = () => {
    navigation.navigate("AddFood")
  }

  const handleViewOrders = () => {
    // Navigate to orders screen
    // navigation.navigate('Orders');
  }

  const handleViewAnalytics = () => {
    // Navigate to analytics screen
    // navigation.navigate('Analytics');
  }

  const handleViewSettings = () => {
    navigation.navigate("SellerSetting")
  }

  // Mock data for dashboard metrics
  const metrics = {
    ordersToday: 12,
    revenue: 3250,
    pendingOrders: 3,
    averageRating: rating || 4.5,
  }

  return (
    <View style={styles.dashboardContainer}>
      {/* Header with logo and status toggle */}
      <LinearGradient
        colors={["#333333", "#4A4A4A"]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.logoAndNameContainer}>
            {logo ? (
              <Image source={{ uri: `${baseURL}${logo}` }} style={styles.restaurantLogo} />
            ) : (
              <SkeletonCircle SkeletonHeight={60} SkeletonWidth={60} style={styles.restaurantLogo} />
            )}

            <View style={styles.nameContainer}>
              {restaurantName ? (
                <Text style={styles.restaurantName}>{restaurantName}</Text>
              ) : (
                <Text style={styles.restaurantName}>Your Restaurant</Text>
              )}

              {businessType ? (
                <Text style={styles.businessType}>{businessType}</Text>
              ) : (
                <Text style={styles.businessType}>Restaurant</Text>
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.settingsButton} onPress={handleViewSettings}>
            <Ionicons name="settings-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.statusToggleContainer}>
          <Text style={styles.statusLabel}>Restaurant Status:</Text>
          <View style={styles.statusToggle}>
            <Text style={[styles.statusText, { color: activeStatus ? "#4CAF50" : "#FF6B6B" }]}>
              {activeStatus ? "Open" : "Closed"}
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#A5D6A7" }}
              thumbColor={activeStatus ? "#4CAF50" : "#F4F3F4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleToggleStatus}
              value={activeStatus}
            />
          </View>
        </View>
      </LinearGradient>

      {/* Dashboard metrics */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{metrics.ordersToday}</Text>
          <Text style={styles.metricLabel}>Today's Orders</Text>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>₹{metrics.revenue}</Text>
          <Text style={styles.metricLabel}>Today's Revenue</Text>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{metrics.pendingOrders}</Text>
          <Text style={styles.metricLabel}>Pending Orders</Text>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricCard}>
          <View style={styles.ratingContainer}>
            <Text style={styles.metricValue}>{metrics.averageRating}</Text>
            <AntDesign name="star" size={16} color="#FFD700" style={styles.starIcon} />
          </View>
          <Text style={styles.metricLabel}>Rating</Text>
        </View>
      </View>

      {/* Quick actions */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleAddFood}>
          <View style={[styles.actionIconContainer, { backgroundColor: "#4CAF50" }]}>
            <Feather name="plus" size={24} color="#FFF" />
          </View>
          <Text style={styles.actionText}>Add Food</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleViewOrders}>
          <View style={[styles.actionIconContainer, { backgroundColor: "#2196F3" }]}>
            <FontAwesome5 name="clipboard-list" size={20} color="#FFF" />
          </View>
          <Text style={styles.actionText}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleViewAnalytics}>
          <View style={[styles.actionIconContainer, { backgroundColor: "#FF9800" }]}>
            <Ionicons name="analytics-outline" size={22} color="#FFF" />
          </View>
          <Text style={styles.actionText}>Analytics</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={openMaps}>
          <View style={[styles.actionIconContainer, { backgroundColor: "#E91E63" }]}>
            <Ionicons name="location-outline" size={22} color="#FFF" />
          </View>
          <Text style={styles.actionText}>Location</Text>
        </TouchableOpacity>
      </View>

      {/* Address and hours */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color="#333333" />
          <Text style={styles.infoText}>{streetAddress ? `${streetAddress}, ${cityName}` : "Set your address"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#333333" />
          <Text style={styles.infoText}>{openingHour || "Set your opening hours"}</Text>
        </View>
      </View>

      {/* Pending orders preview */}
      <View style={styles.pendingOrdersContainer}>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionHeader}>Pending Orders</Text>
          <TouchableOpacity onPress={handleViewOrders}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {metrics.pendingOrders > 0 ? (
          <View style={styles.orderPreviewContainer}>
            <View style={styles.orderPreview}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>Order #1234</Text>
                <Text style={styles.orderItems}>2× Momo, 1× Chowmein</Text>
              </View>
              <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>

            {metrics.pendingOrders > 1 && (
              <View style={styles.orderPreview}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderNumber}>Order #1235</Text>
                  <Text style={styles.orderItems}>1× Burger, 1× Fries</Text>
                </View>
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </TouchableOpacity>
              </View>
            )}

            {metrics.pendingOrders > 2 && (
              <TouchableOpacity style={styles.moreOrdersButton} onPress={handleViewOrders}>
                <Text style={styles.moreOrdersText}>+{metrics.pendingOrders - 2} more orders</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.noOrdersContainer}>
            <Text style={styles.noOrdersText}>No pending orders</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  dashboardContainer: {
    backgroundColor: "#F0F4F8",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerGradient: {
    padding: scaleWidth(16),
    borderBottomLeftRadius: scaleWidth(20),
    borderBottomRightRadius: scaleWidth(20),
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoAndNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantLogo: {
    width: scaleWidth(60),
    height: scaleWidth(60),
    borderRadius: scaleWidth(30),
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  nameContainer: {
    marginLeft: scaleWidth(12),
  },
  restaurantName: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(18),
    color: "#FFFFFF",
  },
  businessType: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#E0E0E0",
  },
  settingsButton: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(20),
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  statusToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scaleHeight(16),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: scaleWidth(10),
    borderRadius: scaleWidth(8),
  },
  statusLabel: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#FFFFFF",
  },
  statusToggle: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    marginRight: scaleWidth(8),
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(10),
    margin: scaleWidth(16),
    marginTop: scaleHeight(-20),
    padding: scaleWidth(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  metricCard: {
    alignItems: "center",
    flex: 1,
  },
  metricValue: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#333333",
  },
  metricLabel: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#757575",
    textAlign: "center",
  },
  metricDivider: {
    width: 1,
    height: "80%",
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    marginLeft: scaleWidth(2),
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(16),
  },
  actionButton: {
    alignItems: "center",
    width: "22%",
  },
  actionIconContainer: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    borderRadius: scaleWidth(25),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scaleHeight(4),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 3,
  },
  actionText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#333333",
    textAlign: "center",
  },
  infoContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(10),
    margin: scaleWidth(16),
    marginTop: 0,
    marginBottom: scaleHeight(8),
    padding: scaleWidth(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.84,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(8),
  },
  infoText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
    marginLeft: scaleWidth(8),
    flex: 1,
  },
  pendingOrdersContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(10),
    margin: scaleWidth(16),
    marginTop: 0,
    padding: scaleWidth(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.84,
    elevation: 2,
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleHeight(12),
  },
  sectionHeader: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#333333",
  },
  viewAllText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#4CAF50",
  },
  orderPreviewContainer: {
    gap: scaleHeight(12),
  },
  orderPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: scaleWidth(12),
    borderRadius: scaleWidth(8),
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#333333",
  },
  orderItems: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#757575",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(6),
    borderRadius: scaleWidth(20),
  },
  acceptButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(12),
    color: "#FFFFFF",
  },
  moreOrdersButton: {
    alignItems: "center",
    padding: scaleWidth(8),
  },
  moreOrdersText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#2196F3",
  },
  noOrdersContainer: {
    padding: scaleWidth(16),
    alignItems: "center",
  },
  noOrdersText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
    fontStyle: "italic",
  },
})

export default ProfileHeader

