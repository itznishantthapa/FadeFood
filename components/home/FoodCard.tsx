import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";
import Price from "../viewScreens/Price";
import Reviews from "./Reviews";
import Ionicon from "react-native-vector-icons/Ionicons";
import { styles } from "../../style/style";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { scaleHeight, scaleWidth } from "../../Scaling";
import { baseURL } from "../../service";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import SkeletonPaper from "../../screens/viewScreens/SkeletonPaper";


const FoodCard = ({
  food_picture,
  restaurant_name,
  price,
  discount,
  foodName,
  no_fragments,
  eatsNumber,
  rating,
  location,
  handleToFoodViewPage,
}) => {
  return (
    <TouchableWithoutFeedback
      style={{
        backgroundColor: "#ffffff",
        width: Dimensions.get("window").width / 2 - 15,
        marginBottom: 10,
      }}
      onPress={handleToFoodViewPage}
    >
      <View style={{ height: scaleHeight(150), width: "100%" }}>
        {/* <Image
          resizeMode="cover"
          style={{ height: "100%", width: "100%" }}
          source={{ uri: `${baseURL}${food_picture}` }}
        ></Image> */}
        <SkeletonPaper 
        SkeletonHeight={'100%'}
        SkeletonWidth={'100%'}
        />
      </View>

      {/* <View style={{ paddingLeft: 15, paddingBottom: 5 }}> */}
      <View style={{ padding: scaleWidth(15) }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Price price={price} priceFontSize={20} />
          {discount > 0 && (
            <Text
              style={{
                color: "#708090",
                fontWeight: "bold",
                fontSize: scaleWidth(14),
                borderWidth: scaleWidth(1),
                borderColor: "#D3D3D3",
                paddingHorizontal: scaleWidth(4),
                borderRadius: 5,
                marginRight: scaleWidth(2),
              }}
            >
              get {discount}% off
            </Text>
          )}
        </View>
        <Text
          style={{ fontFamily: 'poppins_semibold', fontSize:scaleWidth(14)  }}
        >
          {foodName}
        </Text>

        {
          restaurant_name && (
            <View style={{
              backgroundColor: "#B0A4B5",
              paddingHorizontal: scaleWidth(5),
              alignSelf: "flex-start",
              borderRadius: 4,
              marginVertical: scaleWidth(2),
              marginBottom: scaleWidth(5),
              flexDirection: "row",
              alignItems: "center",
              gap: scaleWidth(5),
            }}>
              <MaterialIcon name='restaurant-menu' size={15} color={'#ffffff'}></MaterialIcon>
              <Text
                style={{
                  fontFamily: "poppins_semibold",
                  color: "#ffffff",
                  fontSize: scaleWidth(12),
                }}
              >
                {restaurant_name}
              </Text>
            </View>

          )
        }


        {
          rating > 0 &&
          <Reviews
            reviewsName={"Eats"}
            reviewsNumber={eatsNumber}
            rating={rating}
          />
        }

        {location && (
          <View style={styles.location}>
            <Ionicon
              name="location-sharp"
              style={{ color: "grey", marginBottom: scaleHeight(3) }}
              size={scaleWidth(15)}
            />
            <Text
              style={{
                fontSize: scaleWidth(12),
                color: "grey",
                fontFamily: "poppins_semibold",
              }}
            >
              {location}
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FoodCard;

// const styles = StyleSheet.create({})
