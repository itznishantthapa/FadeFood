// UserContext.tsx
import React, { createContext, useEffect, useReducer, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { clearTokens, get_data } from "../service";
import { Alert } from "react-native";

const initialState = {
  name: "",
  phone: "",
  email: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "phone":
      return { ...state, phone: action.payload };
    case "email":
      return { ...state, email: action.payload };
    default:
      return state;
  }
};
export const myContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userData, setuserData] = useState(null);
  const [imageURI, setImageURI] = useState(null);
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const fetchData = async () => {
    const response = await get_data("user_details"); // Call the GET function
    if (response.success) {
      console.log(response.data); // Set data to state if successful
      setuserData(response.data);
      dispatch({ type: "name", payload: response.data.name });
      dispatch({ type: "phone", payload: response.data.phone });
      dispatch({ type: "email", payload: response.data.email });
      if (response.data.profile_pic) {
        setImageURI(`http://192.168.1.64:5555/${response.data.profile_pic}`);
      }
     
    } else {
      console.log(response.data); // Set error message if failed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clearAllData = async () => {
    await clearTokens();
    setuserData(null);
    dispatch({ type: "name", payload: "" });
    dispatch({ type: "phone", payload: "" });
    dispatch({ type: "email", payload: "" });
    setImageURI(null);
    setisUserLoggedIn(false);
    console.log("All data cleared");
  };

  return (
    <myContext.Provider
      value={{
        state,
        userData,
        setuserData,
        setImageURI,
        dispatch,
        imageURI,
        fetchData,
        clearAllData,
        isUserLoggedIn,
        setisUserLoggedIn,
        isLoading,
        setisLoading
      }}
    >
      {children}
    </myContext.Provider>
  );
};
