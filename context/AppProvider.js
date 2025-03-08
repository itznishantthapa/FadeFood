import React, { createContext, useEffect, useReducer, useState } from "react";
import { clearTokens, get_data_with_id } from "../service";
import { initialfood_state, food_reducer } from "./userReducerFood";
import { user_reducer, userinitialState } from "./useReducerUser";
import { initialseller_state, seller_reducer } from "./useReducerRestaurant";
import { getUserInformation } from "../apis/getUserInformation";
import { getRestaurantInformation } from "../apis/getRestaurantInformation";
import { getAllFood } from "../apis/getAllFoods";
import { getRestaurantFood } from "../apis/getRestaurantFood";
import { restaurantFoodInitialState, restaurantFoodReducer } from "./useReducerResFood";
export const myContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user_reducer, userinitialState);
  const [seller_state, seller_dispatch] = useReducer(
    seller_reducer,
    initialseller_state
  );
  const [food_state, food_dispatch] = useReducer(
    food_reducer,
    initialfood_state
  );
  const [restaurantFoodState, restaurantFoodDispatch] = useReducer(
    restaurantFoodReducer,
    restaurantFoodInitialState
  );
  const [isLoading, setisLoading] = useState(false);
  const [isLogged, setisLogged] = useState(false);

  const fetchData = async () => {
    if (state.role === "customer" ) {
      console.log('----------------------Executing the asyncronous function--------------')
      getUserInformation(dispatch, setisLogged);
      getAllFood(food_dispatch);
    }
    else{
      // handle funtion for the restaurant after chaning state.role to seller
    }

    // await getRestaurantFood(food_dispatch);

    /* 
    getRestaurant is here to fetch the data for the seller screen not for the customer view point or restaurantProfile screen
    here , we just have to make this function call according to the user(customer or seller) when the apps is start fist
    */

    await getRestaurantInformation(
      seller_dispatch,
      (id = null),
      initialseller_state
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clearAllData = async () => {
    await clearTokens();
    dispatch({ type: "RESET" });
    food_dispatch({ type: "CLEAR_FOOD" });
    seller_dispatch({ type: "CLEAR" });
    setisLoading(false);
    setisLogged(false);
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
        seller_state,
        seller_dispatch,
        initialseller_state,
        food_state,
        food_dispatch,
        isLogged,
        setisLogged,
        restaurantFoodDispatch,
        restaurantFoodState,
      }}
    >
      {children}
    </myContext.Provider>
  );
};
