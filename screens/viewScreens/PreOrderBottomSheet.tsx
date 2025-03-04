import React, { useRef, useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  TextInput,
  Platform
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { scaleWidth, scaleHeight } from "../../Scaling";
import { myContext } from "../../context/AppProvider";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Image } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Time slot generation helper
const generateTimeSlots = (startHour = 8, endHour = 21) => {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    const hourString = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    
    // Create 10-minute intervals
    for (let minute = 0; minute < 60; minute += 10) {
      const startMinute = minute.toString().padStart(2, '0');
      const endMinute = (minute + 10 === 60 ? 0 : minute + 10).toString().padStart(2, '0');
      const nextHour = minute + 10 === 60 ? (hour + 1) % 24 : hour;
      const nextHourString = nextHour % 12 === 0 ? 12 : nextHour % 12;
      const nextAmpm = nextHour < 12 ? 'AM' : 'PM';
      
      slots.push({
        id: `${hour}-${minute}`,
        time: `${hourString}:${startMinute}-${nextHourString}:${endMinute} ${minute + 10 === 60 ? nextAmpm : ampm}`
      });
    }
  }
  return slots;
};

const PreOrderBottomSheet = ({ visible, onClose, foodDetails, navigation }) => {
  const { setisLoading, dispatch, setsnackBar } = useContext(myContext);
  const [step, setStep] = useState(1); // 1: Date & Time, 2: Payment
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [note, setNote] = useState("");
  
  const bottomSheetHeight = SCREEN_HEIGHT * 0.85;
  const translateY = useRef(new Animated.Value(bottomSheetHeight)).current;
  
  const timeSlots = generateTimeSlots();
  
  const paymentMethods = [
    { id: 'esewa', name: 'Esewa' },
    { id: 'khalti', name: 'Khalti' },

  ];

  useEffect(() => {
    if (visible) {
      // Reset state when opening
      setStep(1);
      setSelectedTimeSlot(null);
      setSelectedPayment(null);
      
      // Animate bottom sheet up
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    } else {
      // Animate bottom sheet down
      Animated.timing(translateY, {
        toValue: bottomSheetHeight,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: bottomSheetHeight,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const handleContinue = () => {
    if (!selectedTimeSlot) {
      // Show error message
      dispatch({ type: 'snackmessage', payload: 'Please select a time slot' });
      setsnackBar(true);
      setTimeout(() => setsnackBar(false), 3000);
      return;
    }
    setStep(2);
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handleConfirmOrder = () => {
    if (!selectedPayment) {
      // Show error message
      dispatch({ type: 'snackmessage', payload: 'Please select a payment method' });
      setsnackBar(true);
      setTimeout(() => setsnackBar(false), 3000);
      return;
    }
    
    setisLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setisLoading(false);
      handleClose();
      
      // Show success message
      dispatch({ type: 'snackmessage', payload: 'Pre-order placed successfully!' });
      setsnackBar(true);
      setTimeout(() => setsnackBar(false), 3000);
      
      // Navigate to orders or payment page based on selection
      if (selectedPayment.id === 'cash') {
        // Just confirm the order
        // navigation.navigate('Orders');
      } else {
        // Navigate to payment gateway
        // navigation.navigate('Payment', { 
        //   orderDetails: {
        //     foodDetails,
        //     date: selectedDate,
        //     timeSlot: selectedTimeSlot,
        //     paymentMethod: selectedPayment,
        //     note
        //   }
        // });
      }
    }, 1500);
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdropTouch} onPress={handleClose} />
      
      <Animated.View
        style={[
          styles.bottomSheetContainer,
          { height: bottomSheetHeight, transform: [{ translateY }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {step === 1 ? "Pre-Order Details" : "Payment Method"}
          </Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.divider} />
        
        {step === 1 ? (
          <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
            {/* Food Summary */}
            <View style={styles.foodSummary}>
              <Text style={styles.foodName}>{foodDetails?.food_name}</Text>
              <Text style={styles.foodPrice}>₹{foodDetails?.food_price}</Text>
            </View>
            
            {/* Date Selection */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Select Date</Text>
              <TouchableOpacity 
                style={styles.dateSelector}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={20} color="#4CAF50" style={styles.selectorIcon} />
                <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
                <Ionicons name="chevron-down" size={16} color="#757575" />
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>
            
            {/* Time Slot Selection */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Select Arrival Time</Text>
              <Text style={styles.sectionSubtitle}>When will you arrive at the restaurant?</Text>
              
              <View style={styles.timeSlotGrid}>
                {timeSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot.id}
                    style={[
                      styles.timeSlot,
                      selectedTimeSlot?.id === slot.id && styles.selectedTimeSlot
                    ]}
                    onPress={() => handleTimeSlotSelect(slot)}
                  >
                    <Text 
                      style={[
                        styles.timeSlotText,
                        selectedTimeSlot?.id === slot.id && styles.selectedTimeSlotText
                      ]}
                    >
                      {slot.time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Special Instructions */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Special Instructions (Optional)</Text>
              <TextInput
                style={styles.noteInput}
                placeholder="Add notes for the restaurant..."
                multiline
                numberOfLines={3}
                value={note}
                onChangeText={setNote}
                placeholderTextColor="#9E9E9E"
              />
            </View>
            
            {/* Continue Button */}
            <TouchableOpacity 
              style={styles.continueButton} 
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continue to Payment</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
            {/* Order Summary */}
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Food</Text>
                <Text style={styles.summaryValue}>{foodDetails?.food_name}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Date</Text>
                <Text style={styles.summaryValue}>{formatDate(selectedDate)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Time</Text>
                <Text style={styles.summaryValue}>{selectedTimeSlot?.time}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Restaurant</Text>
                <Text style={styles.summaryValue}>{foodDetails?.food_restaurant}</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total</Text>
                <Text style={styles.totalPrice}>₹{foodDetails?.food_price}</Text>
              </View>
            </View>
            
            {/* Payment Methods */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Select Payment Method</Text>
              
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethod,
                    selectedPayment?.id === method.id && styles.selectedPaymentMethod
                  ]}
                  onPress={() => handlePaymentSelect(method)}
                >
                  <View style={styles.paymentIconContainer}>
                    {method.id === 'esewa' ? ( //24
                      <View>
                        <Image style={{height:24,width:24}} source={require('../../assets/esewa.png')} />
                      </View>
                    ) : (
                        <View>
                             <Image style={{height:24,width:24}} source={require('../../assets/khalti.png')} />
                        </View>
                    )}
                  </View>
                  <Text style={styles.paymentMethodText}>{method.name}</Text>
                  <View style={styles.radioButton}>
                    {selectedPayment?.id === method.id && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Back and Confirm Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => setStep(1)}
              >
                <Ionicons name="arrow-back" size={20} color="#4CAF50" />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={handleConfirmOrder}
              >
                <Text style={styles.confirmButtonText}>Confirm Pre-Order</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1000,
  },
  backdropTouch: {
    flex: 1,
  },
  bottomSheetContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
    paddingTop: scaleHeight(16),
    paddingBottom: scaleHeight(30),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    zIndex: 1001,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scaleWidth(20),
    marginBottom: scaleHeight(10),
  },
  title: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(18),
    color: "#2E2E2E",
  },
  closeButton: {
    padding: scaleWidth(5),
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: scaleHeight(10),
  },
  contentContainer: {
    paddingHorizontal: scaleWidth(20),
  },
  foodSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scaleHeight(15),
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  foodName: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#2E2E2E",
    flex: 1,
  },
  foodPrice: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(18),
    color: "#4CAF50",
  },
  sectionContainer: {
    marginTop: scaleHeight(20),
  },
  sectionTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#2E2E2E",
    marginBottom: scaleHeight(8),
  },
  sectionSubtitle: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
    marginBottom: scaleHeight(12),
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scaleWidth(8),
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(12),
    backgroundColor: "#F9F9F9",
  },
  selectorIcon: {
    marginRight: scaleWidth(10),
  },
  dateText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#2E2E2E",
    flex: 1,
  },
  timeSlotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: scaleHeight(10),
  },
  timeSlot: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scaleWidth(8),
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(8),
    margin: scaleWidth(5),
    backgroundColor: "#F9F9F9",
  },
  selectedTimeSlot: {
    borderColor: "#4CAF50",
    backgroundColor: "#E8F5E9",
  },
  timeSlotText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#2E2E2E",
  },
  selectedTimeSlotText: {
    color: "#4CAF50",
    fontFamily: "poppins_semibold",
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scaleWidth(8),
    padding: scaleWidth(15),
    fontSize: scaleWidth(14),
    fontFamily: "poppins_regular",
    color: "#2E2E2E",
    backgroundColor: "#F9F9F9",
    textAlignVertical: "top",
    minHeight: scaleHeight(100),
  },
  continueButton: {
    backgroundColor: "#4CAF50",
    borderRadius: scaleWidth(10),
    paddingVertical: scaleHeight(15),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaleHeight(30),
    marginBottom: scaleHeight(20),
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    marginRight: scaleWidth(8),
  },
  summaryContainer: {
    backgroundColor: "#F9F9F9",
    borderRadius: scaleWidth(12),
    padding: scaleWidth(15),
    marginVertical: scaleHeight(10),
  },
  summaryTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#2E2E2E",
    marginBottom: scaleHeight(15),
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleHeight(10),
  },
  summaryLabel: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
  },
  summaryValue: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#2E2E2E",
  },
  totalPrice: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(18),
    color: "#4CAF50",
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scaleWidth(12),
    padding: scaleWidth(15),
    marginVertical: scaleHeight(8),
    backgroundColor: "#FFFFFF",
  },
  selectedPaymentMethod: {
    borderColor: "#4CAF50",
    backgroundColor: "#E8F5E9",
  },
  paymentIconContainer: {
    width: scaleWidth(40),
    alignItems: "center",
  },
  paymentMethodText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#2E2E2E",
    flex: 1,
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
    width: scaleWidth(10),
    height: scaleWidth(10),
    borderRadius: scaleWidth(5),
    backgroundColor: "#4CAF50",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(20),
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4F8",
    borderRadius: scaleWidth(10),
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(20),
    flex: 1,
    marginRight: scaleWidth(10),
    justifyContent: "center",
  },
  backButtonText: {
    color: "#4CAF50",
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    marginLeft: scaleWidth(5),
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    borderRadius: scaleWidth(10),
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(20),
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
  },
});

export default PreOrderBottomSheet;