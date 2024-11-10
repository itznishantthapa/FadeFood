import { StyleSheet, Text, View, TouchableWithoutFeedback, Image } from "react-native";
import React, { useContext } from "react";
import Price from "./Price";
import { scaleHeight, scaleWidth } from "../../Scaling";
import { TouchableOpacity } from "react-native-gesture-handler";
import Love from "./Love";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Edit from "./Edit";
import { myContext } from "../../context/AppProvider";
import { styles } from "../../style/style";


const List = ({
  images,
  foodName,
  restaurantName,
  price,
  navigation,
  withRestaurant
}) => {
  const {user_type}=useContext(myContext);
  const handlePress = () => {
    navigation.navigate("ViewFood");
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>

      <View style={styles.food_container}>

        <View style={{ flexDirection: 'row' }}>
          <Image source={images.image1} resizeMode="cover" style={styles.foodImage} />
          <Image source={images.image2} resizeMode="cover" style={styles.foodImage} />
          <Image source={images.image3} resizeMode="cover" style={styles.foodImage} />
        </View>

        <View style={{ position: 'absolute', right: 0 }}>
          {
            user_type === 'customer' ? (
              <Love />
            ) : (
              <Edit />
            )


          }
        </View>


        <View style={styles.infoSection}>

          <View style={styles.namePriceRow}>
            <Text style={styles.foodName}>{foodName}</Text>
            <Price priceFontSize={18} price={price} />
          </View>
          {
            user_type === 'customer' && (
              <View style={styles.restaurantRow}>


                {withRestaurant ?

                  (<View style={styles.restaurantInfo}>
                    <View style={styles.restaurantLogo}></View>
                    <Text style={styles.restaurantName}>{restaurantName}</Text>
                  </View>) : (<View></View>)
                }

                <TouchableOpacity style={styles.addToListButton}>
                  <Text style={styles.buttonText}>Add to List</Text>
                </TouchableOpacity>
              </View>
            )
          }


        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default List;

