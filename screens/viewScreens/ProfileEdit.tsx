"use client"

import { useContext, useState, useEffect } from "react"
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native"
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons"
import { scaleWidth, scaleHeight } from "../../Scaling"
import { myContext } from "../../context/AppProvider"
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import * as ImagePicker from 'expo-image-picker'
import { update_data } from "../../service"

const ProfileEdit = ({ navigation }) => {
  const { state, setisLoading, updateUserProfile,dispatch } = useContext(myContext)
  
  // Initial form state from context
  const [formData, setFormData] = useState({
    name: state.name || "",
    email: state.email || "",
    phone: state.phone || "",
    address: state.address || "",
    profile_pic: state.profile_pic || "https://via.placeholder.com/150",
  })

  // Track if form has been modified
  const [isModified, setIsModified] = useState(false)
  
  // Handle text input changes
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
    dispatch({ type: field, payload: value })
    setIsModified(true)
  }
  // Handle profile picture selection
  const handlePickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
      
      if (permissionResult.granted === false) {
        Alert.alert("Permission Required", "You need to grant access to your photos to change profile picture.")
        return
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })
      
      if (!result.canceled) {
        setFormData({
          ...formData,
          profile_pic: result.assets[0].uri
        })
        setIsModified(true)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select image. Please try again.")
      console.error("Image picker error:", error)
    }
  }
  
  // Handle save changes
  const handleSaveChanges = async () => {
    if (!formData.name.trim()) {
      Alert.alert("Validation Error", "Name cannot be empty")
      return
    }
    
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      Alert.alert("Validation Error", "Please enter a valid email address")
      return
    }
    
    if (!formData.phone.trim()) {
      Alert.alert("Validation Error", "Phone number cannot be empty")
      return
    }
    
    try {
      setisLoading(true)
      
      // Here you would typically call your API to update the user profile
      // For this example, we'll assume updateUserProfile is a context function 
      // that handles the API call and state update
      // await updateUserProfile(formData)
      update_data('edit_user_details',formData);
      
      setisLoading(false)
      setIsModified(false)
      
      Alert.alert(
        "Success", 
        "Profile updated successfully",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      )
    } catch (error) {
      setisLoading(false)
      Alert.alert("Error", "Failed to update profile. Please try again.")
      console.error("Update profile error:", error)
    }
  }
  
  // Email validation helper
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }
  
  // Confirmation before discarding changes
  const handleCancel = () => {
    if (isModified) {
      Alert.alert(
        "Discard Changes",
        "Are you sure you want to discard your changes?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Discard", onPress: () => navigation.goBack() }
        ]
      )
    } else {
      navigation.goBack()
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.container}>
           <LinearGradient colors={['#ffffff', '#F0F4F8']} style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
                <Ionicons name="chevron-back" size={24} color="#333333" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Edit Profile</Text>
              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={handleSaveChanges}
                disabled={!isModified}
              >
                <Text style={[styles.saveButtonText, !isModified && styles.saveButtonDisabled]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: formData.profile_pic }} 
              style={styles.profileImage} 
            />
            <TouchableOpacity 
              style={styles.editImageButton} 
              onPress={handlePickImage}
            >
              <Feather name="camera" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#4CAF50" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={formData.name}
                  onChangeText={(text) => handleChange("name", text)}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9E9E9E"
                />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="email" size={20} color="#4CAF50" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                  placeholder="Enter your email address"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={20} color="#4CAF50" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={formData.phone}
                  onChangeText={(text) => handleChange("phone", text)}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address</Text>
              <View style={[styles.inputWrapper,{alignItems:'flex-start'}]}>
                <Ionicons name="location-outline" size={20} color="#4CAF50" style={[styles.inputIcon,{paddingTop:10}]} />
                <TextInput
                  style={[styles.textInput, styles.textAreaInput]}
                  value={formData.address}
                  onChangeText={(text) => handleChange("address", text)}
                  placeholder="Enter your address"
                  placeholderTextColor="#9E9E9E"
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  header: {
    padding: scaleWidth(20),
    paddingBottom: scaleHeight(25),
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: scaleWidth(5),
  },
  headerTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(18),
    color: "#333333",
  },
  saveButton: {
    padding: scaleWidth(5),
  },
  saveButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#333333",
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: scaleHeight(-30),
  },
  profileImage: {
    width: scaleWidth(100),
    height: scaleWidth(100),
    borderRadius: scaleWidth(50),
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: scaleWidth(135),
    backgroundColor: "#4CAF50",
    borderRadius: scaleWidth(15),
    width: scaleWidth(30),
    height: scaleWidth(30),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(10),
    margin: scaleWidth(20),
    marginTop: scaleHeight(20),
    padding: scaleWidth(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: scaleHeight(15),
  },
  inputLabel: {
    fontFamily: "poppins_bold",
    fontSize: scaleWidth(14),
    color: "#333333",
    marginBottom: scaleHeight(5),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scaleWidth(8),
    paddingHorizontal: scaleWidth(10),
    backgroundColor: "#F9F9F9",
  },
  inputIcon: {
    marginRight: scaleWidth(10),
  },
  textInput: {
    flex: 1,
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
    paddingVertical: scaleHeight(10),
  },
  textAreaInput: {
    minHeight: scaleHeight(80),
    textAlignVertical: "top",
    paddingTop: scaleHeight(10),
  },
})

export default ProfileEdit