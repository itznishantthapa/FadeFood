export const userinitialState = {
    name: "",
    phone: "",
    email: "",
    profile_picture: null,
    role: "customer",
    snackmessage: "",
  };
  export const user_reducer = (state, action) => {
    switch (action.type) {
      case "name":
        return { ...state, name: action.payload };
      case "phone":
        return { ...state, phone: action.payload };
      case "email":
        return { ...state, email: action.payload };
      case "profile_picture":
        return { ...state, profile_picture: action.payload };
      case "role":
        return { ...state, role: action.payload };
      case "snackmessage":
        return { ...state, snackmessage: action.payload };
      case "RESET":
        return userinitialState;
      default:
        return state;
    }
  };