import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { Image } from 'react-native'


const UserInfo = () => {
    return (
        <View style={styles1.profileImageContainer}>
            <Image
                source={require('../../assets/chatapate.jpeg')}
                style={styles1.profileImage}
            />
            <View style={{ alignItems: 'center', gap: 4 }}>
                <Text>Nishant Thapa</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                    <SimpleLineIcon name='phone' size={20} />
                    <Text>+977 9826327088</Text>
                </View>
            </View>
        </View>
    )
}
const styles1 = StyleSheet.create({
    profileImageContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
        gap: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 75,
    },
})


export default UserInfo

