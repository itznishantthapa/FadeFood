import { CommonActions } from "@react-navigation/native";
import { Alert } from "react-native";
export const handleLogout = async (
  setisLoading,
  clearAllData,
  navigation,
  isSeller
) => {
  Alert.alert(
    "",
    "Are you want to logout?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          setisLoading(true);
          await clearAllData();
          setisLoading(false);
          if (isSeller) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "LoginScreens" }],
              })
            );
          } else {
            navigation.navigate("TabBars", { screen: "Home" });
          }
        },
      },
    ],
    { cancelable: false }
  );
};
