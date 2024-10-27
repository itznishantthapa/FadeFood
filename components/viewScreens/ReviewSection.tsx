import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { scaleWidth, scaleHeight } from  '../../Scaling';

const RatingStars = ({ rating, size = 16, color = "#FFD700" }) => {
  return (
    <View style={styles.starContainer}>
      {[...Array(5)].map((_, index) => (
        <FontAwesome
          key={index}
          name={index < rating ? 'star' : 'star-o'}
          size={scaleWidth(size)}
          color={color}
        />
      ))}
    </View>
  );
};

const ReviewSection = ({ratingNumber,comment,person_name }) => {
//   const reviewCount = reviews.length || 30; // Fallback to 30 if no reviews provided

  return (
      <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewerName}>{person_name}</Text>
          <RatingStars rating={ratingNumber} />
        </View>
        
        <Text style={styles.reviewText}>
        {comment}
        </Text>
      </View>
   
  );
};

const styles = StyleSheet.create({
  
  reviewCard: {
    backgroundColor: 'white',
    padding: scaleWidth(16),
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(8),
    marginBottom: scaleHeight(8),
  },
  reviewerName: {
    fontSize: scaleWidth(14),
    color: '#4A4A4A',
    fontWeight: '500',
  },
  starContainer: {
    flexDirection: 'row',
    gap: scaleWidth(2),
  },
  reviewText: {
    fontSize: scaleWidth(14),
    color: '#2C2C2C',
    lineHeight: scaleHeight(20),
  },
});

export default ReviewSection;