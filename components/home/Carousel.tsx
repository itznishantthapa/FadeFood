import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import PagerView from 'react-native-pager-view';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

const CardsCarousel = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const cards = [
    { id: 1, title: 'Card 1', color: '#FF6B6B' },
    { id: 2, title: 'Card 2', color: '#4ECDC4' },
    { id: 3, title: 'Card 3', color: '#45B7D1' },
    { id: 4, title: 'Card 4', color: '#96CEB4' },
    { id: 5, title: 'Card 5', color: '#FFBE0B' },
  ];

  const renderCard = (item, index) => {
    const isCenter = index === currentPage;
    
    return (
      <View
        style={[
          styles.cardContainer,
          {
            transform: [{ scale: isCenter ? 1 : 0.8 }],
          },
        ]}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: item.color,
            },
          ]}
        >
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>Swipe to see more</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        pageMargin={-40} // Adjust this value to control card overlap
        orientation="horizontal"
      >
        {cards.map((card, index) => (
          <View key={card.id} style={styles.pageContainer}>
            {renderCard(card, index)}
          </View>
        ))}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // zIndex: 1,
  },
  pagerView: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default CardsCarousel;