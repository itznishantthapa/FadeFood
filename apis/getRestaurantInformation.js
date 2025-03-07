    import { get_data, get_data_with_id } from "../service";
    export const getRestaurantInformation = async (seller_dispatch,id,initialseller_state) => {

        const response = id? await get_data_with_id("get_specific_restaurant", { restaurant_name: id }): await get_data("get_restaurant");
        if (response.success) {
          Object.entries(response.data).forEach(([key, value]) => {
            if (initialseller_state.hasOwnProperty(key)) {
              seller_dispatch({ type: "SET_DATA", key, payload: value });
            }
          });
          console.log('----res_info has been set------');
        } else {
          console.log("Error", response.data);
        }
    }
    