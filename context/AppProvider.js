// UserContext.tsx
import React, { createContext, useEffect, useReducer, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { get_data } from '../service';
import { Alert } from 'react-native';


const initialState = {
  name: '',
  phone: '',
  email: '',
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'phone':
      return { ...state, phone: action.payload };
    case 'email':
      return { ...state, email: action.payload };
    default:
      return state;
  }
};
export const myContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userData, setuserData] = useState(null)
  const [imageURI, setImageURI] = useState(null);






  const fetchData = async () => {
    const response = await get_data("user_details");  // Call the GET function
    if (response.success) {
      console.log(response.data);  // Set data to state if successful
      setuserData(response.data)
      dispatch({ type: 'name', payload: response.data.name })
      dispatch({ type: 'phone', payload: response.data.phone })
      dispatch({ type: 'email', payload: response.data.email })
      setImageURI( `http://192.168.1.64:5555/${response.data.profile_pic }`) 
    } else {
      console.log(response.data);  // Set error message if failed
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <myContext.Provider value={{ state,userData, setImageURI,dispatch, imageURI }}>
      {children}
    </myContext.Provider>
  );
};