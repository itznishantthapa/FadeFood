// UserContext.tsx
import React, { createContext, useEffect, useReducer, useState } from "react";
import { clearTokens, get_data, refreshAccessToken } from "../service";
import { initialfood_state, food_reducer } from "./FoodService";

const initialState = {
  name: "",
  phone: "",
  email: "",
  profile_picture: null,
  role: "customer",
  snackmessage: "",
};
const reducer = (state, action) => {
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
  return {
    ...seller_state,
    [action.type]: action.payload,
  };
};

export const myContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [seller_state, seller_dispatch] = useReducer(
    seller_reducer,
    initialseller_state
  );
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
          seller_dispatch({ type: key, payload: value });
        }
      });
    } else {
      console.log("Error", response.data);
    }

    const responsebyfood = await get_data("get_food");
    if (responsebyfood.success) {
      console.log(
        "#####################################------------>",
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

  const clearAllData = async () => {
    await clearTokens();
    dispatch({ type: "RESET" });
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
        food_state,
        food_dispatch,
        isLogged,
        setisLogged,
      }}
    >
      {children}
    </myContext.Provider>
  );
};
