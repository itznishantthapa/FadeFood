import { StyleSheet, Platform, Dimensions } from "react-native";
import { scaleWidth, scaleHeight } from "../Scaling";
const { width, height } = Dimensions.get('window');


export const styles = StyleSheet.create({
  mainViewStyle: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

  },
  inputField: {
    width: '100%',
    height: height * 0.052,
    color: '#212121',
    fontWeight: 'bold',
    fontSize: width * 0.03996,
  },

  loginButton: {
    width: '80%',
    height: height * 0.0624,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5722',
    borderRadius: 10,
    marginTop: scaleHeight(20)
  },
  authBox: {
    height: height * 0.0936,
    width: '80%',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: scaleWidth(20)
  },
  BigText_for_login: {
    flexDirection: 'column',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: width * 0.0888

  },
  verifyBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    width: '90%',
  },
  verifyInputBox: {
    borderWidth: 2,
    borderColor: '#BDBDBD',
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    width: 50,
    height: 50,
    fontWeight: 'bold',
    fontSize: 25,
  },
  textStyle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 15,
    marginBottom: 15,
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10
  },
  home_screen: {
    flexDirection: 'column',
    height: height,
    width: width,
    backgroundColor: '#F8F9FA'
  },

  homeHeading: {
    height: '45%',
    width: '100%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 10,
    width: '100%',
    // marginTop: 0,
  },
  homeMap: {
    height: scaleHeight(150),
    width: '100%',
    paddingHorizontal: 8,
    borderRadius: scaleWidth(20),
    width: '100%',
    // marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // gap:5

  },
  map_box: {
    borderWidth: scaleWidth(5),
    borderColor: '#FFFFFF',
    // height: '78%',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  home_categories_options: {
    height: 70,
    // height:160,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'relative',    // Ensures it scrolls with the content until it reaches the navBar
    zIndex: 10,
    backgroundColor: '#dc2f02',
    marginBottom: 4
  },
  category_container: {
    flexDirection: 'row',
    height: 'auto',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'

  },
  category_boxes: {
    width: 130,
    height: 50,
    backgroundColor: '#FFB74D', // Nice plumping background color
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4.65, // Shadow radius
    elevation: 8, // Elevation for Android
  }
  ,
  category_text: {
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'jakarta_bold',
    fontSize: 15
  },
  homeHeadingText: {
    // fontSize: 18,
    fontSize: width * 0.04,
    color: '#eaf4f4',
    fontFamily: 'montserrat_bold'

  },
  foodItems_container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#F0F4F8'
    ,paddingBottom:scaleHeight(60) , 
    // marginTop: scaleHeight(10)
  },

  price: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodItemBox: {
    height: 380,
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5
  },
  foodImage: {
    height: '82%',
    backgroundColor: 'grey',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',

  },

  time: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
  price_and_time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: scaleWidth(2),
    borderTopWidth: scaleWidth(2),
    borderBottomWidth: scaleWidth(2),
    borderColor: '#FF5722',
    height: scaleHeight(45),
    width: '70%',
    borderTopLeftRadius: scaleWidth(20),
    borderBottomLeftRadius: scaleWidth(20),
    backgroundColor: '#F5F5F5',
    paddingHorizontal: scaleWidth(1),
    paddingLeft: scaleWidth(10),
    paddingRight: scaleWidth(2),

  },
  searchView: {
    height: scaleHeight(45),
    borderColor: '#FF5722',
    width: '15%',
    borderWidth: scaleWidth(2),
    borderLeftWidth: 0,
    borderTopRightRadius: scaleWidth(20),
    borderBottomRightRadius: scaleWidth(20),
    borderBottomLeftRadius: scaleWidth(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
})