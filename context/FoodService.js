export const initialfood_state = [];


export const food_reducer = (state, action) => {
  switch (action.type) {
    case "SET_FOOD_LIST":
      return action.payload; // Replace the state with the new food list array.

    case "ADD_FOOD":
      return [...state, action.payload]; // Add a new food item to the list.

    case "REMOVE_FOOD":
      return state.filter((item) => item.id !== action.payload); // Remove food by ID.

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
