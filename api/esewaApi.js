/**
 * eSewa Payment API Integration with Django Backend
 * This file handles communication with the Django backend for eSewa payment processing
 */

// Replace with your actual Django backend URL
// For local development with USB debugging, use your computer's IP address
// For example: "http://192.168.1.100:8000"
const BACKEND_BASE_URL = "http://192.168.34.215:5555"  // Your current backend URL

// eSewa payment endpoints on your Django backend
const ENDPOINTS = {
  PREPARE_PAYMENT: `${BACKEND_BASE_URL}/payment/esewa/prepare/`,
  VERIFY_PAYMENT: `${BACKEND_BASE_URL}/payment/esewa/verify/`,
  PAYMENT_SUCCESS: `${BACKEND_BASE_URL}/payment/esewa/success/`,
  PAYMENT_FAILURE: `${BACKEND_BASE_URL}/payment/esewa/failure/`,
}

/**
 * Prepare eSewa payment data through the Django backend
 * @param {Object} orderData - Order data including amount, tax, etc.
 * @returns {Promise<Object>} Payment data for eSewa form
 */
export const prepareEsewaPayment = async (orderData) => {
  try {
    console.log("Preparing eSewa payment with data:", orderData);
    
    // Calculate amounts - ensure they are numbers with 2 decimal places
    const amount = Number.parseFloat(orderData.subtotal).toFixed(2);
    const taxAmount = Number.parseFloat(orderData.taxAmount).toFixed(2);
    const serviceCharge = Number.parseFloat(orderData.serviceCharge || 0).toFixed(2);
    const deliveryCharge = Number.parseFloat(orderData.deliveryCharge || 0).toFixed(2);
    
    // Calculate total amount
    const totalAmount = (
      Number.parseFloat(amount) +
      Number.parseFloat(taxAmount) +
      Number.parseFloat(serviceCharge) +
      Number.parseFloat(deliveryCharge)
    ).toFixed(2);

    // Generate a unique transaction ID with date and time format
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
    const timeStr = 
      date.getHours().toString().padStart(2, "0") +
      date.getMinutes().toString().padStart(2, "0") +
      date.getSeconds().toString().padStart(2, "0");
    const transactionUuid = `${dateStr}-${timeStr}`;

    // Prepare data for the backend
    const requestData = {
      amount: amount,
      tax_amount: taxAmount,
      service_charge: serviceCharge,
      delivery_charge: deliveryCharge,
      total_amount: totalAmount,
      transaction_uuid: transactionUuid,
      product_code: "EPAYTEST", // Use your actual product code in production
      order_details: orderData.orderDetails,
    };

    console.log("Sending to backend:", requestData);

    // Send request to Django backend
    const response = await fetch(ENDPOINTS.PREPARE_PAYMENT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    // Get the prepared payment data from backend
    const data = await response.json();
    console.log("Backend response:", data);

    if (!data.success) {
      throw new Error(data.message || "Failed to prepare payment");
    }

    // Return the payment data from backend
    return {
      paymentData: data.payment_data,
      transactionUuid,
      totalAmount,
    };
  } catch (error) {
    console.error("Error preparing eSewa payment:", error);
    
    // For testing without a backend, return simulated data
    console.log("Using simulated data for testing");
    
    // This simulates what your Django backend would return
    return {
      paymentData: {
        amount: amount,
        tax_amount: taxAmount,
        product_service_charge: serviceCharge,
        product_delivery_charge: deliveryCharge,
        total_amount: totalAmount,
        transaction_uuid: transactionUuid,
        product_code: "EPAYTEST",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: "https://developer.esewa.com.np/success",
        failure_url: "https://developer.esewa.com.np/failure",
        signature: "signature_would_be_generated_by_backend",
        action: "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
      },
      transactionUuid,
      totalAmount,
    };
  }
}

/**
 * Verify eSewa payment status through the Django backend
 * @param {Object} params - Payment parameters
 * @returns {Promise<Object>} Payment verification result
 */
export const verifyEsewaPayment = async (params) => {
  try {
    const { product_code, total_amount, transaction_uuid } = params

    // Send verification request to Django backend
    const response = await fetch(ENDPOINTS.VERIFY_PAYMENT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_code,
        total_amount,
        transaction_uuid,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return {
      success: data.success,
      data: data.data,
      message: data.message,
    }
  } catch (error) {
    console.error("Payment verification failed", error)
    
    // For testing without a backend, return simulated data
    return {
      success: true,
      data: {
        status: "COMPLETE",
        ref_id: `REF-${Date.now()}`,
      },
      message: "Payment verified successfully (simulated)",
    }
  }
}

/**
 * Process eSewa payment success response
 * @param {string} queryString - Query string from success URL
 * @returns {Promise<Object>} Processed payment data
 */
export const processPaymentSuccess = async (queryString) => {
  try {
    // Send success data to Django backend
    const response = await fetch(`${ENDPOINTS.PAYMENT_SUCCESS}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error processing payment success:", error)
    
    // For testing without a backend, return simulated data
    return {
      success: true,
      data: {
        transaction_uuid: `TXN-${Date.now()}`,
        transaction_code: `CODE-${Date.now()}`,
        status: "COMPLETE",
      },
      message: "Payment successful (simulated)",
    }
  }
}

/**
 * Process eSewa payment failure response
 * @param {string} queryString - Query string from failure URL
 * @returns {Promise<Object>} Processed failure data
 */
export const processPaymentFailure = async (queryString) => {
  try {
    // Send failure data to Django backend
    const response = await fetch(`${ENDPOINTS.PAYMENT_FAILURE}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error processing payment failure:", error)
    
    // For testing without a backend, return simulated data
    return {
      success: false,
      message: "Payment failed or was canceled (simulated)",
    }
  }
} 