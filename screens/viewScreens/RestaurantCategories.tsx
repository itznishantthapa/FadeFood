"use client"

import { useState, useEffect, useCallback } from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    Dimensions,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons"
import TopBar from "../../components/viewScreens/TopBar"
import { scaleHeight, scaleWidth } from "../../Scaling"
import RenderRestaurantItem from "../../components/viewScreens/RenderRestaurantItem"


// Mock data for restaurants
// In a real app, this would come from an API
const mockRestaurants = {
    Momo: [
        {
            id: 1,
            name: "Himalayan Delights",
            image: require("../../assets/momo.jpeg"),
            rating: 4.7,
            reviewCount: 245,
            deliveryTime: "25-35",
            distance: 1.2,
            priceRange: "$$",
            specialItems: ["Chicken Momo", "Veg Momo", "Jhol Momo"],
            isOpen: true,
            isFavorite: false,
        },
        {
            id: 2,
            name: "Kathmandu Kitchen",
            image: require("../../assets/momo.jpeg"),
            rating: 4.3,
            reviewCount: 187,
            deliveryTime: "30-40",
            distance: 2.5,
            priceRange: "$",
            specialItems: ["Steam Momo", "Fried Momo", "C Momo"],
            isOpen: true,
            isFavorite: true,
        },
        {
            id: 3,
            name: "Nepal House",
            image: require("../../assets/momo.jpeg"),
            rating: 4.5,
            reviewCount: 320,
            deliveryTime: "20-30",
            distance: 0.8,
            priceRange: "$$$",
            specialItems: ["Paneer Momo", "Buff Momo", "Tandoori Momo"],
            isOpen: false,
            isFavorite: false,
        },
    ],
    Noodles: [
        {
            id: 4,
            name: "Wok & Roll",
            image: require("../../assets/momo.jpeg"),
            rating: 4.6,
            reviewCount: 412,
            deliveryTime: "15-25",
            distance: 1.5,
            priceRange: "$$",
            specialItems: ["Chow Mein", "Thukpa", "Ramen"],
            isOpen: true,
            isFavorite: false,
        },
        {
            id: 5,
            name: "Noodle House",
            image: require("../../assets/momo.jpeg"),
            rating: 4.2,
            reviewCount: 156,
            deliveryTime: "25-35",
            distance: 3.2,
            priceRange: "$",
            specialItems: ["Pad Thai", "Singapore Noodles", "Udon"],
            isOpen: true,
            isFavorite: true,
        },
    ],
    Burger: [
        {
            id: 6,
            name: "Burger Joint",
            image: require("../../assets/momo.jpeg"),
            rating: 4.8,
            reviewCount: 523,
            deliveryTime: "20-30",
            distance: 1.8,
            priceRange: "$$",
            specialItems: ["Classic Burger", "Cheese Burger", "Veggie Burger"],
            isOpen: true,
            isFavorite: false,
        },
        {
            id: 7,
            name: "Grill House",
            image: require("../../assets/momo.jpeg"),
            rating: 4.4,
            reviewCount: 289,
            deliveryTime: "30-40",
            distance: 2.7,
            priceRange: "$$$",
            specialItems: ["BBQ Burger", "Mushroom Swiss", "Double Patty"],
            isOpen: true,
            isFavorite: true,
        },
    ],
    Pizza: [
        {
            id: 8,
            name: "Pizza Palace",
            image: require("../../assets/momo.jpeg"),
            rating: 4.5,
            reviewCount: 378,
            deliveryTime: "25-35",
            distance: 2.1,
            priceRange: "$$",
            specialItems: ["Margherita", "Pepperoni", "Hawaiian"],
            isOpen: true,
            isFavorite: false,
        },
        {
            id: 9,
            name: "Slice of Heaven",
            image: require("../../assets/momo.jpeg"),
            rating: 4.7,
            reviewCount: 412,
            deliveryTime: "20-30",
            distance: 1.5,
            priceRange: "$$$",
            specialItems: ["BBQ Chicken", "Veggie Supreme", "Meat Lovers"],
            isOpen: false,
            isFavorite: true,
        },
    ],
    Chicken: [
        {
            id: 10,
            name: "Chicken Express",
            image: require("../../assets/momo.jpeg"),
            rating: 4.3,
            reviewCount: 256,
            deliveryTime: "15-25",
            distance: 1.2,
            priceRange: "$",
            specialItems: ["Fried Chicken", "Grilled Chicken", "Chicken Wings"],
            isOpen: true,
            isFavorite: false,
        },
        {
            id: 11,
            name: "Wing Stop",
            image: require("../../assets/momo.jpeg"),
            rating: 4.6,
            reviewCount: 345,
            deliveryTime: "20-30",
            distance: 2.3,
            priceRange: "$$",
            specialItems: ["Buffalo Wings", "BBQ Wings", "Garlic Parmesan"],
            isOpen: true,
            isFavorite: true,
        },
    ],
    Cake: [
        {
            id: 12,
            name: "Sweet Treats",
            image: require("../../assets/momo.jpeg"),
            rating: 4.9,
            reviewCount: 289,
            deliveryTime: "30-40",
            distance: 3.5,
            priceRange: "$$$",
            specialItems: ["Chocolate Cake", "Cheesecake", "Red Velvet"],
            isOpen: true,
            isFavorite: false,
        },
        {
            id: 13,
            name: "Bakery Delights",
            image: require("../../assets/momo.jpeg"),
            rating: 4.7,
            reviewCount: 178,
            deliveryTime: "25-35",
            distance: 2.8,
            priceRange: "$$",
            specialItems: ["Tiramisu", "Black Forest", "Fruit Cake"],
            isOpen: false,
            isFavorite: true,
        },
    ],
}

// For the images, in a real app you would use actual images from your assets
// Here I'm using require statements as placeholders, but you'll need to replace these
// with actual images in your project

const { width } = Dimensions.get("window")

const RestaurantCategories = ({ route, navigation }) => {
    const { category } = route.params
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [snackBarVisible, setSnackBarVisible] = useState(false)
    const [snackBarMessage, setSnackBarMessage] = useState("")
    const [snackBarType, setSnackBarType] = useState("info")
    const [filterActive, setFilterActive] = useState(false)
    const [sortOption, setSortOption] = useState("rating") // 'rating', 'distance', 'deliveryTime'

    // Fetch restaurants based on category
    const fetchRestaurants = useCallback(() => {
        setLoading(true)

        // Simulate API call with timeout
        setTimeout(() => {
            const categoryRestaurants = mockRestaurants[category] || []
            setRestaurants(sortRestaurants(categoryRestaurants, sortOption))
            setLoading(false)
        }, 1000)
    }, [category, sortOption])

    useEffect(() => {
        fetchRestaurants()
    }, [fetchRestaurants])

    const onRefresh = () => {
        setRefreshing(true)
        fetchRestaurants()
        setTimeout(() => {
            setRefreshing(false)
            showSnackBar("Restaurants updated!", "success")
        }, 1500)
    }

    const sortRestaurants = (restaurantList, option) => {
        const sortedList = [...restaurantList]

        switch (option) {
            case "rating":
                return sortedList.sort((a, b) => b.rating - a.rating)
            case "distance":
                return sortedList.sort((a, b) => a.distance - b.distance)
            case "deliveryTime":
                return sortedList.sort((a, b) => {
                    const aTime = Number.parseInt(a.deliveryTime.split("-")[0])
                    const bTime = Number.parseInt(b.deliveryTime.split("-")[0])
                    return aTime - bTime
                })
            default:
                return sortedList
        }
    }

    const toggleFavorite = (id) => {
        setRestaurants(
            restaurants.map((restaurant) =>
                restaurant.id === id ? { ...restaurant, isFavorite: !restaurant.isFavorite } : restaurant,
            ),
        )

        const restaurant = restaurants.find((r) => r.id === id)
        if (restaurant) {
            const action = !restaurant.isFavorite ? "added to" : "removed from"
            showSnackBar(`${restaurant.name} ${action} favorites!`, "success")
        }
    }

    const showSnackBar = (message, type = "info") => {
        setSnackBarMessage(message)
        setSnackBarType(type)
        setSnackBarVisible(true)
    }

    const handleSortChange = (option) => {
        setSortOption(option)
        setRestaurants(sortRestaurants(restaurants, option))
        setFilterActive(false)

        let message = ""
        switch (option) {
            case "rating":
                message = "Sorted by highest rating"
                break
            case "distance":
                message = "Sorted by nearest distance"
                break
            case "deliveryTime":
                message = "Sorted by fastest delivery"
                break
        }

        showSnackBar(message)
    }

    const navigateToRestaurant = (restaurant) => {
        // In a real app, you would navigate to the restaurant detail screen
        showSnackBar(`Opening ${restaurant.name}...`)
        // navigation.navigate('RestaurantDetail', { restaurant });
    }



    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="restaurant-outline" size={80} color="#CCCCCC" />
            <Text style={styles.emptyTitle}>No Restaurants Found</Text>
            <Text style={styles.emptySubtitle}>We couldn't find any restaurants for {category}.</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
                <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
        </View>
    )

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.categoryHeaderContainer}>
                <Text style={styles.categoryTitle}>{category} Restaurants</Text>
                <Text style={styles.resultCount}>{restaurants.length} results</Text>
            </View>

            <View style={styles.sortFilterContainer}>
                <TouchableOpacity
                    style={[styles.sortButton, sortOption === "rating" && styles.activeSort]}
                    onPress={() => handleSortChange("rating")}
                >
                    <Ionicons name="star" size={16} color={sortOption === "rating" ? "#FF7F50" : "#757575"} />
                    <Text style={[styles.sortButtonText, sortOption === "rating" && styles.activeSortText]}>Top Rated</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.sortButton, sortOption === "distance" && styles.activeSort]}
                    onPress={() => handleSortChange("distance")}
                >
                    <Ionicons name="location" size={16} color={sortOption === "distance" ? "#FF7F50" : "#757575"} />
                    <Text style={[styles.sortButtonText, sortOption === "distance" && styles.activeSortText]}>Nearest</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.sortButton, sortOption === "deliveryTime" && styles.activeSort]}
                    onPress={() => handleSortChange("deliveryTime")}
                >
                    <Ionicons name="time" size={16} color={sortOption === "deliveryTime" ? "#FF7F50" : "#757575"} />
                    <Text style={[styles.sortButtonText, sortOption === "deliveryTime" && styles.activeSortText]}>Fastest</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterButton, filterActive && styles.activeFilter]}
                    onPress={() => setFilterActive(!filterActive)}
                >
                    <Ionicons name="filter" size={20} color={filterActive ? "#FF7F50" : "#333333"} />
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={false} backgroundColor="#F0F4F8" style="dark" />
            <TopBar navigation={navigation} top_title={`${category} Places`} withSettingIcons={false} handleSettingIcon={undefined} />

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF7F50" />
                    <Text style={styles.loadingText}>Finding the best {category} places...</Text>
                </View>
            ) : (
                <FlatList
                    data={restaurants}
                    renderItem={({ item }) => (
                        <RenderRestaurantItem
                            item={item}
                            handleItem={() => navigateToRestaurant(item)}
                            handleFavourite={() => toggleFavorite(item.id)}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    ListHeaderComponent={renderHeader}
                    ListEmptyComponent={renderEmptyState}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#FF7F50"]}
                            tintColor={"#FF7F50"}
                        />
                    }
                />
            )}


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: scaleWidth(20),
    },
    loadingText: {
        marginTop: scaleHeight(16),
        fontSize: scaleWidth(16),
        fontFamily: "poppins_regular",
        color: "#757575",
        textAlign: "center",
    },
    listContainer: {
        padding: scaleWidth(16),
        paddingBottom: scaleHeight(80),
    },
    headerContainer: {
        marginBottom: scaleHeight(16),
    },
    categoryHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: scaleHeight(12),
    },
    categoryTitle: {
        fontSize: scaleWidth(22),
        fontFamily: "poppins_bold",
        color: "#333333",
    },
    resultCount: {
        fontSize: scaleWidth(14),
        fontFamily: "poppins_regular",
        color: "#757575",
    },
    sortFilterContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: scaleWidth(8),
        padding: scaleWidth(8),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sortButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: scaleHeight(6),
        paddingHorizontal: scaleWidth(10),
        borderRadius: scaleWidth(6),
        marginRight: scaleWidth(8),
    },
    activeSort: {
        backgroundColor: "rgba(255, 127, 80, 0.1)",
    },
    sortButtonText: {
        fontSize: scaleWidth(12),
        fontFamily: "poppins_regular",
        color: "#757575",
        marginLeft: scaleWidth(4),
    },
    activeSortText: {
        color: "#FF7F50",
        fontFamily: "poppins_semibold",
    },
    filterButton: {
        padding: scaleWidth(8),
        borderRadius: scaleWidth(6),
        marginLeft: "auto",
    },
    activeFilter: {
        backgroundColor: "rgba(255, 127, 80, 0.1)",
    },

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: scaleWidth(20),
        marginTop: scaleHeight(40),
    },
    emptyTitle: {
        fontSize: scaleWidth(18),
        fontFamily: "poppins_semibold",
        color: "#333333",
        marginTop: scaleHeight(16),
    },
    emptySubtitle: {
        fontSize: scaleWidth(14),
        fontFamily: "poppins_regular",
        color: "#757575",
        textAlign: "center",
        marginTop: scaleHeight(8),
        marginBottom: scaleHeight(20),
    },
    refreshButton: {
        backgroundColor: "#FF7F50",
        paddingVertical: scaleHeight(10),
        paddingHorizontal: scaleWidth(20),
        borderRadius: scaleWidth(8),
    },
    refreshButtonText: {
        color: "#FFFFFF",
        fontSize: scaleWidth(14),
        fontFamily: "poppins_semibold",
    },
})

export default RestaurantCategories

