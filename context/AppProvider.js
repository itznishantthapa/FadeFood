// UserContext.tsx
import React, { createContext, useEffect, useReducer, useState } from "react";
import { clearTokens, get_data } from "../service";

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
  const [imageURI, setImageURI] = useState(null);

  const fetchData = async () => {
    const response = await get_data("user_details"); // Call the GET function
    if (response.success) {
      console.log(response.data); 
      setuserData(response.data);
      await setuser_type(response.data.is_seller? 'seller' : 'customer')
      dispatch({ type: "name", payload: response.data.name });
      dispatch({ type: "phone", payload: response.data.phone });
      dispatch({ type: "email", payload: response.data.email });
      if (response.data.profile_pic) {
        setImageURI(`http://192.168.1.64:5555/${response.data.profile_pic}`);
      }
      setisUserLoggedIn(true);
    } else {
      console.log(response.data); // Set error message if failed
    }
  };

  
  useEffect(() => {
    fetchData();
  }, []);

  const clearAllData = async () => {
    await clearTokens();
  };

  return (
    <myContext.Provider
      value={{
        state,
        setImageURI,
        dispatch,
        imageURI,
      }}
    >
      {children}
    </myContext.Provider>
  );
};
