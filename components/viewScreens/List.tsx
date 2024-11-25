import { StyleSheet, Text, View, TouchableWithoutFeedback, Image,TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Price from "./Price";
import { scaleHeight, scaleWidth } from "../../Scaling";
// import { TouchableOpacity } from "react-native-gesture-handler";
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
  withRestaurant,
  handlePressonList,
  handleEditPen
}) => {
  const {state}=useContext(myContext);
  // const handlePress = () => {
  //   navigation.navigate("ViewFood");
  // };

  const onListPress = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    console.log("Add to List");
  }

  return (
    <TouchableWithoutFeedback onPress={handlePressonList}>

      <View style={styles.food_container}>

        <View style={{ flexDirection: 'row' }}>
          <Image source={undefined} resizeMode="cover" style={styles.foodImage} />
          <Image source={undefined} resizeMode="cover" style={styles.foodImage} />
          <Image source={undefined} resizeMode="cover" style={styles.foodImage} />
        </View>

        <View style={{ position: 'absolute', right: 0 }}>
          {
            state.role === 'customer' ? (
              <Love />
            ) : (
              <Edit handleEditPen={handleEditPen}/>
            )


          }
        </View>


        <View style={styles.infoSection}>

          <View style={styles.namePriceRow}>
            <Text style={styles.foodName}>{foodName}</Text>
            <Price priceFontSize={18} price={price} />
          </View>
          {
            state.role === 'customer' && (
              <View style={styles.restaurantRow}>


                {withRestaurant ?

                  (<View style={styles.restaurantInfo}>
                    <View style={styles.restaurantLogo}></View>
                    <Text style={styles.restaurantName}>{restaurantName}</Text>
                  </View>) : (<View></View>)
                }

                <TouchableOpacity style={styles.addToListButton} onPress={onListPress}>
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

