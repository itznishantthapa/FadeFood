import { get_data } from "../service";
export const getUserInformation = async (dispatch, setisLogged) => {
  const response = await get_data("get_user_details");
  if (response.success) {
    setisLogged(true);
    dispatch({ type: "name", payload: response.data.name });
    dispatch({ type: "phone", payload: response.data.phone });
    dispatch({ type: "email", payload: response.data.email });
    dispatch({ type: "role", payload: response.data.role });
    dispatch({
      type: "profile_picture",
      payload: response.data.profile_picture.startsWith("http")
        ? response.data.profile_picture
        : `http://192.168.1.64:5555${response.data.profile_picture}`,
    });
  } else {
    console.log(response.data);
  }
};
