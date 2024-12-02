// UserContext.tsx
import React, { createContext, useEffect, useReducer, useState } from "react";
import { clearTokens, get_data, get_data_with_id, refreshAccessToken } from "../service";
import { initialfood_state, food_reducer } from "./userReducerFood";

const userinitialState = {
  name: "",
  phone: "",
  email: "",
  profile_picture: null,
  role: "customer",
  snackmessage: "",
};
const user_reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "phone":
      return { ...state, phone: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "profile_picture":
      return { ...state, profile_picture: action.payload };
    case "role":
      return { ...state, role: action.payload };
    case "snackmessage":
      return { ...state, snackmessage: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const initialseller_state = {
  name: "",
  street_address: "",
  city: "",
  business_type: "",
  opening_hour: "",
  citizenship_number: "",
  pan_number: "",
  logo: null,
  rating: 0,
  is_active: false,
};



const seller_reducer = (seller_state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...seller_state,
        [action.key]: action.payload, // Updated to allow key-based updates
      };
    case "CLEAR":
      return initialseller_state; // Reset to initial state
    default:
      return seller_state;
  }
};


export const myContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user_reducer, userinitialState);
  const [seller_state, seller_dispatch] = useReducer(seller_reducer, initialseller_state);
  const [food_state, food_dispatch] = useReducer(
    food_reducer,
    initialfood_state
  );

  const [isLoading, setisLoading] = useState(false);
  const [isLogged, setisLogged] = useState(false);
  const [snackBar, setsnackBar] = useState(false);

  const fetchData = async () => {
    if (state.role === "customer") {
      const response = await get_data("get_user_details");
      if (response.success) {
        console.log(response.data);
        setisLogged(true);
        dispatch({ type: "name", payload: response.data.name });
        dispatch({ type: "phone", payload: response.data.phone });
        dispatch({ type: "email", payload: response.data.email });
        dispatch({ type: "role", payload: response.data.role });
        dispatch({
          type: "profile_picture",
          payload: response.data.profile_picture.startsWith("http")
            ? response.data.profile_picture
            : `http://192.168.1.64:5555${response.data.profile_picture}`,
        });
      } else {
        console.log(response.data);
      }
    }

    // return;

    const response = await get_data("get_restaurant");
    if (response.success) {
      console.log(response.data);

      Object.entries(response.data).forEach(([key, value]) => {
        if (initialseller_state.hasOwnProperty(key)) {
          seller_dispatch({ type: "SET_DATA", key, payload: value });
        }
      });
      
    } else {
      console.log("Error", response.data);
    }

    const responsebyfood = await get_data("get_all_food");
    if (responsebyfood.success) {
      console.log(
        "################get all food#####################------------>",
        responsebyfood.data
      );
      food_dispatch({ type: "SET_FOOD_LIST", payload: responsebyfood.data });
      console.log("food state is settt");
    } else {
      console.log("Error", responsebyfood.data);
    }
  };

  useEffect(() => {
  fetchData();
  }, []);



  const getting_restaurant_details = async (restaurant_id) => {
    const response = await get_data_with_id("get_specific_restaurant", { restaurant_name: restaurant_id });
    console.log('-----------restaurant_name by myContext Profile>>---------------------------', restaurant_id);
    if (response.success) {
      console.log('-----------data_with_id---------------------------', response.data);

      Object.entries(response.data).forEach(([key, value]) => {
        if (initialseller_state.hasOwnProperty(key)) {
          seller_dispatch({ type: "SET_DATA", key, payload: value });
        }
      });
      
    } else {
      console.log("Error", response.data);
    }
  }


  const clearAllData = async () => {
    await clearTokens();
    dispatch({ type: "RESET" });
    food_dispatch({ type: "CLEAR_FOOD" });
    seller_dispatch({ type: "CLEAR" });
    setsnackBar(false);
    setisLoading(false);
    setisLogged(false);
    console.log("All data cleared");
    console.log(state);
    console.log(initialState);
  };

  return (
    <myContext.Provider
      value={{
        state,
        dispatch,
        fetchData,
        clearAllData,
        isLoading,
        setisLoading,
        snackBar,
        setsnackBar,
        seller_state,
        seller_dispatch,
        initialseller_state,
        food_state,
        food_dispatch,
        isLogged,
        setisLogged,
        getting_restaurant_details,
      }}
    >
      {children}
    </myContext.Provider>
  );
};
