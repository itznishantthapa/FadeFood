import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const Love = () => {
    const [isFavorite, setFavorite] = useState(true);

    const handleFavorite = () => {
      setFavorite(!isFavorite);
    }
  return (
    <View>
      {
              isFavorite ? (<TouchableOpacity onPress={handleFavorite}>
                <MaterialIcons
                  style={{
                    color: 'red',
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 7
                  }}
                  name='favorite'
                  size={40}
                />
              </TouchableOpacity>) : (<TouchableOpacity onPress={handleFavorite}>
                <MaterialIcons
                  style={{
                    color: 'grey',
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 7
                  }}
                  name='favorite-outline'
                  size={40}
                />
              </TouchableOpacity>
              )
            }
    </View>
  )
}

export default Love

const styles = StyleSheet.create({})