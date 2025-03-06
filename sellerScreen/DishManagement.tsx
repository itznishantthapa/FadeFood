"use client"

import { useContext, useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native"
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons"
import { myContext } from "../context/AppProvider"
import { scaleHeight, scaleWidth } from "../Scaling"

import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import List from "../components/viewScreens/List"
import { FlatList } from "react-native-gesture-handler"

const DishManagement = ({ navigation }) => {
    const { food_state, seller_state } = useContext(myContext)
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("all") // 'all', 'dishes', 'drinks'

    // Filter items based on search query and active tab
    const filteredItems = food_state.filter((item) => {
        const matchesSearch = item.food_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false

        if (activeTab === "all") return matchesSearch
        if (activeTab === "dishes") return matchesSearch && item.category !== "Drinks"
        if (activeTab === "drinks") return matchesSearch && item.category === "Drinks"

        return matchesSearch
    })

    console.log("food_state->>", filteredItems)

    const handleAddItem = () => {
        navigation.navigate("AddFood")
    }

    const handleEditItem = (item) => {
        navigation.navigate("EditFood", { item })
    }

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.itemCard} onPress={() => handleEditItem(item)}>
                <View style={styles.itemContent}>
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item.food_name}</Text>
                        <Text style={styles.itemCategory}>{item.category}</Text>
                        <View style={styles.itemPriceContainer}>
                            <Text style={styles.itemPrice}>₹{item.food_price}</Text>
                            {item.is_available ? (
                                <View style={styles.availableTag}>
                                    <Text style={styles.availableText}>Available</Text>
                                </View>
                            ) : (
                                <View style={styles.unavailableTag}>
                                    <Text style={styles.unavailableText}>Unavailable</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEditItem(item)}>
                        <Feather name="edit-2" size={18} color="#4CAF50" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

      const handleEditPen = (item) => {
                            navigation.navigate('AddFood',{food_id_params:item.id,food_name_params:item.food_name,food_price_params:item.food_price,food_image_params:item.images});
                            console.log('Edit Pen Clicked');
                          }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Manage Menu Items</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                    <Ionicons name="add" size={24} color="#333333" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#757575" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search items..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                        <Ionicons name="close-circle" size={20} color="#757575" />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === "all" && styles.activeTab]}
                    onPress={() => setActiveTab("all")}
                >
                    <Text style={[styles.tabText, activeTab === "all" && styles.activeTabText]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === "dishes" && styles.activeTab]}
                    onPress={() => setActiveTab("dishes")}
                >
                    <Text style={[styles.tabText, activeTab === "dishes" && styles.activeTabText]}>Dishes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === "drinks" && styles.activeTab]}
                    onPress={() => setActiveTab("drinks")}
                >
                    <Text style={[styles.tabText, activeTab === "drinks" && styles.activeTabText]}>Drinks</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{food_state.length}</Text>
                    <Text style={styles.statLabel}>Total Items</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{food_state.filter((item) => item.is_available).length}</Text>
                    <Text style={styles.statLabel}>Available</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{food_state.filter((item) => !item.is_available).length}</Text>
                    <Text style={styles.statLabel}>Unavailable</Text>
                </View>
            </View>

            {filteredItems.length > 0 ? (
                // <List
                //   data={filteredItems}
                //   renderItem={renderItem}
                //   keyExtractor={(item) => item.id.toString()}
                //   contentContainerStyle={styles.listContent}
                // />
                <FlatList
                    data={filteredItems}
                    renderItem={({ item }) => (<List
                        images={item.images}
                        foodName={item.food_name}
                        restaurantName={item.restaurant_name}
                        price={item.food_price}
                        navigation={navigation}
                        withRestaurant={true}
                        handlePressonList={undefined}
                        handleEditPen={()=>handleEditPen(item)}

                      
                    />)}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}

                />

            ) : (
                <View style={styles.emptyContainer}>
                    <MaterialIcons name="restaurant-menu" size={64} color="#E0E0E0" />
                    <Text style={styles.emptyText}>No items found</Text>
                    <Text style={styles.emptySubtext}>
                        {searchQuery ? "Try a different search term" : "Add your first menu item"}
                    </Text>
                    {!searchQuery && (
                        <TouchableOpacity style={styles.addFirstItemButton} onPress={handleAddItem}>
                            <Text style={styles.addFirstItemText}>Add Item</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
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
    addButton: {
        padding: scaleWidth(8),
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: scaleWidth(8),
        marginHorizontal: scaleWidth(16),
        marginVertical: scaleHeight(12),
        paddingHorizontal: scaleWidth(12),
        paddingVertical: scaleHeight(8),
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    searchIcon: {
        marginRight: scaleWidth(8),
    },
    searchInput: {
        flex: 1,
        fontFamily: "poppins_regular",
        fontSize: scaleWidth(14),
        color: "#333333",
    },
    tabContainer: {
        flexDirection: "row",
        marginHorizontal: scaleWidth(16),
        marginBottom: scaleHeight(12),
    },
    tab: {
        flex: 1,
        paddingVertical: scaleHeight(8),
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#E0E0E0",
    },
    activeTab: {
        borderBottomColor: "#4CAF50",
    },
    tabText: {
        fontFamily: "poppins_regular",
        fontSize: scaleWidth(14),
        color: "#757575",
    },
    activeTabText: {
        fontFamily: "poppins_semibold",
        color: "#4CAF50",
    },
    statsContainer: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: scaleWidth(8),
        marginHorizontal: scaleWidth(16),
        marginBottom: scaleHeight(12),
        padding: scaleWidth(16),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statValue: {
        fontFamily: "poppins_semibold",
        fontSize: scaleWidth(18),
        color: "#333333",
    },
    statLabel: {
        fontFamily: "poppins_regular",
        fontSize: scaleWidth(12),
        color: "#757575",
    },
    statDivider: {
        width: 1,
        height: "80%",
        backgroundColor: "#E0E0E0",
    },
    listContent: {
        padding: scaleWidth(16),
    },
    itemCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: scaleWidth(8),
        marginBottom: scaleHeight(12),
        padding: scaleWidth(16),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    itemContent: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontFamily: "poppins_semibold",
        fontSize: scaleWidth(16),
        color: "#333333",
        marginBottom: scaleHeight(4),
    },
    itemCategory: {
        fontFamily: "poppins_regular",
        fontSize: scaleWidth(12),
        color: "#757575",
        marginBottom: scaleHeight(8),
    },
    itemPriceContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    itemPrice: {
        fontFamily: "poppins_semibold",
        fontSize: scaleWidth(14),
        color: "#4CAF50",
        marginRight: scaleWidth(8),
    },
    availableTag: {
        backgroundColor: "#E8F5E9",
        paddingHorizontal: scaleWidth(8),
        paddingVertical: scaleHeight(2),
        borderRadius: scaleWidth(4),
    },
    availableText: {
        fontFamily: "poppins_regular",
        fontSize: scaleWidth(10),
        color: "#4CAF50",
    },
    unavailableTag: {
        backgroundColor: "#FFEBEE",
        paddingHorizontal: scaleWidth(8),
        paddingVertical: scaleHeight(2),
        borderRadius: scaleWidth(4),
    },
    unavailableText: {
        fontFamily: "poppins_regular",
        fontSize: scaleWidth(10),
        color: "#F44336",
    },
    editButton: {
        padding: scaleWidth(8),
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: scaleWidth(20),
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: scaleWidth(20),
    },
    emptyText: {
        fontFamily: "poppins_semibold",
        fontSize: scaleWidth(18),
        color: "#757575",
        marginTop: scaleHeight(16),
    },
    emptySubtext: {
        fontFamily: "poppins_regular",
        fontSize: scaleWidth(14),
        color: "#9E9E9E",
        marginTop: scaleHeight(8),
        textAlign: "center",
    },
    addFirstItemButton: {
        backgroundColor: "#4CAF50",
        paddingHorizontal: scaleWidth(24),
        paddingVertical: scaleHeight(12),
        borderRadius: scaleWidth(25),
        marginTop: scaleHeight(20),
    },
    addFirstItemText: {
        fontFamily: "poppins_semibold",
        fontSize: scaleWidth(14),
        color: "#FFFFFF",
    },
})

export default DishManagement

