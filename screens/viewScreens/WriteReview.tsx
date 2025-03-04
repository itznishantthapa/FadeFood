import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { myContext } from "../../context/AppProvider";
import { scaleHeight, scaleWidth } from "../../Scaling";
import NabBar from "../../components/home/NavBar";

const WriteReview = ({ navigation, route }) => {
  const { state, dispatch, setsnackBar } = useContext(myContext);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const foodDetails = route.params?.foodDetails;

  const handleSearchScreen = () => {
    navigation.navigate("SearchScreen");
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleAddImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert("Permission Required", "You need to allow access to your photos to add images to your review.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImages([...images, result.assets[0].uri]);
      }
    } catch (error) {
      console.log("Error picking image:", error);
      Alert.alert("Error", "There was an error selecting an image. Please try again.");
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Rating Required", "Please select a rating for your review.");
      return;
    }

    if (reviewText.trim().length < 5) {
      Alert.alert("Review Required", "Please write a review with at least 5 characters.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call to submit review
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Show success message
      setsnackBar(true);
      dispatch({ type: 'snackmessage', payload: 'Review submitted successfully!' });
      setTimeout(() => setsnackBar(false), 3000);
      
      // Navigate back to SeeReview screen
      navigation.goBack();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NabBar
        handleSearchScreen={handleSearchScreen}
        isBack={true}
        navigation={navigation}
        isTextInput={false}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Write a Review
          </Text>
          <Text style={styles.subtitle}>
            {foodDetails ? foodDetails.food_name : "Food Item"}
          </Text>
        </View>

        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionLabel}>Your Rating</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRatingChange(star)}
                style={styles.starButton}
              >
                <Ionicons
                  name={rating >= star ? "star" : "star-outline"}
                  size={32}
                  color={rating >= star ? "#FFB800" : "#CCCCCC"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Review Text Input */}
        <View style={styles.reviewTextSection}>
          <Text style={styles.sectionLabel}>Your Review</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Share your experience with this dish..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={reviewText}
            onChangeText={setReviewText}
          />
        </View>

        {/* Photo Upload Section */}
        <View style={styles.photoSection}>
          <Text style={styles.sectionLabel}>Add Photos</Text>
          <Text style={styles.photoSubtitle}>Share photos of your meal (optional)</Text>
          
          <View style={styles.imagesContainer}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.uploadedImage} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => handleRemoveImage(index)}
                >
                  <Ionicons name="close-circle" size={24} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            ))}
            
            {images.length < 3 && (
              <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddImage}>
                <Ionicons name="camera-outline" size={32} color="#666" />
                <Text style={styles.addPhotoText}>Add Photo</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (rating === 0 || reviewText.trim().length < 5) && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting || rating === 0 || reviewText.trim().length < 5}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Review</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  scrollContent: {
    padding: scaleWidth(16),
  },
  header: {
    marginBottom: scaleHeight(20),
  },
  title: {
    fontSize: scaleWidth(22),
    fontWeight: "bold",
    color: "#2E2E2E",
  },
  subtitle: {
    fontSize: scaleWidth(16),
    color: "#666",
    marginTop: scaleHeight(4),
  },
  sectionLabel: {
    fontSize: scaleWidth(16),
    fontWeight: "600",
    color: "#2E2E2E",
    marginBottom: scaleHeight(8),
  },
  ratingSection: {
    marginBottom: scaleHeight(24),
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starButton: {
    marginRight: scaleWidth(8),
  },
  reviewTextSection: {
    marginBottom: scaleHeight(24),
  },
  reviewInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(12),
    padding: scaleWidth(12),
    fontSize: scaleWidth(16),
    minHeight: scaleHeight(120),
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  photoSection: {
    marginBottom: scaleHeight(24),
  },
  photoSubtitle: {
    fontSize: scaleWidth(14),
    color: "#666",
    marginBottom: scaleHeight(12),
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageContainer: {
    position: "relative",
    marginRight: scaleWidth(12),
    marginBottom: scaleHeight(12),
  },
  uploadedImage: {
    width: scaleWidth(100),
    height: scaleHeight(100),
    borderRadius: scaleWidth(8),
  },
  removeImageButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 0,
  },
  addPhotoButton: {
    width: scaleWidth(100),
    height: scaleHeight(100),
    borderRadius: scaleWidth(8),
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
  },
  addPhotoText: {
    marginTop: scaleHeight(4),
    fontSize: scaleWidth(12),
    color: "#666",
  },
  submitButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: scaleHeight(14),
    borderRadius: scaleWidth(25),
    alignItems: "center",
    marginTop: scaleHeight(16),
  },
  submitButtonDisabled: {
    backgroundColor: "#FFB5B5",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: scaleWidth(16),
    fontWeight: "600",
  },
});

export default WriteReview;