import { useContext } from "react";
import { myContext } from "../../context/AppProvider";
import AuthPrompt from "../viewScreens/AuthPrompt";
import FavouriteContent from "./FavouriteContent";


const Favourite = ({ navigation }) => {

  const { isLogged } = useContext(myContext)
  return (
    <>
      {isLogged ? (<FavouriteContent navigation={navigation} />) : (<AuthPrompt navigation={navigation} />)}

    </>
  );
};

export default Favourite;