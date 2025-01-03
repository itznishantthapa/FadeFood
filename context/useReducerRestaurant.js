export const initialseller_state = {
    name: "",
    street_address: "",
    city: "",
    business_type: "",
    opening_hour: "",
    citizenship_number: "",
    pan_number: "",
    logo: null,
    rating: 0,
    is_active: false,
  };
  
  
  
  export const seller_reducer = (seller_state, action) => {
    switch (action.type) {
      case "SET_DATA":
        return {
          ...seller_state,
          [action.key]: action.payload, 
        };
      case "CLEAR":
        return initialseller_state; 
      default:
        return seller_state;
    }
  };
  