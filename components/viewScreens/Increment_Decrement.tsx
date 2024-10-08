import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'


const Increment_Decrement = () => {
    return (
        <View style={styles1.orderNumber}>
            <SimpleLineIcons name='minus' size={40}></SimpleLineIcons>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>1</Text>
            <SimpleLineIcons name='plus' size={40}></SimpleLineIcons>
        </View>
    )
}

export default Increment_Decrement

const styles1 = StyleSheet.create({
    orderNumber: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 110,
        // backgroundColor: 'white',
      },
})