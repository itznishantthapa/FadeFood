import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { scaleHeight, scaleWidth } from '../../Scaling'


const Love = () => {
    const [isFavorite, setFavorite] = useState(true);

    const toggleFavorite = () => {
      setFavorite(!isFavorite);
    }
  return (
    <View>
      {
              isFavorite ? (
              
                <TouchableOpacity 
                onPress={toggleFavorite}
                style={{ 
                    height: scaleHeight(30), 
                    width: scaleWidth(40), 
                    backgroundColor: isFavorite ? '#FF6347' : '#FFFFFF', // Change background based on state
                    borderTopRightRadius: 12, 
                    borderBottomLeftRadius: 12, 
                    // borderBottomRightRadius: 12, 
                    // borderTopLeftRadius: 12, 
                    marginLeft: 'auto', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    elevation: 2 // Optional: adds shadow on Android
                }}
            >
                <MaterialIcons
                    name={isFavorite ? 'favorite' : 'favorite-border'} // Change icon based on state
                    size={scaleWidth(25)} 
                    style={{ 
                        color: isFavorite ? '#8B0000' : '#FF6347' // Change color based on state
                    }}
                />
            </TouchableOpacity>
            
            
            ) : (
              <TouchableOpacity 
              onPress={toggleFavorite}
              style={{ 
                  height: scaleHeight(30), 
                  width: scaleWidth(40), 
                  backgroundColor: isFavorite ? '#FF6347' : '#FFFFFF', // Change background based on state
                  borderTopRightRadius: 12, 
                  borderBottomLeftRadius: 12, 
                  marginLeft: 'auto', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  elevation: 2 // Optional: adds shadow on Android
              }}
          >
              <MaterialIcons
                  name={isFavorite ? 'favorite' : 'favorite-border'} // Change icon based on state
                  size={scaleWidth(25)} 
                  style={{ 
                      color: isFavorite ? '#8B0000' : '#FF6347' // Change color based on state
                  }}
              />
          </TouchableOpacity>
          


              )
            }
    </View>
  )
}

export default Love

