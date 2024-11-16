import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";



// Store both access and refresh tokens
const storeTokens = async (accessToken, refreshToken) => {
  try {
    await SecureStore.setItemAsync("access_token", accessToken);
    await SecureStore.setItemAsync("refresh_token", refreshToken);
  } catch (error) {
    console.error("Error storing the tokens", error);
  }
};

// Retrieve access token
const getAccessToken = async () => {
  try {
    return await SecureStore.getItemAsync("access_token");
  } catch (error) {
    console.error("Error retrieving the access token", error);
    return null;
  }
};

// Retrieve refresh token
const getRefreshToken = async () => {
  try {
    return await SecureStore.getItemAsync("refresh_token");
  } catch (error) {
    console.error("Error retrieving the refresh token", error);
    return null;
  }
};


// Clear tokens from secure storage
export const clearTokens = async () => {
  try {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    console.log("Tokens cleared");
  } catch (error) {
    console.error("Error clearing tokens", error);
  }
};




// Set up base URL for your Django API
const api = axios.create({
  baseURL: "http://192.168.1.64:5555/",
  // baseURL: "http://192.168.14.215:5555/",
});

// Function for signup
export const signup = async (data) => {
  try {
    const response = await api.post("signup/", data); // Use the signup endpoint
    console.log("hereeeeeeeeeeeeeeeeeee1");
    if (response.data.access && response.data.refresh) {
      console.log("hereeeeeeeeeeeeeeeeeee");
      await storeTokens(response.data.access, response.data.refresh); // Store both tokens
      return { success: true, returnData: response.data.msg };
    }
  } catch (error) {
    return {
      success: false,
      returnData: error.response?.data?.msg || "Signup failed",
    };
  }
};

// Function for login
export const login = async (data) => {
  try {
    // const response = await api.post("login/", data);
    const response = await api({ method: "post", url: "login/", data: data });
    if (response.data.access && response.data.refresh) {
      await storeTokens(response.data.access, response.data.refresh); // Store both tokens
      return { success: true, returnData: response.data.msg };
    }
  } catch (error) {
    return {success: false,returnData: error.response?.data?.msg};
  }
};

// Refresh access token using the refresh token
const refreshAccessToken = async () => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await api.post("refresh_token/", {
      refresh: refreshToken,
    });
    await storeTokens(response.data.access, refreshToken); // Store new access token
    Alert.alert("Hey", "Token refreshed");
    console.log("Token refreshed----------------------hureyyyyyyyyy");
    return response.data.access;
  } catch (error) {
    console.error("Error refreshing access token", error);
    return null;
  }
};

// Handle POST requests, automatically handling token refresh on failure
export const post_data = async (endpoint, data) => {
  let token = await getAccessToken();
  if (!token) {
    return { success: false, data: "No token found. Please log in again." };
  }

  try {
    const response = await api.post(`${endpoint}/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.access) {
      await storeTokens(response.data.access, response.data.refresh); // Store both tokens
    }
    return { success: true, returnData: response.data.msg };
  } catch (error) {
    // If token is expired, try refreshing it
    if (error.response?.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return post_data(endpoint, data); // Retry the request with the new token
      }
    }
    return {
      success: false,
      returnData: error.response?.data?.msg || "Something went wrong",
    };
  }
};

// Handle GET requests, checking token validity and refreshing if needed
export const get_data = async (endpoint) => {
  let token = await getAccessToken();
  if (!token) {
    return { success: false, data: "No token found. Please log in again." };
  }

  try {
    const response = await api.get(`${endpoint}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('get data calling refresh token')
      const newToken = await refreshAccessToken();
      if (newToken) {
        return get_data(endpoint); // Retry the GET request with the new token
      }
    }
    return {
      success: false,
      data: error.response?.data?.msg || "Something went wrong",
    };
  }
};

//export post function for profile picture
export const post_data_with_img = async (endpoint, text_data, uri, method) => {
  const token = await getAccessToken();
  if (!token) {
    return { success: false, data: "No token found. Please log in again." };
  }

  const formData = new FormData();

  Object.keys(text_data).forEach((key) => {
    formData.append(key, text_data[key]);
  });
   if(uri){

     formData.append("profile_picture", {
       uri: uri,
       type: "image/jpeg",
       name: "profile_picture.jpg",
     });
   }

  try {
    const response = await api({
      method: method,
      url: `${endpoint}/`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data.msg };
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('post_data_with_img calling refresh token')
      const newToken = await refreshAccessToken();
      if (newToken) {
        return post_data_with_img(endpoint, text_data, uri, method); // Retry the GET request with the new token
      }
    }
    return {
      success: false,
      data: error.response?.data?.msg || "Something went wrong",
    };
  }
};

//Function to delete the data
export const delete_data = async (endpoint) => {
  const token = await getAccessToken();
  if (!token) {
    return { success: false, data: "No token found. Please log in again." };
  }

  try {
    const response = await api.delete(`${endpoint}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data.msg };
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('delete_data calling refresh token')
      const newToken = await refreshAccessToken();
      if (newToken) {
        return delete_data(endpoint); // Retry the GET request with the new token
      }
    }
    return {
      success: false,
      data: error.response?.data?.msg || "Something went wrong",
    };
  }
};