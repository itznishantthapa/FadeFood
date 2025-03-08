"use client"

import React, { useState, useContext, useRef, useReducer } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
  FlatList,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons, MaterialIcons, Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { scaleHeight, scaleWidth } from "../Scaling"
import { myContext } from "../context/AppProvider"
import { post_data_with_img } from "../service"

// Predefined food categories
const FOOD_CATEGORIES = [
  "Main Course",
  "Appetizer",
  "Dessert",
  "Drinks",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
  "Vegan",
  "Specialty",
]

// Initial state for the form
const initial_food_state = {
  food_name: "",
  description: "",
  food_price: "",
  preparation_time: "",
  is_vegetarian: false,
  category: "",
  image: [],
  errors: {
    food_name: "",
    price: "",
    category: "",
    images: "",
  },
}

// restaurant_name = models.ForeignKey(restaurant, on_delete=models.CASCADE,related_name='food')
// food_restaurant = models.CharField(max_length=100,blank=True, null=True)
// food_location = models.CharField(max_length=100,blank=True, null=True)
// food_name = models.CharField(max_length=100,blank=True, null=True)
// food_food_price= models.CharField(max_length=10,blank=True, null=True)
// rating = models.FloatField(default=0.0,blank=True, null=True)
// reviews = models.IntegerField(default=0)
// is_available = models.BooleanField(default=True)
// totol_eats = models.IntegerField(default=0)
// category = models.CharField(max_length=100,blank=True, null=True,default='')
// discount = models.FloatField(default=0.0,blank=True, null=True)
// preparation_time=models.IntegerField(default=0)
// is_vegetarian=models.BooleanField(default=False)
// description=models.TextField(default='')

// Action types
const ACTION_TYPES = {
  SET_FOOD_NAME: "SET_FOOD_NAME",
  SET_DESCRIPTION: "SET_DESCRIPTION",
  SET_PRICE: "SET_PRICE",
  SET_PREPARATION_TIME: "SET_PREPARATION_TIME",
  TOGGLE_VEGETARIAN: "TOGGLE_VEGETARIAN",
  SET_CATEGORY: "SET_CATEGORY",
  ADD_IMAGE: "ADD_IMAGE",
  REMOVE_IMAGE: "REMOVE_IMAGE",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  RESET_FORM: "RESET_FORM",
}

// Reducer function
const formReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_FOOD_NAME:
      return {
        ...state,
        food_name: action.payload,
        errors: {
          ...state.errors,
          food_name: action.payload.trim() ? "" : state.errors.food_name,
        },
      }
    case ACTION_TYPES.SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      }
    case ACTION_TYPES.SET_PRICE:
      return {
        ...state,
        price: action.payload,
        errors: {
          ...state.errors,
          price:
            action.payload.trim() && !isNaN(Number.parseFloat(action.payload)) && Number.parseFloat(action.payload) > 0
              ? ""
              : state.errors.price,
        },
      }
    case ACTION_TYPES.SET_PREPARATION_TIME:
      return {
        ...state,
        preparation_time: action.payload,
      }
    case ACTION_TYPES.TOGGLE_VEGETARIAN:
      return {
        ...state,
        is_vegetarian: !state.is_vegetarian,
      }
    case ACTION_TYPES.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        errors: {
          ...state.errors,
          category: "",
        },
      }
    case ACTION_TYPES.ADD_IMAGE:
      return {
        ...state,
        image: [...state.image, action.payload],
        errors: {
          ...state.errors,
          images: "",
        },
      }
    case ACTION_TYPES.REMOVE_IMAGE:
      return {
        ...state,
        image: state.image.filter((_, index) => index !== action.payload),
      }
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message,
        },
      }
    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: "",
        },
      }
    case ACTION_TYPES.RESET_FORM:
      return initial_food_state
    default:
      return state
  }
}

const AddFood = ({ navigation }) => {
  // const { food_state, food_dispatch } = useContext(myContext);
  const { seller_state,food_dispatch } = useContext(myContext)
  const [state, dispatch] = useReducer(formReducer, initial_food_state)

  // UI state
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  // Animation values
  const dropdownHeight = useRef(new Animated.Value(0)).current
  const formOpacity = useRef(new Animated.Value(0)).current
  const formTranslateY = useRef(new Animated.Value(20)).current

  // Animate form entrance
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(formTranslateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  // Toggle category dropdown
  const toggleCategoryDropdown = () => {
    if (showCategoryDropdown) {
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setShowCategoryDropdown(false))
    } else {
      setShowCategoryDropdown(true)
      Animated.timing(dropdownHeight, {
        toValue: Math.min(FOOD_CATEGORIES.length * 50, 250),
        duration: 300,
        useNativeDriver: false,
      }).start()
    }
  }

  // Select category
  const selectCategory = (category) => {
    dispatch({ type: ACTION_TYPES.SET_CATEGORY, payload: category })
    toggleCategoryDropdown()
  }

  // Pick image from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Sorry, we need camera roll permissions to upload images.")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (!result.canceled) {
      // Add the new image to the state
      dispatch({
        type: ACTION_TYPES.ADD_IMAGE,
        payload: {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          name: `food-image-${Date.now()}.jpg`,
        },
      })
    }
  }

  // Remove image
  const removeImage = (index) => {
    dispatch({ type: ACTION_TYPES.REMOVE_IMAGE, payload: index })
  }

  // Validate form
  const validateForm = () => {
    let isValid = true

    if (!state.food_name.trim()) {
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        field: "food_name",
        message: "Food name is required",
      })
      isValid = false
    }

    if (!state.price.trim()) {
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        field: "price",
        message: "food_priceis required",
      })
      isValid = false
    } else if (isNaN(Number.parseFloat(state.price)) || Number.parseFloat(state.price) <= 0) {
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        field: "price",
        message: "food_pricemust be a valid number greater than 0",
      })
      isValid = false
    }

    if (!state.category) {
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        field: "category",
        message: "Category is required",
      })
      isValid = false
    }

    if (state.image.length === 0) {
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        field: "images",
        message: "At least one image is required",
      })
      isValid = false
    }

    return isValid
  }

  // Handle save
  const handleSave = async() => {
    if (validateForm()) {
      // Prepare data for backend
      const foodData = {
        food_name: state.food_name,
        description: state.description,
        food_price: Number.parseFloat(state.price),
        preparation_time: state.preparation_time ? Number.parseInt(state.preparation_time) : 30,
        is_vegetarian: state.is_vegetarian,
        category: state.category,
        restaurant_id: seller_state.id,
      }

      console.log("Food data to be sent to backend:", foodData)
      console.log('food images-------->',state.image)
      const response = await post_data_with_img('add_food', foodData, state.image, 'POST');

      if (response.success) {
        food_dispatch({ type: "ADD_FOOD", payload: response.data });
        // navigation.navigate('Menu');
        response.data.images.forEach((img, index) => {
          console.log(`Image ${index + 1}:`, img);
          console.log('Image URL:', img.image);
          console.log('Image ID:', img.id);
        });
      }
 
      // Here you would typically call an API to save the food item
      // For now, we'll just show a success message and navigate back
      Alert.alert("Success", `${state.food_name} has been added to your menu.`, [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ])
    }
  }

  // Render image item
  const renderImageItem = ({ item, index }) => (
    <View style={styles.imageItem}>
      <Image source={{ uri: item.uri }} style={styles.imageThumbnail} />
      <TouchableOpacity style={styles.removeImageButton} onPress={() => removeImage(index)}>
        <Ionicons name="close-circle" size={24} color="#F44336" />
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Item</Text>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            style={[
              styles.formContainer,
              {
                opacity: formOpacity,
                transform: [{ translateY: formTranslateY }]
              }
            ]}
          >
            {/* Multiple Image Upload Section */}
            <View style={styles.imageUploadSection}>
              <Text style={styles.sectionTitle}>Food Images</Text>
              
              <View style={styles.imagesContainer}>
                {state.image.length > 0 ? (
                  <FlatList
                    data={state.image}
                    renderItem={renderImageItem}
                    keyExtractor={(item, index) => `image-${index}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.imagesList}
                    ListFooterComponent={
                      state.image.length < 5 ? (
                        <TouchableOpacity 
                          style={styles.addMoreImagesButton}
                          onPress={pickImage}
                        >
                          <Feather name="plus" size={30} color="#757575" />
                          <Text style={styles.addMoreText}>Add More</Text>
                        </TouchableOpacity>
                      ) : null
                    }
                  />
                ) : (
                  <TouchableOpacity 
                    style={styles.imageUpload}
                    onPress={pickImage}
                  >
                    <Feather name="image" size={40} color="#CCCCCC" />
                    <Text style={styles.uploadText}>Upload Images</Text>
                    <Text style={styles.uploadSubtext}>Add up to 5 images</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              {state.errors.images ? (
                <Text style={styles.errorText}>{state.errors.images}</Text>
              ) : null}
            </View>
            
            {/* Form Fields */}
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Basic Information</Text>
              
              {/* Food Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Food Name*</Text>
                <TextInput
                  style={[styles.textInput, state.errors.food_name? styles.inputError : null]}
                  placeholder="Enter food name"
                  value={state.food_name}
                  onChangeText={(text) => dispatch({ type: ACTION_TYPES.SET_FOOD_NAME, payload: text })}
                />
                {state.errors.food_name? (
                  <Text style={styles.errorText}>{state.errors.food_name}</Text>
                ) : null}
              </View>
              
              {/* Category */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Category*</Text>
                <TouchableOpacity 
                  style={[
                    styles.categorySelector, 
                    state.errors.category ? styles.inputError : null
                  ]}
                  onPress={toggleCategoryDropdown}
                >
                  <Text style={[
                    styles.categoryText,
                    !state.category && styles.placeholderText
                  ]}>
                    {state.category || 'Select a category'}
                  </Text>
                  <MaterialIcons 
                    name={showCategoryDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                    size={24} 
                    color="#757575" 
                  />
                </TouchableOpacity>
                {state.errors.category ? (
                  <Text style={styles.errorText}>{state.errors.category}</Text>
                ) : null}
                
                {showCategoryDropdown && (
                  <Animated.View 
                    style={[
                      styles.dropdownContainer,
                      { height: dropdownHeight }
                    ]}
                  >
                    <ScrollView 
                      nestedScrollEnabled={true}
                      showsVerticalScrollIndicator={false}
                    >
                      {FOOD_CATEGORIES.map((category, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.dropdownItem,
                            state.category === category && styles.selectedDropdownItem
                          ]}
                          onPress={() => selectCategory(category)}
                        >
                          <Text style={[
                            styles.dropdownItemText,
                            state.category === category && styles.selectedDropdownItemText
                          ]}>
                            {category}
                          </Text>
                          {state.category === category && (
                            <Ionicons name="checkmark" size={20} color="#4CAF50" />
                          )}
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </Animated.View>
                )}
              </View>
              
              {/* food_price*/}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Price*</Text>
                <View style={[
                  styles.priceInputContainer,
                  state.errors.food_price? styles.inputError : null
                ]}>
                  <Text style={styles.currencySymbol}>₹</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="0.00"
                    keyboardType="numeric"
                    value={state.price}
                    onChangeText={(text) => dispatch({ type: ACTION_TYPES.SET_PRICE, payload: text })}
                  />
                </View>
                {state.errors.food_price? (
                  <Text style={styles.errorText}>{state.errors.price}</Text>
                ) : null}
              </View>
              
              {/* Preparation Time */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Preparation Time (minutes)</Text>
                <View style={styles.timeInputContainer}>
                  <TextInput
                    style={styles.timeInput}
                    placeholder="30"
                    keyboardType="numeric"
                    value={state.preparation_time}
                    onChangeText={(text) => dispatch({ type: ACTION_TYPES.SET_PREPARATION_TIME, payload: text })}
                  />
                  <Text style={styles.timeUnit}>min</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Additional Details</Text>
              
              {/* Description */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={styles.textAreaInput}
                  placeholder="Describe your food item..."
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={state.description}
                  onChangeText={(text) => dispatch({ type: ACTION_TYPES.SET_DESCRIPTION, payload: text })}
                />
              </View>
              
              {/* Vegetarian Toggle */}
              <View style={styles.toggleContainer}>
                <View style={styles.toggleInfo}>
                  <MaterialCommunityIcons 
                    name="leaf" 
                    size={24} 
                    color={state.is_vegetarian ? "#4CAF50" : "#757575"} 
                  />
                  <Text style={styles.toggleLabel}>Vegetarian</Text>
                </View>
                <Switch
                  trackColor={{ false: "#767577", true: "#A5D6A7" }}
                  thumbColor={state.is_vegetarian ? "#4CAF50" : "#F4F3F4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => dispatch({ type: ACTION_TYPES.TOGGLE_VEGETARIAN })}
                  value={state.is_vegetarian}
                />
              </View>
            </View>
            
            {/* Restaurant Info */}
            <View style={styles.restaurantInfoContainer}>
              <Text style={styles.restaurantInfoText}>
                {`This item will be added to ${seller_state.name || 'your restaurant'}'s menu.`}
              </Text>
            </View>
            
            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.addButton}
                onPress={handleSave}
              >
                <Text style={styles.addButtonText}>Add Item</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(12),
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    padding: scaleWidth(8),
  },
  headerTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(18),
    color: "#333333",
  },
  saveButton: {
    padding: scaleWidth(8),
  },
  saveButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#4CAF50",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: scaleWidth(16),
  },
  imageUploadSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(10),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#333333",
    marginBottom: scaleHeight(16),
  },
  imagesContainer: {
    minHeight: scaleHeight(150),
  },
  imagesList: {
    paddingRight: scaleWidth(16),
  },
  imageItem: {
    position: "relative",
    marginRight: scaleWidth(12),
  },
  imageThumbnail: {
    width: scaleWidth(120),
    height: scaleWidth(120),
    borderRadius: scaleWidth(8),
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  removeImageButton: {
    position: "absolute",
    top: -scaleHeight(8),
    right: -scaleWidth(8),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(12),
  },
  addMoreImagesButton: {
    width: scaleWidth(120),
    height: scaleWidth(120),
    borderRadius: scaleWidth(8),
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  addMoreText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#757575",
    marginTop: scaleHeight(4),
  },
  imageUpload: {
    width: "100%",
    height: scaleHeight(150),
    borderRadius: scaleWidth(8),
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
  },
  uploadText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#757575",
    marginTop: scaleHeight(8),
  },
  uploadSubtext: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#9E9E9E",
    marginTop: scaleHeight(4),
  },
  formSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(10),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: scaleHeight(16),
  },
  inputLabel: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
    marginBottom: scaleHeight(8),
  },
  textInput: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#333333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scaleWidth(8),
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(10),
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#F44336",
  },
  errorText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#F44336",
    marginTop: scaleHeight(4),
  },
  categorySelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scaleWidth(8),
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(12),
    backgroundColor: "#FFFFFF",
  },
  categoryText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#333333",
  },
  placeholderText: {
    color: "#9E9E9E",
  },
  dropdownContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scaleWidth(8),
    marginTop: scaleHeight(4),
    overflow: "hidden",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  selectedDropdownItem: {
    backgroundColor: "#E8F5E9",
  },
  dropdownItemText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#333333",
  },
  selectedDropdownItemText: {
    fontFamily: "poppins_semibold",
    color: "#4CAF50",
  },
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scaleWidth(8),
    paddingHorizontal: scaleWidth(12),
    backgroundColor: "#FFFFFF",
  },
  currencySymbol: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#333333",
    marginRight: scaleWidth(4),
  },
  priceInput: {
    flex: 1,
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#333333",
    paddingVertical: scaleHeight(10),
  },
  timeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scaleWidth(8),
    paddingHorizontal: scaleWidth(12),
    backgroundColor: "#FFFFFF",
  },
  timeInput: {
    flex: 1,
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#333333",
    paddingVertical: scaleHeight(10),
  },
  timeUnit: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#757575",
  },
  textAreaInput: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#333333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: scaleWidth(8),
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(10),
    backgroundColor: "#FFFFFF",
    minHeight: scaleHeight(100),
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scaleHeight(8),
  },
  toggleInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleLabel: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(16),
    color: "#333333",
    marginLeft: scaleWidth(8),
  },
  restaurantInfoContainer: {
    backgroundColor: "#E8F5E9",
    borderRadius: scaleWidth(8),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(20),
  },
  restaurantInfoText: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(14),
    color: "#4CAF50",
    textAlign: "center",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleHeight(30),
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: scaleWidth(8),
    paddingVertical: scaleHeight(14),
    marginRight: scaleWidth(8),
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#757575",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    borderRadius: scaleWidth(8),
    paddingVertical: scaleHeight(14),
    marginLeft: scaleWidth(8),
    alignItems: "center",
  },
  addButtonText: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#FFFFFF",
  },
})

export default AddFood

