
import { get_data_with_id } from "../service";
export const getRestaurantFood = async (dispatcher,id) => {
  const responsebyfood = await get_data_with_id("get_food_by_restaurant",{restaurant_id:id});
  if (responsebyfood.success) {
    dispatcher({ type: "SET_FOOD_LIST", payload: responsebyfood.data });
    console.log("food state is settt");
  } else {
    console.log("Error", responsebyfood.data);
  }
};
