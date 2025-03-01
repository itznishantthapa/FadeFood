"use client"

import { useContext, useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from "react-native"
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons"
import { scaleWidth, scaleHeight } from "../../Scaling"
import { myContext } from "../../context/AppProvider"
import { LinearGradient } from "expo-linear-gradient"

const CustomerProfile = ({ navigation }) => {
  const { state } = useContext(myContext)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  // Placeholder data - replace with actual data from your state or API
  const customerInfo = {
    name: state.name || "John Doe",
    email: state.email || "john.doe@example.com",
    phone: state.phone || "+91 98765 43210",
    address: state.address || "123 Main St, City, State, 12345",
    profilePic: state.profilePic || "https://via.placeholder.com/150",
  }

  const orderHistory = [
    { id: "1", restaurant: "Tasty Bites", date: "2023-05-15", total: 450 },
    { id: "2", restaurant: "Spice Garden", date: "2023-05-10", total: 380 },
    { id: "3", restaurant: "Pizza Paradise", date: "2023-05-05", total: 520 },
  ]

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    // navigation.navigate('EditProfile');
  }

  const handleViewAllOrders = () => {
    // Navigate to all orders screen
    // navigation.navigate('AllOrders');
  }

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
  }

  const renderOrderItem = (order) => (
    <TouchableOpacity key={order.id} style={styles.orderItem}>
      <View style={styles.orderInfo}>
        <Text style={styles.orderRestaurant}>{order.restaurant}</Text>
        <Text style={styles.orderDate}>{order.date}</Text>
      </View>
      <Text style={styles.orderTotal}>₹{order.total}</Text>
    </TouchableOpacity>
  )

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#4CAF50", "#45a049"]} style={styles.header}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: customerInfo.profilePic }} style={styles.profilePic} />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{customerInfo.name}</Text>
            <Text style={styles.email}>{customerInfo.email}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Feather name="edit-2" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={24} color="#4CAF50" style={styles.infoIcon} />
          <Text style={styles.infoText}>{customerInfo.phone}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={24} color="#4CAF50" style={styles.infoIcon} />
          <Text style={styles.infoText}>{customerInfo.address}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity onPress={handleViewAllOrders}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {orderHistory.map(renderOrderItem)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingItem}>
          <MaterialIcons name="notifications" size={24} color="#4CAF50" style={styles.settingIcon} />
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#a5d6a7" }}
            thumbColor={notificationsEnabled ? "#4CAF50" : "#f4f3f4"}
            onValueChange={toggleNotifications}
            value={notificationsEnabled}
          />
        </View>
        <TouchableOpacity style={styles.settingItem}>
          <FontAwesome5 name="user-shield" size={24} color="#4CAF50" style={styles.settingIcon} />
          <Text style={styles.settingText}>Privacy Settings</Text>
          <MaterialIcons name="chevron-right" size={24} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="help-outline" size={24} color="#4CAF50" style={styles.settingIcon} />
          <Text style={styles.settingText}>Help & Support</Text>
          <MaterialIcons name="chevron-right" size={24} color="#757575" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  header: {
    padding: scaleWidth(20),
    paddingBottom: scaleHeight(30),
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: scaleWidth(80),
    height: scaleWidth(80),
    borderRadius: scaleWidth(40),
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  nameContainer: {
    marginLeft: scaleWidth(20),
  },
  name: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(20),
    color: "#FFFFFF",
  },
  email: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#E0E0E0",
  },
  editButton: {
    position: "absolute",
    top: scaleHeight(20),
    right: scaleWidth(20),
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: scaleWidth(20),
    padding: scaleWidth(8),
  },
  infoSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(10),
    margin: scaleWidth(20),
    marginTop: scaleHeight(-20),
    padding: scaleWidth(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(10),
  },
  infoIcon: {
    marginRight: scaleWidth(10),
  },
  infoText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
    flex: 1,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(10),
    margin: scaleWidth(20),
    marginTop: 0,
    padding: scaleWidth(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleHeight(10),
  },
  sectionTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(18),
    color: "#333333",
  },
  viewAllText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#4CAF50",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scaleHeight(10),
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  orderInfo: {
    flex: 1,
  },
  orderRestaurant: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#333333",
  },
  orderDate: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#757575",
  },
  orderTotal: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#4CAF50",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scaleHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  settingIcon: {
    marginRight: scaleWidth(15),
  },
  settingText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#333333",
    flex: 1,
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: scaleWidth(10),
    margin: scaleWidth(20),
    marginTop: 0,
    padding: scaleHeight(15),
    alignItems: "center",
  },
  logoutText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#FFFFFF",
  },
})

export default CustomerProfile

