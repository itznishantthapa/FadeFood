import React, { createContext, useEffect, useReducer, useState } from "react";
import { clearTokens, get_data_with_id } from "../service";
import { initialfood_state, food_reducer } from "./userReducerFood";
import { user_reducer, userinitialState } from "./useReducerUser";
import { initialseller_state, seller_reducer } from "./useReducerRestaurant";
import {getUserInformation} from "../apis/getUserInformation";
import { getRestaurantInformation } from "../apis/getRestaurantInformation";
import { getAllFood } from "../apis/getAllFoods";
export const myContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user_reducer, userinitialState);
  const [seller_state, seller_dispatch] = useReducer(seller_reducer, initialseller_state);
  const [food_state, food_dispatch] = useReducer(food_reducer,initialfood_state);
  const [isLoading, setisLoading] = useState(false);
  const [isLogged, setisLogged] = useState(false);
  const [snackBar, setsnackBar] = useState(false);

  const fetchData = async () => {
    if (state.role === "customer") {
      await getUserInformation(dispatch, setisLogged);
    }
      await  getRestaurantInformation(seller_dispatch);
      await getAllFood(food_dispatch);
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
    console.log(userinitialState);
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
