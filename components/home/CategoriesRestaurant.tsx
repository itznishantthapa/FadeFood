import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { scaleHeight, scaleWidth } from "../../Scaling"

const CategoriesRestaurant = ({ dishImage, dishName, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} resizeMode="contain" source={dishImage} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{dishName}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: scaleHeight(90),
    width: scaleWidth(70),
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    borderRadius: 6,
 
    marginVertical: scaleHeight(2),
  },
  imageContainer: {
    height: "80%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  textContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: scaleWidth(12),
    fontFamily: "poppins_regular",
    textAlign: "center",
  },
})

export default CategoriesRestaurant

