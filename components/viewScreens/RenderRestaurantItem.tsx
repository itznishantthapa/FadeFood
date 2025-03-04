

import {
    View,
    Text,
    StyleSheet,

    Image,
    TouchableOpacity,

} from "react-native"

import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons"
import { scaleHeight, scaleWidth } from "../../Scaling"

const RenderRestaurantItem = ({ item, handleItem,handleFavourite }) => {
    return (
        <TouchableOpacity style={styles.restaurantCard} activeOpacity={0.9} onPress={handleItem}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.restaurantImage} />
                <TouchableOpacity style={styles.favoriteButton} onPress={handleFavourite}>
                    <MaterialIcons
                        name={item.isFavorite ? "favorite" : "favorite-border"}
                        size={24}
                        color={item.isFavorite ? "#FF6347" : "#FFFFFF"}
                    />
                </TouchableOpacity>

                {!item.isOpen && (
                    <View style={styles.closedBadge}>
                        <Text style={styles.closedText}>CLOSED</Text>
                    </View>
                )}

                <View style={styles.priceRangeBadge}>
                    <Text style={styles.priceRangeText}>{item.priceRange}</Text>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.nameRatingRow}>
                    <Text style={styles.restaurantName} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <View style={styles.ratingContainer}>
                        <FontAwesome name="star" size={16} color="#FFD700" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                </View>

                <View style={styles.detailsRow}>
                    <View style={styles.detailItem}>
                        <Ionicons name="time-outline" size={16} color="#757575" />
                        <Text style={styles.detailText}>{item.deliveryTime} min</Text>
                    </View>

                    <View style={styles.detailItem}>
                        <Ionicons name="location-outline" size={16} color="#757575" />
                        <Text style={styles.detailText}>{item.distance} km</Text>
                    </View>

                    <View style={styles.detailItem}>
                        <MaterialIcons name="rate-review" size={16} color="#757575" />
                        <Text style={styles.detailText}>{item.reviewCount}</Text>
                    </View>
                </View>

                <View style={styles.specialItemsContainer}>
                    {item.specialItems.slice(0, 3).map((specialItem, index) => (
                        <View key={index} style={styles.specialItemBadge}>
                            <Text style={styles.specialItemText}>{specialItem}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RenderRestaurantItem

const styles = StyleSheet.create({
    restaurantCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: scaleWidth(12),
        marginBottom: scaleHeight(16),
        overflow: "hidden",
    
      },
      imageContainer: {
        height: scaleHeight(180),
        width: "100%",
        position: "relative",
      },
      restaurantImage: {
        height: "100%",
        width: "100%",
        resizeMode: "cover",
      },
      favoriteButton: {
        position: "absolute",
        top: scaleHeight(12),
        right: scaleWidth(12),
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: scaleWidth(20),
        padding: scaleWidth(8),
      },
      closedBadge: {
        position: "absolute",
        top: scaleHeight(12),
        left: scaleWidth(12),
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: scaleWidth(4),
        paddingVertical: scaleHeight(4),
        paddingHorizontal: scaleWidth(8),
      },
      closedText: {
        color: "#FFFFFF",
        fontSize: scaleWidth(12),
        fontFamily: "poppins_semibold",
      },
      priceRangeBadge: {
        position: "absolute",
        bottom: scaleHeight(12),
        left: scaleWidth(12),
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: scaleWidth(4),
        paddingVertical: scaleHeight(4),
        paddingHorizontal: scaleWidth(8),
      },
      priceRangeText: {
        color: "#333333",
        fontSize: scaleWidth(12),
        fontFamily: "poppins_semibold",
      },
      infoContainer: {
        padding: scaleWidth(16),
      },
      nameRatingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: scaleHeight(8),
      },
      restaurantName: {
        fontSize: scaleWidth(18),
        fontFamily: "poppins_semibold",
        color: "#333333",
        flex: 1,
      },
      ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF9C4",
        paddingVertical: scaleHeight(4),
        paddingHorizontal: scaleWidth(8),
        borderRadius: scaleWidth(4),
      },
      ratingText: {
        fontSize: scaleWidth(14),
        fontFamily: "poppins_semibold",
        color: "#333333",
        marginLeft: scaleWidth(4),
      },
      detailsRow: {
        flexDirection: "row",
        marginBottom: scaleHeight(12),
      },
      detailItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: scaleWidth(16),
      },
      detailText: {
        fontSize: scaleWidth(12),
        fontFamily: "poppins_regular",
        color: "#757575",
        marginLeft: scaleWidth(4),
      },
      specialItemsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
      specialItemBadge: {
        backgroundColor: "rgba(255, 127, 80, 0.1)",
        borderRadius: scaleWidth(4),
        paddingVertical: scaleHeight(4),
        paddingHorizontal: scaleWidth(8),
        marginRight: scaleWidth(8),
        marginBottom: scaleHeight(4),
      },
      specialItemText: {
        fontSize: scaleWidth(12),
        fontFamily: "poppins_regular",
        color: "#FF7F50",
      },
})