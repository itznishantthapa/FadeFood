import React, { useContext, useState } from "react";
import { myContext } from "../../context/AppProvider";
import ChatContent from "./ChatContent";
import AuthPrompt from "../viewScreens/AuthPrompt";

const Chat = ({ navigation }) => {
  const { isLogged } = useContext(myContext)
  return (
    <>
      {isLogged ? (<ChatContent navigation={navigation} />) : (<AuthPrompt navigation={navigation} />)}

    </>
  );
};
export default Chat;
