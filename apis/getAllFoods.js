import { get_data } from "../service";
export const getAllFood = async (food_dispatch) => {
  const responsebyfood = await get_data("get_all_food");
  if (responsebyfood.success) {
    food_dispatch({ type: "SET_FOOD_LIST", payload: responsebyfood.data });
    console.log('food data by getAllFood-------->',responsebyfood.data)
  } else {
    console.log("Error", responsebyfood.data);
  }
};
