import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { myContext } from "../../context/AppProvider";
import { scaleHeight, scaleWidth } from "../../Scaling";
import NabBar from "../../components/home/NavBar";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const ReviewItem = ({ review }) => {
  // Function to format date (assuming review.date is a timestamp or date string)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.userInfo}>
          <Image
            source={
              review.userImage
                ? { uri: review.userImage }
                : require("../../assets/momo.jpeg")
            }
            style={styles.userImage}
          />
          <View>
            <Text style={styles.userName}>{review.userName}</Text>
            <Text style={styles.reviewDate}>
              {review.date ? formatDate(review.date) : "Recent"}
            </Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating} ★</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
      {review.images && review.images.length > 0 && (
        <FlatList
          horizontal
          data={review.images}
          keyExtractor={(item, index) => `review-image-${index}`}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.reviewImage} />
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.imageList}
        />
      )}
    </View>
  );
};

const SeeReview = ({ navigation, route }) => {
  const { state, dispatch } = useContext(myContext);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [foodDetails, setFoodDetails] = useState(null);

  useEffect(() => {
    if (route.params?.foodDetails) {
      setFoodDetails(route.params.foodDetails);
      
      // Simulating API call to fetch reviews
      // Replace this with your actual API call to get reviews
      setTimeout(() => {
        // Sample mock data - replace with your actual data
        const mockReviews = [
          {
            id: "1",
            userName: "John D.",
            userImage: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 4.8,
            date: "2025-02-15T12:00:00",
            text: "Amazing momos! The sauce was perfect and the service was excellent. Will definitely order again. The portion size was also generous.",
            images: [
              "https://images.unsplash.com/photo-1625398407937-2c806d080238",
              "https://images.unsplash.com/photo-1625398407944-4c9752f9fb59"
            ]
          },
          {
            id: "2",
            userName: "Sarah M.",
            userImage: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 4.5,
            date: "2025-02-10T14:30:00",
            text: "Really enjoyed this dish. The flavors were authentic and reminded me of my trip to Nepal. Would recommend to anyone who loves dumplings."
          },
          {
            id: "3",
            userName: "Michael T.",
            userImage: "https://randomuser.me/api/portraits/men/67.jpg",
            rating: 3.8,
            date: "2025-02-05T18:15:00",
            text: "Good taste but arrived a bit cold. The dipping sauce was amazing though!"
          },
          {
            id: "4",
            userName: "Emily W.",
            userImage: "https://randomuser.me/api/portraits/women/33.jpg",
            rating: 5.0,
            date: "2025-01-28T20:45:00",
            text: "Absolutely perfect! Best momos in town. The dough was so tender and filling was juicy and flavorful. I'm already planning to order again tomorrow.",
            images: [
              "https://images.unsplash.com/photo-1625398407978-3c9d93f25fd8"
            ]
          },
          {
            id: "5",
            userName: "David K.",
            userImage: "https://randomuser.me/api/portraits/men/22.jpg",
            rating: 4.2,
            date: "2025-01-20T13:10:00",
            text: "Great value for money. The portion size was generous and the quality was top-notch. Just wish they had more sauce options."
          }
        ];
        
        setReviews(mockReviews);
        setIsLoading(false);
      }, 1000);
    }
  }, [route.params]);

  const handleSearchScreen = () => {
    navigation.navigate("SearchScreen");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar hidden={false} backgroundColor="#F0F4F8" style="dark" /> */}
      <NabBar
        handleSearchScreen={handleSearchScreen}
        isBack={true}
        navigation={navigation}
        isTextInput={false}
      />

      <View style={styles.header}>
        <Text style={styles.title}>
          {foodDetails ? `Reviews for ${foodDetails.food_name}` : "All Reviews"}
        </Text>
        {reviews.length > 0 && (
          <View style={styles.ratingOverview}>
            <Text style={styles.averageRatingText}>{averageRating}</Text>
            <Text style={styles.averageRatingStar}>★</Text>
            <Text style={styles.ratingCount}>({reviews.length} reviews)</Text>
          </View>
        )}
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Loading reviews...</Text>
        </View>
      ) : reviews.length > 0 ? (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReviewItem review={item} />}
          contentContainerStyle={styles.reviewsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="chatbox-outline" size={64} color="#CCCCCC" />
          <Text style={styles.emptyText}>No reviews yet</Text>
          <Text style={styles.emptySubtext}>
            Be the first one to review this dish!
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.writeReviewButton}
        onPress={() => {
          navigation.navigate("WriteReview", { foodDetails });
        }}
      >
        <Text style={styles.writeReviewButtonText}>Write a Review</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  header: {
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: scaleWidth(22),
    fontWeight: "bold",
    color: "#2E2E2E",
  },
  ratingOverview: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(8),
  },
  averageRatingText: {
    fontSize: scaleWidth(18),
    fontWeight: "bold",
    color: "#2E2E2E",
  },
  averageRatingStar: {
    fontSize: scaleWidth(18),
    fontWeight: "bold",
    color: "#FFB800",
    marginLeft: scaleWidth(2),
  },
  ratingCount: {
    fontSize: scaleWidth(14),
    color: "#666",
    marginLeft: scaleWidth(8),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: scaleHeight(12),
    fontSize: scaleWidth(16),
    color: "#666",
  },
  reviewsList: {
    padding: scaleWidth(16),
  },
  reviewItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(12),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleHeight(12),
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(20),
    marginRight: scaleWidth(12),
  },
  userName: {
    fontSize: scaleWidth(16),
    fontWeight: "600",
    color: "#2E2E2E",
  },
  reviewDate: {
    fontSize: scaleWidth(12),
    color: "#888",
    marginTop: scaleHeight(2),
  },
  ratingContainer: {
    backgroundColor: "#F8F8F8",
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(12),
  },
  ratingText: {
    fontSize: scaleWidth(14),
    fontWeight: "bold",
    color: "#FFB800",
  },
  reviewText: {
    fontSize: scaleWidth(14),
    lineHeight: scaleHeight(20),
    color: "#444",
    marginBottom: scaleHeight(12),
  },
  imageList: {
    marginTop: scaleHeight(8),
  },
  reviewImage: {
    width: scaleWidth(100),
    height: scaleHeight(100),
    borderRadius: scaleWidth(8),
    marginRight: scaleWidth(8),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scaleWidth(20),
  },
  emptyText: {
    fontSize: scaleWidth(18),
    fontWeight: "bold",
    color: "#666",
    marginTop: scaleHeight(12),
  },
  emptySubtext: {
    fontSize: scaleWidth(14),
    color: "#888",
    textAlign: "center",
    marginTop: scaleHeight(8),
  },
  writeReviewButton: {
    backgroundColor: "#FF6B6B",
    margin: scaleWidth(16),
    paddingVertical: scaleHeight(14),
    borderRadius: scaleWidth(25),
    alignItems: "center",
  },
  writeReviewButtonText: {
    color: "#FFFFFF",
    fontSize: scaleWidth(16),
    fontWeight: "600",
  },
});

export default SeeReview;