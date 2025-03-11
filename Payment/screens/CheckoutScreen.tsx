"use client"

import { useContext, useState } from "react"
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"
import { myContext } from "../../context/AppProvider"
import { scaleHeight, scaleWidth } from "../../Scaling"
// import { prepareEsewaPayment } from "../../api/esewaApi"
import { baseURL } from "../../service"

const CheckoutScreen = ({ navigation, route }) => {
  const { state } = useContext(myContext)
  const [loading, setLoading] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("esewa")

  // Get order item from route params
  const cartItems = route.params?.cartItems || []
  const singleItemOrder = route.params?.singleItemOrder || false

  // Get the single order item if it's a single item order
  const orderItem = singleItemOrder && cartItems.length > 0 ? cartItems[0] : null

  // Calculate order totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.food_price * (item.quantity || 1), 0)
  const deliveryFee = 50
  const taxAmount = subtotal * 0.13 // 13% tax
  const totalAmount = subtotal + deliveryFee + taxAmount

  // Handle payment with eSewa
  const handleEsewaPayment = async () => {
    setLoading(true)

    try {
      // Ensure cart items have all required fields and proper data types
      const validatedCartItems = cartItems.map(item => ({
        id: item.id || `item-${Date.now()}`,
        food_name: item.food_name || "Unknown Item",
        food_price: Number(item.food_price || 0),
        food_restaurant: item.food_restaurant || "Unknown Restaurant",
        quantity: Number(item.quantity || 1),
        specialInstructions: item.specialInstructions || "",
        totalPrice: Number(item.totalPrice || (item.food_price * (item.quantity || 1)))
      }));

      // Calculate order totals with validated data
      const validatedSubtotal = validatedCartItems.reduce((sum, item) => sum + (item.food_price * item.quantity), 0);
      const validatedTaxAmount = validatedSubtotal * 0.13;
      const validatedTotalAmount = validatedSubtotal + deliveryFee + validatedTaxAmount;

      setLoading(false)

      // Navigate to EsewaWebView with the form data
      navigation.navigate("EsewaWebView", {
        cartItems: validatedCartItems,
        subtotal: validatedSubtotal,
        taxAmount: validatedTaxAmount,
        totalAmount: validatedTotalAmount,
        deliveryFee: deliveryFee
      })
    } catch (error) {
      setLoading(false)
      Alert.alert("Error", "Something went wrong. Please try again.")
      console.error("Payment preparation error:", error)
    }
  }

  // Handle cash on delivery
  const handleCashOnDelivery = () => {
    // Logic for cash on delivery
    Alert.alert("Confirm Order", "Do you want to place this order with Cash on Delivery?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          // Process COD order
          // Navigate to order confirmation
          navigation.navigate("OrderConfirmation", {
            orderId: `ORDER${Date.now()}`,
            paymentMethod: "Cash on Delivery",
          })
        },
      },
    ])
  }

  // Handle payment method selection
  const handlePayment = () => {
    if (selectedPaymentMethod === "esewa") {
      handleEsewaPayment()
    } else if (selectedPaymentMethod === "cod") {
      handleCashOnDelivery()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.addressContainer}>
            <View style={styles.addressIconContainer}>
              <Ionicons name="location" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.addressDetails}>
              <Text style={styles.addressType}>Home</Text>
              <Text style={styles.addressText}>{state.address || "123 Main Street, City Center, State 12345"}</Text>
              <Text style={styles.phoneNumber}>{state.phone || "+91 98765 43210"}</Text>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          {cartItems.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.itemQuantity}>
                <Text style={styles.quantityText}>{item.quantity || 1}x</Text>
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.food_name}</Text>
                <Text style={styles.restaurantName}>{item.food_restaurant}</Text>
                {item.specialInstructions && (
                  <Text style={styles.specialInstructions}>Note: {item.specialInstructions}</Text>
                )}
              </View>
              <Text style={styles.itemPrice}>₹{(item.food_price * (item.quantity || 1)).toFixed(2)}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.costBreakdown}>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Subtotal</Text>
              <Text style={styles.costValue}>₹{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Delivery Fee</Text>
              <Text style={styles.costValue}>₹{deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Tax (13%)</Text>
              <Text style={styles.costValue}>₹{taxAmount.toFixed(2)}</Text>
            </View>
            <View style={[styles.costRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{totalAmount.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <TouchableOpacity
            style={[styles.paymentOption, selectedPaymentMethod === "esewa" && styles.selectedPaymentOption]}
            onPress={() => setSelectedPaymentMethod("esewa")}
          >
            <View style={styles.paymentOptionContent}>
              <Image
                source={require("../../assets/esewa.png")}
                style={styles.paymentLogo}
                defaultSource={require("../../assets/esewa.png")}
              />
              <Text style={styles.paymentName}>eSewa</Text>
            </View>
            <View style={styles.radioButton}>
              {selectedPaymentMethod === "esewa" && <View style={styles.radioButtonInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.paymentOption, selectedPaymentMethod === "cod" && styles.selectedPaymentOption]}
            onPress={() => setSelectedPaymentMethod("cod")}
          >
            <View style={styles.paymentOptionContent}>
              <FontAwesome5 name="money-bill-wave" size={24} color="#4CAF50" />
              <Text style={styles.paymentName}>Cash on Delivery</Text>
            </View>
            <View style={styles.radioButton}>
              {selectedPaymentMethod === "cod" && <View style={styles.radioButtonInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Payment Button */}
      <View style={styles.paymentButtonContainer}>
        <TouchableOpacity style={styles.paymentButton} onPress={handlePayment} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.paymentButtonText}>
              {selectedPaymentMethod === "esewa" ? "Pay with eSewa" : "Place Order"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(12),
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
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
  sectionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(10),
    margin: scaleWidth(16),
    marginBottom: 0,
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
  editButton: {
    padding: scaleWidth(4),
  },
  editButtonText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#4CAF50",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  addressIconContainer: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(20),
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scaleWidth(12),
  },
  addressDetails: {
    flex: 1,
  },
  addressType: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#333333",
    marginBottom: scaleHeight(4),
  },
  addressText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
    marginBottom: scaleHeight(4),
  },
  phoneNumber: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: scaleHeight(12),
    paddingBottom: scaleHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  itemQuantity: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    borderRadius: scaleWidth(15),
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scaleWidth(12),
    marginTop: scaleHeight(2),
  },
  quantityText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(12),
    color: "#4CAF50",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#333333",
  },
  restaurantName: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#757575",
    marginBottom: scaleHeight(4),
  },
  specialInstructions: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#9E9E9E",
    fontStyle: "italic",
  },
  itemPrice: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#333333",
    marginLeft: scaleWidth(8),
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: scaleHeight(12),
  },
  costBreakdown: {
    marginTop: scaleHeight(8),
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleHeight(8),
  },
  costLabel: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
  },
  costValue: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
  },
  totalRow: {
    marginTop: scaleHeight(8),
    paddingTop: scaleHeight(8),
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  totalLabel: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#333333",
  },
  totalValue: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#4CAF50",
  },
  paymentOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scaleWidth(12),
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scaleWidth(8),
    marginBottom: scaleHeight(12),
  },
  selectedPaymentOption: {
    borderColor: "#4CAF50",
    backgroundColor: "#F1F8E9",
  },
  paymentOptionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentLogo: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    resizeMode: "contain",
  },
  paymentName: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
    marginLeft: scaleWidth(8),
  },
  radioButton: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderRadius: scaleWidth(10),
    borderWidth: 2,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonInner: {
    width: scaleWidth(12),
    height: scaleWidth(12),
    borderRadius: scaleWidth(6),
    backgroundColor: "#4CAF50",
  },
  bottomSpacing: {
    height: scaleHeight(80),
  },
  paymentButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    padding: scaleWidth(16),
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  paymentButton: {
    backgroundColor: "#4CAF50",
    borderRadius: scaleWidth(8),
    paddingVertical: scaleHeight(14),
    alignItems: "center",
  },
  paymentButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#FFFFFF",
  },
})

export default CheckoutScreen

