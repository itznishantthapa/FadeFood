import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { scaleWidth, scaleHeight } from "../../Scaling"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react"

const { width } = Dimensions.get("window")

const AuthPrompt = ({ navigation, route }) => {
  const { message = "Join FadeFood to unlock full features!" } = route.params || {}


  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor('#dadada', true);  // Reset to white
      StatusBar.setBarStyle('dark-content', true);    // Ensure text is dark
    }, [])
  );


  const handleSignUp = () => {
    navigation.navigate("SignUp")
  }

  const handleLogin = () => {
    navigation.navigate("Login")
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/fadefood_logo.png")} // Make sure to add your app logo
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Welcome to FadeFood</Text>

        <Text style={styles.message}>{message}</Text>

        <View style={styles.features}>
          <FeatureItem icon="restaurant-outline" text="Order from top restaurants"  />
          <FeatureItem icon="timer-outline" text="Fast and reliable delivery" />
          <FeatureItem icon="gift-outline" text="Exclusive offers and discounts" />
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const FeatureItem = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <Ionicons name={icon} size={24} color="#333333" style={styles.featureIcon} />
    <Text style={styles.featureText}>{text}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#dadada'
  },
  content: {
    width: width * 0.9,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: scaleWidth(20),
    padding: scaleWidth(20),
  },
  logo: {
    width: scaleWidth(120),
    height: scaleWidth(120),
    marginBottom: scaleHeight(20),
  },
  title: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(24),
    color: "#333333",
    marginBottom: scaleHeight(10),
  },
  message: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#333333",
    textAlign: "center",
    marginBottom: scaleHeight(20),
  },
  features: {
    alignSelf: "stretch",
    marginBottom: scaleHeight(20),
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(10),
  },
  featureIcon: {
    marginRight: scaleWidth(10),
  },
  featureText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
  },
  signUpButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(25),
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(30),
    marginBottom: scaleHeight(10),
  },
  signUpButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#333333",
    textAlign: "center",
  },
  loginButton: {
    paddingVertical: scaleHeight(10),
  },
  loginButtonText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
    textAlign: "center",
  },
})

export default AuthPrompt

