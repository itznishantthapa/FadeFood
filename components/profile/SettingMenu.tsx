import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { scaleHeight, scaleWidth } from '../../Scaling'

const SettingMenu = ({menuName,iconName,handleSettingPage}) => {
   
    return (
        <View style={styles1.menuContainer}>
            <TouchableOpacity  style={styles1.menuItem} onPress={handleSettingPage}>
                <Ionicons name={iconName} size={scaleWidth(24)} color="#333333" style={{fontWeight:'bold'}}/>
                <Text style={styles1.menuItemText}>{menuName}</Text>
                <Ionicons name="chevron-forward-outline" size={scaleWidth(24)} color="#ccc" style={{fontWeight:'semibold'}} />
            </TouchableOpacity>
        </View>
    )
}

export default SettingMenu

const styles1 = StyleSheet.create({
    menuContainer: {
        paddingHorizontal: scaleWidth(20),
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: scaleHeight(15),
        borderBottomWidth: scaleHeight(1),
        borderBottomColor: '#f0f0f0',
    },
    menuItemText: {
        flex: 1,
        marginLeft: scaleWidth(20),
        fontSize: scaleWidth(16),
        fontFamily:'poppins_semibold',
        color:'#333333'
    },
})