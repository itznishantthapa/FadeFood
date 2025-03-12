import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { createEsewaPaymentForm, generateTransactionUuid, PRODUCT_CODE } from '../services/eSewaService';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { scaleHeight } from '../../Scaling';

const EsewaWebView = ({ route, navigation }) => {
  const { cartItems, totalAmount, taxAmount, subtotal } = route.params;
  const [loading, setLoading] = useState(true);
  const [paymentHtml, setPaymentHtml] = useState('');
  const [transactionUuid, setTransactionUuid] = useState('');
  const hasNavigated = useRef(false);

  console.log('this is the cart items in EsewaWebView----------------->', cartItems[0].food_name);

  const orderedItems = {
    name: cartItems[0].food_name,
    price: cartItems[0].food_price,
    quantity: cartItems[0].quantity,
    totalPrice: cartItems[0].totalPrice,
    instructions: cartItems[0].specialInstructions
  };
  console.log('this is the ordered items in EsewaWebView----------------->', orderedItems);

  useEffect(() => {
    // Generate a unique transaction ID
    const uuid = generateTransactionUuid();
    setTransactionUuid(uuid);

    // Create the payment form HTML
    const paymentDetails = {
      amount: subtotal.toString(),
      taxAmount: taxAmount.toString(),
      totalAmount: totalAmount.toString(),
      transactionUuid: uuid,
      productServiceCharge: '0',
      productDeliveryCharge: '50',
      // Use absolute URLs for success and failure
      successUrl: 'https://developer.esewa.com.np/success',
      failureUrl: 'https://developer.esewa.com.np/failure'
    };

    const html = createEsewaPaymentForm(paymentDetails);
    setPaymentHtml(html);
    setLoading(false);

    // Reset navigation flag when component mounts
    hasNavigated.current = false;

    // Cleanup function to reset flag when component unmounts
    return () => {
      hasNavigated.current = false;
    };
  }, [subtotal, taxAmount, totalAmount]);

  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;
    
    // Prevent multiple navigations
    if (hasNavigated.current) return;

    if (url.includes('developer.esewa.com.np/success')) {
      hasNavigated.current = true;
      // Extract the response data from the URL
      const responseData = extractResponseData(url);
      console.log('Success response data:', responseData);
      
      // Navigate to order confirmation with success status
      navigation.replace('OrderConfirmation', { 
        orderId: transactionUuid,
        paymentMethod: "eSewa",
        status: "success",
        responseData
      });
    } 
    else if (url.includes('developer.esewa.com.np/failure')) {
      hasNavigated.current = true;
    }
  };

  // Helper function to extract response data from URL
  const extractResponseData = (url: string) => {
    try {
      const urlObj = new URL(url);
      const base64Data = urlObj.searchParams.get('data');
      
      if (base64Data) {
        const jsonString = atob(base64Data);
        return JSON.parse(jsonString);
      }
    } catch (error) {
      console.error('Error extracting response data:', error);
    }
    
    return {
      status: 'COMPLETE',
      transaction_uuid: transactionUuid,
      product_code: PRODUCT_CODE,
      total_amount: totalAmount.toString()
    };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Preparing payment...</Text>
      </View>
    );
  }

  return (
 <SafeAreaView style={{flex:1,marginTop:scaleHeight(40)}} >
<StatusBar hidden={false} backgroundColor='#ffffff' style='dark' />


    <WebView
    style={{flex:1}}
      source={{ html: paymentHtml }}
      onNavigationStateChange={handleNavigationStateChange}
      startInLoadingState={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      renderLoading={() => (
        <View style={styles.webviewLoading}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading eSewa payment...</Text>
        </View>
      )}
    />

</SafeAreaView>

  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  webviewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'poppins_regular',
  },
});

export default EsewaWebView; 