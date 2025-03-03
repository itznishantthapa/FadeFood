"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Dimensions, Keyboard } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { scaleWidth, scaleHeight } from "../../Scaling"
import { AntDesign } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"

const { width, height } = Dimensions.get("window")

const AuthPrompt = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
    ]).start()
  }, [fadeAnim, slideAnim])

  const handleLogin = () => {
    navigation.navigate("LoginScreens")
  }
  const handleBackButton = () => {
    Keyboard.dismiss();
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <LinearGradient colors={["#FFFFFF", "#F0F4F8"]} style={styles.container}>
        <TouchableOpacity onPress={handleBackButton} style={{ position: 'absolute', top: scaleHeight(20), left: scaleWidth(20), zIndex: 999 }}>
          <AntDesign
            name='arrowleft'
            size={scaleWidth(30)}
            style={{ color: '#333333' }}
          />
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <IntroText
            headingText="Hi Foodie,"
            line1="Sign in to feast on your"
            line2="fadefood delights"
            style={styles.bigTextForLogin}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>

    </SafeAreaView>
  )
}

const IntroText = ({ headingText, line1, line2, style }) => (
  <View style={style}>
    <Text style={styles.heading}>{headingText}</Text>
    <Text style={styles.line}>{line1}</Text>
    <Text style={styles.line}>{line2}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: width * 0.9,
    alignItems: "center",
  },
  bigTextForLogin: {
    marginBottom: scaleHeight(40),
  },
  heading: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(32),
    color: "#333333",
    marginBottom: scaleHeight(16),
    textAlign: "center",
  },
  line: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(18),
    color: "#4A4A4A",
    textAlign: "center",
    lineHeight: scaleHeight(28),
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    borderRadius: scaleWidth(30),
    paddingVertical: scaleHeight(16),
    paddingHorizontal: scaleWidth(60),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(18),
    color: "#FFFFFF",
    textAlign: "center",
  },
})

export default AuthPrompt

