import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { scaleWidth, scaleHeight } from "../../Scaling"
import { baseURL } from "../../service"

const FoodCard = ({ item, handleToFoodViewPage, onAddToCart }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={handleToFoodViewPage}>
      <Image source={{  uri: `${baseURL}${item.images[0].image}` }} style={styles.image} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
           {item.food_name}
          </Text>
          {true && (
            <View style={styles.vegIndicator}>
              <Ionicons name="leaf" size={12} color="#4CAF50" />
            </View>
          )}
        </View>

        {/* // food_picture={item.images.length > 0 ? item.images[0].image : null}
                  // price={item.food_price}
                  // restaurant_name={item.food_restaurant || 'KFC'}
                  // discount={item.discount || 12}
                  // foodName={item.food_name}
                  // no_fragments={null}
                  // eatsNumber={item.totol_eats || 120}
                  // rating={item.rating || 3.5}
                  // location={item.food_location || 'Kathmandu, Thamel'} */}
        <Text style={styles.restaurant} numberOfLines={1}>
         {item.food_restaurant}
        </Text>
        <View style={styles.detailsContainer}>
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <Text style={styles.price}>₹ {item.food_price}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
        <AntDesign name="plus" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(12),
    marginBottom: scaleHeight(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 3,
    flexDirection: "row",
    overflow: "hidden",
  },
  image: {
    width: scaleWidth(100),
    height: scaleHeight(120),
  },
  infoContainer: {
    flex: 1,
    padding: scaleWidth(8),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(4),
  },
  title: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(16),
    color: "#333333",
    flex: 1,
  },
  vegIndicator: {
    marginLeft: scaleWidth(8),
    padding: scaleWidth(2),
    borderRadius: scaleWidth(4),
    backgroundColor: "#E8F5E9",
  },
  restaurant: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#757575",
    marginBottom: scaleHeight(4),
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap:scaleWidth(3),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9C4",
    paddingHorizontal: scaleWidth(6),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleWidth(4),
  },
  rating: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(12),
    color: "#333333",
    marginLeft: scaleWidth(4),
  },
  time: {
    fontFamily: "poppins_regular",
    fontSize: scaleWidth(12),
    color: "#757575",
  },
  price: {
    fontFamily: "poppins_semibold",
    fontSize: scaleWidth(14),
    color: "#4CAF50",
  },
  addButton: {
    position: "absolute",
    bottom: scaleHeight(2),
    right: scaleWidth(2),
    backgroundColor: "#4CAF50",
    borderRadius: scaleWidth(20),
    width: scaleWidth(32),
    height: scaleWidth(32),
    justifyContent: "center",
    alignItems: "center",
  },
})

export default FoodCard

