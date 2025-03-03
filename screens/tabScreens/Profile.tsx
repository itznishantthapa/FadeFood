"use client"
import { useContext } from "react"
import { View } from "react-native"
import { myContext } from "../../context/AppProvider"
import ProfileContent from "./ProfileContent"
import AuthPrompt from "../viewScreens/AuthPrompt"


const Profile = ({ navigation }) => {
  const { state, isLogged } = useContext(myContext)
  return (
    <>
      { isLogged ? (<ProfileContent navigation={navigation} />) : (<AuthPrompt navigation={navigation}/>) }

    </>

  )
}

export default Profile

