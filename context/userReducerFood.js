export const initialfood_state = [];

export const food_reducer = (state, action) => {
  switch (action.type) {
    case "SET_FOOD_LIST":
      return action.payload; 

    case "ADD_FOOD":
      if (state.some((item) => item.id === action.payload.id)) {
        console.warn("Duplicate food ID detected. Use UPDATE_FOOD to edit items.");
        return state;
      }
      return [...state, action.payload]; 
    case "UPDATE_FOOD":
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );

    case "REMOVE_FOOD":
      return state.filter((item) => item.id !== action.payload); 

    case "CLEAR_FOOD":
      return initialfood_state; 

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
