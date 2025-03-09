"use client"

import { useState, useRef } from "react"
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from "react-native"
import { WebView } from "react-native-webview"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { scaleHeight, scaleWidth } from "../../Scaling"
import React from "react"
import { verifyEsewaPayment, processPaymentSuccess, processPaymentFailure } from "../../api/esewaApi"

// eSewa test URLs from documentation
const ESEWA_SUCCESS_URL = "https://developer.esewa.com.np/success"
const ESEWA_FAILURE_URL = "https://developer.esewa.com.np/failure"

const EsewaWebView = ({ route, navigation }) => {
  const { paymentData, orderId, amount, orderDetails } = route.params
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [debugInfo, setDebugInfo] = useState(null)
  const webViewRef = useRef(null)

  // Log payment data for debugging
  console.log("EsewaWebView - Payment Data:", JSON.stringify(paymentData, null, 2))

  const ESEWA_TEST_URL = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"

  // Create HTML form for eSewa payment
  const htmlForm = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>eSewa Payment</title>
    <style>
      body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
      .loader { margin-top: 20px; }
      h3 { color: #333; }
      pre { text-align: left; background: #f5f5f5; padding: 10px; overflow: auto; font-size: 12px; }
      .debug-container { margin-top: 20px; }
      table { width: 100%; border-collapse: collapse; margin-top: 10px; }
      table, th, td { border: 1px solid #ddd; }
      th, td { padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; }
      .debug-button { margin-top: 20px; padding: 8px 16px; background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 4px; }
      .error { color: red; margin: 20px 0; }
    </style>
  </head>
  <body>
    <h3>Redirecting to eSewa...</h3>
    <div class="loader">Loading...</div>
    
    <!-- For debugging - display the form data -->
    <div id="debug" style="display: none;" class="debug-container">
      <h4>Form Data</h4>
      <table>
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Form Action</td>
          <td>${paymentData.action || "https://rc-epay.esewa.com.np/api/epay/main/v2/form"}</td>
        </tr>
        <tr>
          <td>amount</td>
          <td>${paymentData.amount}</td>
        </tr>
        <tr>
          <td>tax_amount</td>
          <td>${paymentData.tax_amount}</td>
        </tr>
        <tr>
          <td>total_amount</td>
          <td>${paymentData.total_amount}</td>
        </tr>
        <tr>
          <td>transaction_uuid</td>
          <td>${paymentData.transaction_uuid}</td>
        </tr>
        <tr>
          <td>product_code</td>
          <td>${paymentData.product_code}</td>
        </tr>
        <tr>
          <td>product_service_charge</td>
          <td>${paymentData.product_service_charge}</td>
        </tr>
        <tr>
          <td>product_delivery_charge</td>
          <td>${paymentData.product_delivery_charge}</td>
        </tr>
        <tr>
          <td>success_url</td>
          <td>${paymentData.success_url}</td>
        </tr>
        <tr>
          <td>failure_url</td>
          <td>${paymentData.failure_url}</td>
        </tr>
        <tr>
          <td>signed_field_names</td>
          <td>${paymentData.signed_field_names}</td>
        </tr>
        <tr>
          <td>signature</td>
          <td>${paymentData.signature}</td>
        </tr>
      </table>
      
      <h4>String to Sign</h4>
      <pre>${paymentData.total_amount},${paymentData.transaction_uuid},${paymentData.product_code}</pre>
    </div>
    
    <form id="esewaForm" method="POST" action="${paymentData.action || "https://rc-epay.esewa.com.np/api/epay/main/v2/form"}">
      <input type="hidden" name="amount" value="${paymentData.amount}">
      <input type="hidden" name="tax_amount" value="${paymentData.tax_amount}">
      <input type="hidden" name="total_amount" value="${paymentData.total_amount}">
      <input type="hidden" name="transaction_uuid" value="${paymentData.transaction_uuid}">
      <input type="hidden" name="product_code" value="${paymentData.product_code}">
      <input type="hidden" name="product_service_charge" value="${paymentData.product_service_charge}">
      <input type="hidden" name="product_delivery_charge" value="${paymentData.product_delivery_charge}">
      <input type="hidden" name="success_url" value="${paymentData.success_url}">
      <input type="hidden" name="failure_url" value="${paymentData.failure_url}">
      <input type="hidden" name="signed_field_names" value="${paymentData.signed_field_names}">
      <input type="hidden" name="signature" value="${paymentData.signature}">
    </form>
    
    <div id="errorMessage" class="error" style="display: none;"></div>
    
    <button onclick="toggleDebug()" class="debug-button">Show/Hide Debug Info</button>
    <button onclick="submitForm()" class="debug-button" style="margin-left: 10px;">Submit Form</button>
    
    <script>
      // Function to toggle debug info
      function toggleDebug() {
        const debugDiv = document.getElementById('debug');
        if (debugDiv.style.display === 'none') {
          debugDiv.style.display = 'block';
        } else {
          debugDiv.style.display = 'none';
        }
      }
      
      // Function to manually submit the form
      function submitForm() {
        document.getElementById('esewaForm').submit();
      }
      
      // Function to capture and display errors
      window.onerror = function(message, source, lineno, colno, error) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.innerHTML = 'Error: ' + message;
        errorDiv.style.display = 'block';
        
        // Send error to React Native
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'error',
          message: message,
          source: source,
          lineno: lineno,
          colno: colno
        }));
        
        return true;
      };
      
      // Capture form submission
      document.getElementById('esewaForm').onsubmit = function() {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'formSubmit',
          action: this.action,
          fields: {
            amount: this.amount.value,
            tax_amount: this.tax_amount.value,
            total_amount: this.total_amount.value,
            transaction_uuid: this.transaction_uuid.value,
            product_code: this.product_code.value,
            signature: this.signature.value
          }
        }));
        
        // Show debug info by default
        document.getElementById('debug').style.display = 'block';
        
        // Don't automatically submit - let user click the button
        // return true;
      };
      
      // Submit the form automatically after a short delay
      setTimeout(function() {
        try {
          document.getElementById('esewaForm').submit();
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'info',
            message: 'Form submitted automatically'
          }));
        } catch (e) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'error',
            message: 'Error submitting form: ' + e.message
          }));
        }
      }, 2000);
    </script>
  </body>
  </html>
`

  // Function to check payment status with backend
  const checkPaymentStatus = async () => {
    try {
      const result = await verifyEsewaPayment({
        product_code: paymentData.product_code,
        total_amount: paymentData.total_amount,
        transaction_uuid: paymentData.transaction_uuid,
      })

      if (result.success) {
        // Payment successful
        navigation.replace("OrderConfirmation", {
          orderId: orderId,
          paymentMethod: "eSewa",
          transactionId: result.data.ref_id,
          orderDetails: orderDetails,
        })
      } else if (result.data && result.data.status === "PENDING") {
        // Payment still pending, check again after a delay
        setTimeout(checkPaymentStatus, 5000)
      } else {
        // Payment failed
        setError("Payment verification failed. Please try again.")
      }
    } catch (error) {
      console.error("Payment status check error:", error)
      setError("Failed to verify payment status. Please contact support.")
    }
  }

  // Handle navigation state change
  const handleNavigationStateChange = (navState) => {
    console.log("Navigation state changed:", navState.url)
    
    // Check for eSewa error responses in the URL
    if (navState.url.includes("rc-epay.esewa.com.np") && navState.url.includes("error")) {
      try {
        // Extract error message from URL
        const urlObj = new URL(navState.url)
        const errorMessage = urlObj.searchParams.get("error_message") || "Unknown error"
        const errorCode = urlObj.searchParams.get("error_code") || "Unknown code"
        
        console.error(`eSewa Error: ${errorCode} - ${errorMessage}`)
        setError(`eSewa Error: ${errorCode} - ${errorMessage}`)
        return
      } catch (e) {
        console.error("Error parsing error URL:", e)
      }
    }
    
    // Check if the URL contains success or failure indicators
    if (navState.url.includes("developer.esewa.com.np/success")) {
      // Extract query parameters
      const urlParts = navState.url.split("?")
      if (urlParts.length > 1) {
        const queryString = urlParts[1]
        
        // Process the success response with our backend
        processPaymentSuccess(queryString)
          .then(data => {
            if (data.success) {
              // Payment successful, navigate to confirmation
              navigation.replace("OrderConfirmation", {
                orderId: data.data.transaction_uuid || orderId,
                paymentMethod: "eSewa",
                transactionId: data.data.transaction_code || data.data.ref_id,
                orderDetails: orderDetails,
              })
            } else {
              // Payment verification failed
              setError(data.message || "Payment verification failed")
            }
          })
          .catch(error => {
            console.error("Error processing payment success:", error)
            // If backend processing fails, try direct verification
            checkPaymentStatus()
          })
      } else {
        // If no query parameters, simulate successful payment for testing
        navigation.replace("OrderConfirmation", {
          orderId: orderId,
          paymentMethod: "eSewa",
          transactionId: `ESEWA-${Date.now()}`,
          orderDetails: orderDetails,
        })
      }
      return
    } else if (navState.url.includes("developer.esewa.com.np/failure")) {
      // Extract query parameters
      const urlParts = navState.url.split("?")
      if (urlParts.length > 1) {
        const queryString = urlParts[1]
        
        // Process the failure response with our backend
        processPaymentFailure(queryString)
          .then(data => {
            setError(data.message || "Payment failed or was canceled. Please try again.")
          })
          .catch(error => {
            console.error("Error processing payment failure:", error)
            setError("Payment failed or was canceled. Please try again.")
          })
      } else {
        // Default error message
        setError("Payment failed or was canceled. Please try again.")
      }
      return
    } else if (navState.url.includes("esewa.com.np/success")) {
      // For testing with dummy URLs, simulate a successful payment
      navigation.replace("OrderConfirmation", {
        orderId: orderId,
        paymentMethod: "eSewa",
        transactionId: `ESEWA-${Date.now()}`,
        orderDetails: orderDetails,
      })
      return
    } else if (navState.url.includes("esewa.com.np/failure")) {
      // Payment failed with dummy URLs
      setError("Payment failed or was canceled. Please try again.")
      return
    } else if (navState.url.includes("/payment/success")) {
      // Extract and decode the response data if available
      const urlParts = navState.url.split("?")
      if (urlParts.length > 1) {
        try {
          // Try to extract and decode base64 response if present
          const params = new URLSearchParams(urlParts[1])
          const encodedData = params.get("data")

          if (encodedData) {
            try {
              const decodedData = JSON.parse(atob(encodedData))
              console.log("Decoded eSewa response:", decodedData)
              
              // Process the success with our backend instead of verifying locally
              processPaymentSuccess(`data=${encodedData}`)
                .then(data => {
                  if (data.success) {
                    // Payment successful, navigate to confirmation
                    navigation.replace("OrderConfirmation", {
                      orderId: decodedData.transaction_uuid || orderId,
                      paymentMethod: "eSewa",
                      transactionId: decodedData.transaction_code,
                      orderDetails: orderDetails,
                    })
                  } else {
                    setError(data.message || "Payment verification failed")
                  }
                })
                .catch(error => {
                  console.error("Error processing payment:", error)
                  checkPaymentStatus()
                })
              return
            } catch (decodeError) {
              console.error("Error decoding base64 data:", decodeError)
              setError("Error processing payment response")
              return
            }
          }
        } catch (error) {
          console.error("Error processing success response:", error)
          setError("Error processing payment response")
          return
        }

        // If we couldn't extract or verify the response data, check payment status
        checkPaymentStatus()
      }
    } else if (navState.url.includes("/payment/failure")) {
      // Original failure URL handling
      setError("Payment failed or was canceled. Please try again.")
    }
  }

  // Handle WebView errors
  const handleError = (error) => {
    console.error("WebView error:", error)

    // Check for specific error types
    if (error.nativeEvent && error.nativeEvent.description) {
      if (error.nativeEvent.description.includes("ERR_NAME_NOT_RESOLVED")) {
        setError("Cannot connect to eSewa. Please check your internet connection and try again.")
      } else if (error.nativeEvent.description.includes("ERR_INTERNET_DISCONNECTED")) {
        setError("No internet connection. Please connect to the internet and try again.")
      } else {
        setError(`Failed to load payment page: ${error.nativeEvent.description}`)
      }
    } else {
      setError("Failed to load payment page. Please try again.")
    }

    setLoading(false)
  }

  // Try payment again
  const retryPayment = () => {
    setError(null)
    setLoading(true)
    if (webViewRef.current) {
      webViewRef.current.reload()
    }
  }

  // Go back to checkout
  const goBackToCheckout = () => {
    navigation.goBack()
  }

  // Handle messages from WebView
  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data)
      console.log("Message from WebView:", data)
      
      if (data.type === 'error') {
        setError(`WebView Error: ${data.message}`)
      } else if (data.type === 'formSubmit') {
        setDebugInfo(data)
      }
    } catch (error) {
      console.error("Error parsing WebView message:", error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBackToCheckout}>
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>eSewa Payment</Text>
        <View style={styles.placeholder} />
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color="#F44336" />
          <Text style={styles.errorText}>{error}</Text>
          
          {debugInfo && (
            <View style={styles.debugInfoContainer}>
              <Text style={styles.debugInfoTitle}>Debug Info:</Text>
              <Text style={styles.debugInfoText}>{JSON.stringify(debugInfo, null, 2)}</Text>
            </View>
          )}
          
          <TouchableOpacity style={styles.retryButton} onPress={retryPayment}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backToCheckoutButton} onPress={goBackToCheckout}>
            <Text style={styles.backToCheckoutText}>Back to Checkout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingText}>Connecting to eSewa...</Text>
            </View>
          )}

          <WebView
            ref={webViewRef}
            source={{ html: htmlForm }}
            onNavigationStateChange={handleNavigationStateChange}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={handleError}
            onMessage={handleMessage}
            style={styles.webView}
            domStorageEnabled={true}
            javaScriptEnabled={true}
            thirdPartyCookiesEnabled={true}
            mixedContentMode="compatibility"
            originWhitelist={["*"]}
          />
        </>
      )}
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
  webView: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 1,
  },
  loadingText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#333333",
    marginTop: scaleHeight(16),
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scaleWidth(20),
  },
  errorText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#333333",
    textAlign: "center",
    marginTop: scaleHeight(16),
    marginBottom: scaleHeight(24),
  },
  retryButton: {
    backgroundColor: "#4CAF50",
    borderRadius: scaleWidth(8),
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(24),
    marginBottom: scaleHeight(12),
  },
  retryButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#FFFFFF",
  },
  backToCheckoutButton: {
    padding: scaleWidth(12),
  },
  backToCheckoutText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#4CAF50",
  },
  debugInfoContainer: {
    marginTop: scaleHeight(16),
    padding: scaleWidth(12),
    backgroundColor: "#F5F5F5",
    borderRadius: scaleWidth(8),
    width: "100%",
  },
  debugInfoTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#333333",
    marginBottom: scaleHeight(8),
  },
  debugInfoText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#333333",
  },
})

export default EsewaWebView

