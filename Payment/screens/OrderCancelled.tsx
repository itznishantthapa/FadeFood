"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons"
import { scaleHeight, scaleWidth } from "../../Scaling"
import LottieView from "lottie-react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const { width } = Dimensions.get("window")

const OrderCancelled = ({ navigation, route }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const cancelRef = useRef(null)

  // Get order details from route params if available
  const orderId = route.params?.orderId || "Unknown"
  const paymentMethod = route.params?.paymentMethod || "eSewa"
  const cancelReason = route.params?.reason || "Payment was cancelled"

  useEffect(() => {
    // Play cancel animation
    if (cancelRef.current) {
      cancelRef.current.play()
    }

    // Animate content
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  // Go to home screen
  const goToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    })
  }

  // Try again - go back to checkout
  const tryAgain = () => {
    navigation.navigate("CheckoutScreen")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={goToHome}>
          <Ionicons name="close" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Cancelled</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Cancel Animation */}
        <View style={styles.animationContainer}>
          <LottieView
            ref={cancelRef}
            source={require("../../assets/animation/order-cancelled.json")}
            style={styles.cancelAnimation}
            autoPlay={false}
            loop={false}
          />
        </View>

        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.cancelTitle}>Payment Cancelled</Text>
          <Text style={styles.cancelMessage}>Your order has been cancelled and no payment has been processed.</Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Order ID:</Text>
              <Text style={styles.infoValue}>{orderId}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Payment Method:</Text>
              <Text style={styles.infoValue}>{paymentMethod}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status:</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Cancelled</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Reason:</Text>
              <Text style={styles.infoValue}>{cancelReason}</Text>
            </View>
          </View>

          <View style={styles.messageContainer}>
            <MaterialIcons name="info-outline" size={24} color="#757575" />
            <Text style={styles.messageText}>
              You can try again or continue shopping. If you have any questions, please contact our support team.
            </Text>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.tryAgainButton} onPress={tryAgain}>
              <Feather name="refresh-cw" size={20} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.tryAgainButtonText}>Try Again</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.homeButton} onPress={goToHome}>
              <Feather name="home" size={20} color="#757575" style={styles.buttonIcon} />
              <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.supportButton} onPress={() => {}}>
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  closeButton: {
    padding: scaleWidth(8),
  },
  headerTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(18),
    color: "#333333",
  },
  placeholder: {
    width: scaleWidth(40),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: scaleWidth(16),
  },
  animationContainer: {
    alignItems: "center",
    marginVertical: scaleHeight(20),
  },
  cancelAnimation: {
    width: scaleWidth(200),
    height: scaleWidth(200),
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  cancelTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(22),
    color: "#F44336",
    textAlign: "center",
    marginBottom: scaleHeight(8),
  },
  cancelMessage: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#757575",
    textAlign: "center",
    marginBottom: scaleHeight(24),
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#F8F9FA",
    borderRadius: scaleWidth(10),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(24),
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleHeight(12),
  },
  infoLabel: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
  },
  infoValue: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#333333",
    maxWidth: "60%",
    textAlign: "right",
  },
  statusBadge: {
    backgroundColor: "#FFEBEE",
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(20),
  },
  statusText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(12),
    color: "#F44336",
  },
  messageContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: scaleWidth(10),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(24),
    alignItems: "flex-start",
  },
  messageText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
    marginLeft: scaleWidth(12),
    flex: 1,
  },
  actionsContainer: {
    width: "100%",
    marginTop: scaleHeight(8),
  },
  tryAgainButton: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    borderRadius: scaleWidth(8),
    paddingVertical: scaleHeight(14),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scaleHeight(12),
  },
  buttonIcon: {
    marginRight: scaleWidth(8),
  },
  tryAgainButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#FFFFFF",
  },
  homeButton: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: scaleWidth(8),
    paddingVertical: scaleHeight(14),
    alignItems: "center",
    justifyContent: "center",
  },
  homeButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#757575",
  },
  supportButton: {
    marginTop: scaleHeight(16),
    paddingVertical: scaleHeight(8),
  },
  supportButtonText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#2196F3",
    textDecorationLine: "underline",
  },
})

export default OrderCancelled

