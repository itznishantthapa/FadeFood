import { get_data } from "../service";
export const getAllFood = async (food_dispatch) => {
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
