    import { get_data } from "../service";
    export const getRestaurantInformation = async (seller_dispatch) => {

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
    }
    