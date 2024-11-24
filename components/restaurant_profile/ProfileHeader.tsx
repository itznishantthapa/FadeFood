import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Image, TouchableOpacity } from 'react-native'
import { myContext } from '../../context/AppProvider'
import WavePulse from './WavePulse'

const ProfileHeader = ({handleGoBack,openMaps,restaurantName,openingHour,rating,cityName,streetAddress,activeStatus}) => {
  return (
    <View style={styles.header}>
      {
        false &&
    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
      <AntDesign name="arrowleft" size={24} color="#333" />
    </TouchableOpacity>
      }
      <View style={styles.activeStatus}>
       <Text style={styles.activeStatusText}>{activeStatus?'Open':'Close'}</Text>
       <WavePulse
        size={10} 
        isActive={activeStatus} 
        style={{ margin: 0 }} />

      </View>

    <View style={styles.profileContainer}>
      <Image 
        source={require('../../assets/transparent_logo.png')} 
        style={styles.restaurantLogo}
      />
      
      <View style={styles.restaurantInfo}>

        <Text style={styles.restaurantName}>{restaurantName}</Text>
        <Text style={styles.cuisineText}>Italian • Continental • Chinese</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <AntDesign name="star" size={16} color="#FFD700" />
            <Text style={styles.statText}>{rating} (500+)</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <MaterialIcons name="access-time" size={16} color="#666" />
            <Text style={styles.statText}>{openingHour}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.locationContainer} onPress={openMaps}>
          <Ionicons name="location-sharp" size={18} color="#E23744" />
          <Text style={styles.locationText}>{streetAddress}, {cityName}</Text>
          <MaterialIcons name="directions" size={20} color="#E23744" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({

    header: {
        // backgroundColor: '#F0F4F8',
        backgroundColor: '#ffffff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
      },
      backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 16,
        position: 'absolute',
        zIndex: 1,
        left: 16,
        top: 4
      },
      activeStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 20,
        paddingVertical: 8,
        gap : 8,
        borderRadius: 8,
        alignSelf: 'flex-end',
        position: 'absolute',
        right: 16,
        top:8
      },
      activeStatusText: {
         fontFamily: 'montserrat_semibold',
      }
        ,
      profileContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor:'transparent',
        marginTop: 18,
      },
      restaurantLogo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
      },
      restaurantInfo: {
        flex: 1,
      },
      restaurantName: {
        fontSize: 24,
        fontFamily: 'poppins_semibold',
        color: '#333',
        marginBottom: 4,
      },
      cuisineText: {
        fontSize: 14,
        fontFamily: 'poppins_regular',
        color: '#666',
        marginBottom: 12,
      },
      statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
      },
      statItem: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      statText: {
        marginLeft: 4,
        fontSize: 14,
        fontFamily: 'poppins_semibold',
        color: '#333',
      },
      statDivider: {
        width: 1,
        height: 16,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 12,
      },
      locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F1',
        padding: 8,
        borderRadius: 8,
      },
      locationText: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'poppins_regular',
        color: '#666',
        marginHorizontal: 8,
      },
})