"use client"

import { useEffect, useRef } from "react"
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated, Easing } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { MaterialIcons } from "@expo/vector-icons"
import { scaleHeight, scaleWidth } from "../../Scaling"
import LottieView from "lottie-react-native"

const OrderConfirmation = ({ navigation, route }) => {
  const { orderId, paymentMethod, transactionId } = route.params

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  const successRef = useRef(null)

  useEffect(() => {
    // Play success animation
    if (successRef.current) {
      successRef.current.play()
    }

    // Animate content
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1)),
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

  // Track order
  const trackOrder = () => {
    // Navigate to order tracking screen
    // navigation.navigate('OrderTracking', { orderId })

    // For now, just go to home
    goToHome()
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Success Animation */}
        <View style={styles.animationContainer}>
          <LottieView
            ref={successRef}
            source={require("../../assets/animation/order-success.json")}
            style={styles.successAnimation}
            autoPlay={false}
            loop={false}
          />
        </View>

        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.successTitle}>Order Placed Successfully!</Text>
          <Text style={styles.successMessage}>Your order has been confirmed and will be delivered soon.</Text>

          <View style={styles.orderInfoContainer}>
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Order ID:</Text>
              <Text style={styles.orderInfoValue}>{orderId}</Text>
            </View>

            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Payment Method:</Text>
              <Text style={styles.orderInfoValue}>{paymentMethod}</Text>
            </View>

            {transactionId && (
              <View style={styles.orderInfoRow}>
                <Text style={styles.orderInfoLabel}>Transaction ID:</Text>
                <Text style={styles.orderInfoValue}>{transactionId}</Text>
              </View>
            )}

            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Date & Time:</Text>
              <Text style={styles.orderInfoValue}>{new Date().toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.deliveryInfoContainer}>
            <View style={styles.deliveryInfoHeader}>
              <MaterialIcons name="delivery-dining" size={24} color="#4CAF50" />
              <Text style={styles.deliveryInfoTitle}>Delivery Information</Text>
            </View>

            <Text style={styles.deliveryInfoText}>
              Your order will be delivered within 30-45 minutes. Our delivery partner will contact you when they're
              nearby.
            </Text>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.trackOrderButton} onPress={trackOrder}>
              <Text style={styles.trackOrderButtonText}>Track Order</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.homeButton} onPress={goToHome}>
              <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
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
  successAnimation: {
    width: scaleWidth(200),
    height: scaleWidth(200),
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  successTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(22),
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: scaleHeight(8),
  },
  successMessage: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#757575",
    textAlign: "center",
    marginBottom: scaleHeight(24),
  },
  orderInfoContainer: {
    width: "100%",
    backgroundColor: "#F8F9FA",
    borderRadius: scaleWidth(10),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(24),
  },
  orderInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleHeight(12),
  },
  orderInfoLabel: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
  },
  orderInfoValue: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#333333",
  },
  deliveryInfoContainer: {
    width: "100%",
    backgroundColor: "#E8F5E9",
    borderRadius: scaleWidth(10),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(24),
  },
  deliveryInfoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(12),
  },
  deliveryInfoTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#333333",
    marginLeft: scaleWidth(8),
  },
  deliveryInfoText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
  },
  actionsContainer: {
    width: "100%",
    marginTop: scaleHeight(16),
  },
  trackOrderButton: {
    backgroundColor: "#4CAF50",
    borderRadius: scaleWidth(8),
    paddingVertical: scaleHeight(14),
    alignItems: "center",
    marginBottom: scaleHeight(12),
  },
  trackOrderButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#FFFFFF",
  },
  homeButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: scaleWidth(8),
    paddingVertical: scaleHeight(14),
    alignItems: "center",
  },
  homeButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#757575",
  },
})

export default OrderConfirmation

