// export const initialfood_state = [];


// export const food_reducer = (state, action) => {
//   switch (action.type) {
//     case "SET_FOOD_LIST":
//       return action.payload; // Replace the state with the new food list array.

//     case "ADD_FOOD":
//       return [...state, action.payload]; // Add a new food item to the list.

//     case "REMOVE_FOOD":
//       return state.filter((item) => item.id !== action.payload); // Remove food by ID.

//     default:
//       throw new Error(`Unhandled action type: ${action.type}`);
//   }
// };

export const initialfood_state = [];

export const food_reducer = (state, action) => {
  switch (action.type) {
    case "SET_FOOD_LIST":
      return action.payload; // Replace the state with the new food list array.

    case "ADD_FOOD":
      // Prevent duplicates by checking if the ID already exists
      if (state.some((item) => item.id === action.payload.id)) {
        console.warn("Duplicate food ID detected. Use UPDATE_FOOD to edit items.");
        return state;
      }
      return [...state, action.payload]; // Add a new food item to the list.

    case "UPDATE_FOOD":
      // Update food details if ID matches
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );

    case "REMOVE_FOOD":
      return state.filter((item) => item.id !== action.payload); // Remove food by ID.

    case "CLEAR_FOOD":
      return initialfood_state; // Clear the food list.

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
