// {"business_type": "Restaurant and Cafe", "citizenship_number": "123-13344-23", "city": "Dharan-1", "id": 1, "is_active": true, "latitude": 26.822, "logo": "/media/restaurants/logos/istockphoto-981368726-612x612.jpg", "longitude": 87.247, "name": "Delicious Restaurant", "opening_hour": "5am-5pm", "owner": 1, "pan_number": "0193849324", "rating": 4.3, "restaurant_images": null, "street_address": "Bhanu-chowk"}

export const initialseller_state = {
    name: "",
    street_address: "",
    phone: "",
    city: "",
    business_type: "",
    opening_hour: "",
    citizenship_number: "",
    pan_number: "",
    logo: null,
    cover_image: null,
    rating: 0,
    is_active: false,
    longitude: "",
    latitude: "",
    owner: "",
  };
  
  
  
  export const seller_reducer = (seller_state, action) => {
    switch (action.type) {
      case "SET_MULTIPLE_DATA":
        return {
          ...seller_state,
          ...action.payload, // Merge all key-value pairs from payload
        };
      case "CLEAR":
        return initialseller_state;
      default:
        return seller_state;
    }
  }; 