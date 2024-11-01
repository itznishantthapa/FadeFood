import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { Image } from 'react-native'
import { scaleHeight, scaleWidth } from '../../Scaling'
import  FontAwe  from 'react-native-vector-icons/FontAwesome6'
import { styles } from '../../style/style'


const UserInfo = () => {
    return (
        <View style={ownstyle.profileImageContainer}>
           
                <Image
                    source={require('../../assets/images/profile.webp')}
                    style={ownstyle.profileImage}
                />
            

        </View>
    )
}
const ownstyle = StyleSheet.create({
    profileImageContainer: {
        alignItems: 'center',
        marginTop: scaleHeight(10),
        marginBottom: scaleHeight(10),
        gap: scaleHeight(10),
    },
    profileImage: {
        width: scaleWidth(100),
        height: scaleHeight(100),
        borderRadius: scaleWidth(75),
        // backgroundColor: 'black',
    },

})


export default UserInfo

