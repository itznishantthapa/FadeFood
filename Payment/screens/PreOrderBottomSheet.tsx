"use client"

import { useState, useRef, useEffect, useContext } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Animated, ScrollView } from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"
import { scaleHeight, scaleWidth } from "../../Scaling"
import { myContext } from "../../context/AppProvider"
import { baseURL } from "../../service"

const PreOrderBottomSheet = ({ isVisible, onClose, foodItem, navigation }) => {
  // const { state } = useContext(myContext)
  const [quantity, setQuantity] = useState(1)
  const [specialInstructions, setSpecialInstructions] = useState("")
  const slideAnim = useRef(new Animated.Value(0)).current

  // Calculate prices
  const itemPrice = foodItem?.food_price || 0
  const totalPrice = itemPrice * quantity

  useEffect(() => {
    if (isVisible) {
      // Reset state when sheet opens
      setQuantity(1)
      setSpecialInstructions("")

      // Slide up animation
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      // Slide down animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [isVisible])

  // Interpolate for slide animation
  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  })

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  // Handle order confirmation
  const handleConfirmOrder = () => {
    // Close the bottom sheet
    onClose()

    // Prepare order item with all details
    const orderItem = {
      ...foodItem,
      id: foodItem?.id || `food-${Date.now()}`, // Ensure ID exists
      food_name: foodItem?.food_name || "Unknown Item", // Ensure food_name exists
      food_price: Number(foodItem?.food_price || 0), // Ensure food_price is a number
      food_restaurant: foodItem?.food_restaurant || "Unknown Restaurant", // Ensure restaurant name exists
      quantity: quantity,
      specialInstructions: specialInstructions,
      totalPrice: totalPrice,
    }

    // Navigate to checkout screen with the order item
    navigation.navigate("CheckoutScreen", {
      cartItems: [orderItem],
      singleItemOrder: true,
    })
  }

  if (!isVisible) return null

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />

      <Animated.View style={[styles.bottomSheet, { transform: [{ translateY }] }]}>
        <View style={styles.handle} />

        <ScrollView style={styles.content}>
          {/* Food Item Details */}
          <View style={styles.foodDetails}>
            <Image
              source={{ uri: `${baseURL}${foodItem?.images?.[0]?.image}` }}
              style={styles.foodImage}
              defaultSource={require("../../assets/fadefood_logo.png")}
            />

            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{foodItem?.food_name}</Text>
              <Text style={styles.restaurantName}>{foodItem?.food_restaurant}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>₹{foodItem?.food_price}</Text>
                {foodItem?.is_vegetarian && (
                  <View style={styles.vegBadge}>
                    <Ionicons name="leaf" size={12} color="#4CAF50" />
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                onPress={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Feather name="minus" size={20} color={quantity <= 1 ? "#CCCCCC" : "#333333"} />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                <Feather name="plus" size={20} color="#333333" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Special Instructions */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Special Instructions</Text>
            <TextInput
              style={styles.instructionsInput}
              placeholder="Add notes (e.g. spice level, allergies, etc.)"
              multiline
              numberOfLines={3}
              value={specialInstructions}
              onChangeText={setSpecialInstructions}
              textAlignVertical="top"
            />
          </View>

          {/* Order Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Item Price</Text>
              <Text style={styles.summaryValue}>₹{itemPrice}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Quantity</Text>
              <Text style={styles.summaryValue}>{quantity}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{totalPrice}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
            <Text style={styles.confirmButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
    paddingBottom: scaleHeight(30),
    maxHeight: "80%",
  },
  handle: {
    width: scaleWidth(40),
    height: scaleHeight(5),
    backgroundColor: "#E0E0E0",
    borderRadius: scaleHeight(2.5),
    alignSelf: "center",
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(10),
  },
  content: {
    padding: scaleWidth(16),
  },
  foodDetails: {
    flexDirection: "row",
    marginBottom: scaleHeight(20),
  },
  foodImage: {
    width: scaleWidth(100),
    height: scaleWidth(100),
    borderRadius: scaleWidth(10),
  },
  foodInfo: {
    flex: 1,
    marginLeft: scaleWidth(12),
    justifyContent: "center",
  },
  foodName: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(18),
    color: "#333333",
    marginBottom: scaleHeight(4),
  },
  restaurantName: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
    marginBottom: scaleHeight(8),
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#4CAF50",
    marginRight: scaleWidth(8),
  },
  vegBadge: {
    backgroundColor: "#E8F5E9",
    padding: scaleWidth(4),
    borderRadius: scaleWidth(4),
  },
  sectionContainer: {
    marginBottom: scaleHeight(20),
  },
  sectionTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#333333",
    marginBottom: scaleHeight(8),
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scaleWidth(8),
    padding: scaleWidth(8),
  },
  quantityButton: {
    width: scaleWidth(36),
    height: scaleWidth(36),
    borderRadius: scaleWidth(18),
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonDisabled: {
    backgroundColor: "#F0F0F0",
  },
  quantityText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(18),
    color: "#333333",
    marginHorizontal: scaleWidth(20),
  },
  instructionsInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scaleWidth(8),
    padding: scaleWidth(12),
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
    minHeight: scaleHeight(80),
  },
  summaryContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: scaleWidth(10),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(20),
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleHeight(8),
  },
  summaryLabel: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
  },
  summaryValue: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: scaleHeight(8),
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
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: scaleWidth(16),
    paddingTop: scaleHeight(16),
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: scaleWidth(8),
    paddingVertical: scaleHeight(14),
    marginRight: scaleWidth(8),
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#757575",
  },
  confirmButton: {
    flex: 2,
    backgroundColor: "#4CAF50",
    borderRadius: scaleWidth(8),
    paddingVertical: scaleHeight(14),
    alignItems: "center",
  },
  confirmButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#FFFFFF",
  },
})

export default PreOrderBottomSheet

