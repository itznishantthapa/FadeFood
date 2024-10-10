import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

const SettingMenu = ({menuName,iconName}) => {
    return (
        <View style={styles1.menuContainer}>
            <TouchableOpacity  style={styles1.menuItem}>
                <Ionicons name={iconName} size={24} color="#333" />
                <Text style={styles1.menuItemText}>{menuName}</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
            </TouchableOpacity>
        </View>
    )
}

export default SettingMenu

const styles1 = StyleSheet.create({
    menuContainer: {
        paddingHorizontal: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuItemText: {
        flex: 1,
        marginLeft: 20,
        fontSize: 16,
    },
})