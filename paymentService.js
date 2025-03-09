import CryptoJS from "crypto-js"

// eSewa API endpoints
const ESEWA_TEST_URL = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
const ESEWA_PROD_URL = "https://epay.esewa.com.np/api/epay/main/v2/form"
const ESEWA_STATUS_TEST_URL = "https://rc.esewa.com.np/api/epay/transaction/status"
const ESEWA_STATUS_PROD_URL = "https://epay.esewa.com.np/api/epay/transaction/status"

// Use test URLs for development, switch to production URLs for production
const ESEWA_URL = ESEWA_TEST_URL
const ESEWA_STATUS_URL = ESEWA_STATUS_TEST_URL

// Your Django backend API endpoints
const BACKEND_BASE_URL = "http://your-backend-url.com/api" // Replace with your actual backend URL
const BACKEND_PREPARE_PAYMENT_URL = `${BACKEND_BASE_URL}/payment/esewa/prepare/`
const BACKEND_VERIFY_PAYMENT_URL = `${BACKEND_BASE_URL}/payment/esewa/verify/`
const BACKEND_SUCCESS_URL = `${BACKEND_BASE_URL}/payment/esewa/success/`
const BACKEND_FAILURE_URL = `${BACKEND_BASE_URL}/payment/esewa/failure/`

// Function to prepare eSewa payment data using the backend
export const prepareEsewaPayment = async (orderData) => {
  try {
    // For testing without a backend, we'll simulate the backend response
    // In production, you would make an actual API call to your backend
    
    // Calculate amounts
    const amount = Number.parseFloat(orderData.subtotal).toFixed(2)
    const taxAmount = Number.parseFloat(orderData.taxAmount).toFixed(2)
    const serviceCharge = Number.parseFloat(orderData.serviceCharge || 0).toFixed(2)
    const deliveryCharge = Number.parseFloat(orderData.deliveryCharge || 0).toFixed(2)
    const totalAmount = (
      Number.parseFloat(amount) +
      Number.parseFloat(taxAmount) +
      Number.parseFloat(serviceCharge) +
      Number.parseFloat(deliveryCharge)
    ).toFixed(2)

    // Generate a unique transaction ID
    const date = new Date()
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "")
    const timeStr = 
      date.getHours().toString().padStart(2, "0") +
      date.getMinutes().toString().padStart(2, "0") +
      date.getSeconds().toString().padStart(2, "0")
    const transactionUuid = `${dateStr}-${timeStr}`

    // In a real implementation, you would call your backend API:
    /*
    const response = await fetch(BACKEND_PREPARE_PAYMENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        tax_amount: taxAmount,
        service_charge: serviceCharge,
        delivery_charge: deliveryCharge,
        total_amount: totalAmount,
        transaction_uuid: transactionUuid,
        product_code: "EPAYTEST",
        order_details: orderData.orderDetails,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
    */

    // For testing, simulate the backend response
    // This is what your Django backend would return
    const paymentData = {
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
      signature: "signature_would_be_generated_by_backend", // In real implementation, this would come from your backend
      action: ESEWA_URL,
    }

    console.log("Payment data:", JSON.stringify(paymentData, null, 2)) // For debugging

    return {
      paymentData,
      transactionUuid,
      totalAmount,
    }
  } catch (error) {
    console.error("Error preparing payment data:", error)
    throw error
  }
}

// Function to verify eSewa payment status
export const verifyEsewaPayment = async (params) => {
  try {
    const { product_code, total_amount, transaction_uuid } = params

    // In a real implementation, you would call your backend API:
    /*
    const response = await fetch(`${BACKEND_VERIFY_PAYMENT_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_code,
        total_amount,
        transaction_uuid,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
    */

    // For testing, construct the status check URL with query parameters
    const statusUrl = `${ESEWA_STATUS_URL}/?product_code=${encodeURIComponent(product_code)}&total_amount=${encodeURIComponent(total_amount)}&transaction_uuid=${encodeURIComponent(transaction_uuid)}`

    console.log("Status check URL:", statusUrl) // For debugging

    const response = await fetch(statusUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    // Check if the payment is complete
    if (data.status === "COMPLETE") {
      return {
        success: true,
        data: data,
        message: "Payment verified successfully",
      }
    } else {
      return {
        success: false,
        data: data,
        message: `Payment verification failed. Status: ${data.status}`,
      }
    }
  } catch (error) {
    console.error("Payment verification failed", error)
    return {
      success: false,
      message: "Failed to verify payment",
      error: error.message,
    }
  }
}

// Function to verify the response signature from eSewa
export const verifyEsewaResponse = (responseData) => {
  try {
    // In a real implementation, you would call your backend API to verify the signature:
    /*
    const response = await fetch(`${BACKEND_VERIFY_SIGNATURE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.valid;
    */

    // For testing, assume the signature is valid if we have transaction data
    return responseData && responseData.transaction_code
  } catch (error) {
    console.error("Signature verification failed", error)
    return false
  }
}

