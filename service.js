import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export const baseURL = "http://192.168.1.64:5555/";

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
  // baseURL: "http://192.168.15.215:5555/",
  // baseURL: "http://192.168.67.215:5555/",
});

// Function for signup
export const signup = async (data) => {
  try {
    const response = await api.post("create_user/", data); 
    if (response.data.access && response.data.refresh) {
      await storeTokens(response.data.access, response.data.refresh);
      console.log("Token stored--------BY SIGNUP");
      return { success: true, message: response.data.ofBackendMessage };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.ofBackendMessage || "Signup failed",
    };
  }
};

// Function for login
export const login = async (data) => {
  try {
    // const response = await api.post("login/", data);
    const response = await api({
      method: "post",
      url: "login_user/",
      data: data,
    });
    if (response.data.access && response.data.refresh) {
      await storeTokens(response.data.access, response.data.refresh); // Store both tokens
      console.log("Token stored--------BY LOGIN");
      return { success: true, message: response.data.ofBackendMessage };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.ofBackendMessage };
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
    console.log("Token refreshed----------------------hureyyyyyyyyy");
    return { success: true, data: response.data.access, message: response.data.ofBackendMessage}
  } catch (error) {
    console.error("Error refreshing access token", error);
     //we need to implement login again
    await clearTokens();
    Alert.alert("Session expired", "Please log in again" , [
      { text: "OK", onPress: () => navigation.navigate("Login") },
    ]);


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
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
    
    },
      
    });
    if (response.data.access) {
      await storeTokens(response.data.access, response.data.refresh); // Store both tokens
    }
    return {
      success: true,
      data: response.data.ofBackendData,
      images: response.data.ofFoodImages,
      ofBackendMessage: response.data.ofBackendMessage,
    };
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
      data: error.response?.data?.ofBackendMessage || "Something went wrong",
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
    return { success: true, data: response.data.ofBackendData };
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("get data calling refresh token");
      const newToken = await refreshAccessToken();
      if (newToken) {
        return get_data(endpoint); // Retry the GET request with the new token
      }
    }
    return {
      success: false,
      data: error.response?.data?.ofBackendMessage || "Something went wrong by get_data",
    };
  }
};

//export post function for profile picture
export const post_data_with_img = async (hitpoint, text_data, food_image, method) => {
  const token = await getAccessToken();
  if (!token) {
    return { success: false, data: "No token found. Please log in again." };
  }

  const formData = new FormData();

  // Append text data
  Object.keys(text_data).forEach((key) => {
    formData.append(key, text_data[key]);
  });

  console.log("Here");


  // Append images
  if (food_image) {
    console.log(food_image)
    console.log('appending multiple images')
    console.log("Here2");
    // Add images to FormData
    //
    if (food_image && Array.isArray(food_image)) {
      const filteredImages = food_image.filter( image => !image.startsWith('/media'));
      console.log('filteredImages-->',filteredImages)
      console.log("Here3");
      
      filteredImages.forEach((imageUri, index) => {
        formData.append("images", {
          
          uri: imageUri,
          type: "image/jpeg",
          name: `food_image_${index}.jpg`,
        });
        console.log("Here4");
      });
    } else {
      console.log('appending single image')
      // Handle a single image
      formData.append("image", {
        uri: images,
        type: "image/jpeg", // Adjust type as needed
        name: `food_image_${index}.jpg`,
      });
    }
  }

  try {
    console.log('here5')
    const response = await api({
      method: method,
      url: `${hitpoint}/`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('here6')
    return { success: true, data: response.data.ofBackendData,image:response.data.ofFoodImages , ofBackendMessage: response.data.ofBackendMessage };
  } catch ( error) {       
    console.log(error)
    if (error.response?.status === 401) {
      console.log("post_data_with_img calling refresh token");
      const newToken = await refreshAccessToken();
      if (newToken) {
        return post_data_with_img(hitpoint, text_data, food_image, method); // Retry the request with new token
      }
    }
    return {
      success: false,
      data: error.response?.data?.ofBackendMessage || "Something went wrong",
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
    return { success: true, data: response.data.ofBackendMessage };
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("delete_data calling refresh token");
      const newToken = await refreshAccessToken();
      if (newToken) {
        return delete_data(endpoint); 
      }
    }
    return {
      success: false,
      data: error.response?.data?.ofBackendMessage || "Something went wrong",
    };
  }
};

//function to update data
export const update_data = async (endpoint, data) => {
  const token = await getAccessToken();
  if (!token) {
    return { success: false, data: "No token found. Please log in again." };
  }

  try {
    const response = await api.put(`${endpoint}/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      success: true,
      data: response.data.ofBackendData,
      ofBackendMessage: response.data.ofBackendMessage,
    };
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("update_data calling refresh token");
      const newToken = await refreshAccessToken();
      if (newToken) {
        return update_data(endpoint, data); // Retry the GET request with the new token
      }
    }
    return {
      success: false,
      data: error.response?.data?.ofBackendMessage || "Something went wrong",
    };
  }
};

//delete function with id
export const delete_data_with_id = async (endpoint, data) => {
  const token = await getAccessToken();
  if (!token) {
    return { success: false, data: "No token found. Please log in again." };
  }

  try {
    const response = await api.delete(`${endpoint}/`, {
      headers: { Authorization: `Bearer ${token}` },
      data,
    });
    return { success: true, data: response.data.ofBackendMessage };
  } catch (error) {
    console.log("here");
    if (error.response?.status === 401) {
      console.log("here2");
      console.log("delete_data_with_id calling refresh token");
      const newToken = await refreshAccessToken();
      if (newToken) {
        return delete_data_with_id(endpoint, id); // Retry the GET request with the new token
      }
    }
    return {
      success: false,
      data: error.response?.data?.ofBackendMessage || "Something went wrong",
    };
  }
};
