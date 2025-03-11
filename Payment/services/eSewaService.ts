import CryptoJS from 'crypto-js';

// Secret key for UAT (testing) environment
const SECRET_KEY = '8gBm/:&EnhH.1/q';

// eSewa API URLs
export const ESEWA_EPAY_URL = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
export const ESEWA_STATUS_URL = 'https://rc.esewa.com.np/api/epay/transaction/status/';
export const PRODUCT_CODE = 'EPAYTEST';

/**
 * Generate HMAC SHA256 signature for eSewa payment
 */
export const generateSignature = (totalAmount: string, transactionUuid: string, productCode: string) => {
  const inputString = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  const hash = CryptoJS.HmacSHA256(inputString, SECRET_KEY);
  return CryptoJS.enc.Base64.stringify(hash);
};

/**
 * Generate a unique transaction ID
 */
export const generateTransactionUuid = () => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
};

/**
 * Create HTML form for eSewa payment
 */
export const createEsewaPaymentForm = (paymentDetails: {
  amount: string;
  taxAmount: string;
  totalAmount: string;
  transactionUuid: string;
  productServiceCharge: string;
  productDeliveryCharge: string;
  successUrl: string;
  failureUrl: string;
}) => {
  const {
    amount,
    taxAmount,
    totalAmount,
    transactionUuid,
    productServiceCharge,
    productDeliveryCharge,
    successUrl,
    failureUrl
  } = paymentDetails;
  
  // Generate signature
  const signature = generateSignature(totalAmount, transactionUuid, PRODUCT_CODE);
  
  // Create HTML form
  return `
    <html>
      <head>
        <title>eSewa Payment</title>
      </head>
      <body onload="document.eSewaForm.submit()">
        <form name="eSewaForm" action="${ESEWA_EPAY_URL}" method="POST">
          <input type="hidden" name="amount" value="${amount}">
          <input type="hidden" name="tax_amount" value="${taxAmount}">
          <input type="hidden" name="total_amount" value="${totalAmount}">
          <input type="hidden" name="transaction_uuid" value="${transactionUuid}">
          <input type="hidden" name="product_code" value="${PRODUCT_CODE}">
          <input type="hidden" name="product_service_charge" value="${productServiceCharge}">
          <input type="hidden" name="product_delivery_charge" value="${productDeliveryCharge}">
          <input type="hidden" name="success_url" value="${successUrl}">
          <input type="hidden" name="failure_url" value="${failureUrl}">
          <input type="hidden" name="signed_field_names" value="total_amount,transaction_uuid,product_code">
          <input type="hidden" name="signature" value="${signature}">
        </form>
        <div style="text-align: center; margin-top: 50px;">
          <h2>Redirecting to eSewa Payment...</h2>
          <p>Please wait while we redirect you to eSewa payment gateway.</p>
        </div>
      </body>
    </html>
  `;
};

/**
 * Check payment status
 */
export const checkPaymentStatus = async (productCode: string, transactionUuid: string, totalAmount: string) => {
  try {
    const url = `${ESEWA_STATUS_URL}?product_code=${productCode}&total_amount=${totalAmount}&transaction_uuid=${transactionUuid}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw error;
  }
};

/**
 * Verify the signature from eSewa response
 */
export const verifySignature = (response: any) => {
  const { 
    signed_field_names,
    signature 
  } = response;
  
  const fieldsToSign = signed_field_names.split(',');
  const inputString = fieldsToSign.map((field: string) => `${field}=${response[field]}`).join(',');
  
  const hash = CryptoJS.HmacSHA256(inputString, SECRET_KEY);
  const calculatedSignature = CryptoJS.enc.Base64.stringify(hash);
  
  return signature === calculatedSignature;
}; 