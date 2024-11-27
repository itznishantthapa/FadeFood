import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Price from "./Price";
import { scaleHeight, scaleWidth } from "../../Scaling";
// import { TouchableOpacity } from "react-native-gesture-handler";
import Love from "./Love";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Edit from "./Edit";
import { myContext } from "../../context/AppProvider";
import { styles } from "../../style/style";
import { baseURL } from "../../service";


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
  const { state } = useContext(myContext);
  // const handlePress = () => {
  //   navigation.navigate("ViewFood");
  // };

  const onListPress = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    console.log("Add to List");
  }

  // console.log('---------------------printing from valid List.tsx---------------------->', images);

  return (
    <TouchableWithoutFeedback onPress={handlePressonList}>

      <View style={styles.food_container}>

        <View style={{ flexDirection: 'row', justifyContent: 'center',alignItems:'flex-start',gap:1 }}>
          {
          images && Array.isArray(images) && images.length > 0 ? (
            images.map((imageObj) => (
              <Image
                key={imageObj.id}
                source={{ uri: `${baseURL}${imageObj.image}` }}
                resizeMode="cover"
                style={styles.foodImage}
              />
            ))
          ) : (
            Array(3).fill(0).map((_, index) => (
              <View key={index} style={[styles.foodImage, { backgroundColor: '#ccc' }]} />))
            )
              }
              </View>

        <View style={{ position: 'absolute', right: 0 }}>
          {
            state.role === 'customer' ? (
              <Love />
            ) : (
              <Edit handleEditPen={handleEditPen} />
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

