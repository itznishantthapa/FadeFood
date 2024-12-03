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
    state.role === "customer" && await getUserInformation(dispatch, setisLogged);
      //correct stetup
      // await  getRestaurantInformation(seller_dispatch , id = null, initialseller_state); 
      await getAllFood(food_dispatch);
  };

  useEffect(() => {
  fetchData();
  }, []);

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
      }}
    >
      {children}
    </myContext.Provider>
  );
};
