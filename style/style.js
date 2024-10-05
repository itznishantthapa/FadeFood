import { StyleSheet,Platform } from "react-native";


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
    height: 50,
    color: '#212121',
    fontWeight: 'bold',
    fontSize: 18,
  },

  loginButton: {
    width: '80%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5722',
    borderRadius: 10,
    marginTop: 20
  },
  authBox: {
    height: 90,
    width: '80%',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20
  },
  BigText_for_login: {
    flexDirection: 'column',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 40

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent black
    // backgroundColor: 'rgba(0, 0, 255, 0.3)',  // Option for bluish background
    borderRadius: 10
  },
  home_screen: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: '#FAFAFA'
  },
  dashboardContainer: {
    height: 390,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#FAFAFA',
    paddingBottom: 10,
  },
  homeHeading: {
    height: '45%',
    width: '100%',
    // backgroundColor: '#0d1b2a',
    backgroundColor: '#dc2f02',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 10,
    width: '100%',

  },
  homeMap: {
    height: '55%',
    width: '100%',
    padding: 10,
    borderRadius: 20,
    width: '100%',
    marginBottom: 20
  },
  map_box: {
    borderWidth: 10,
    borderColor: '#FFFFFF',
    height: '90%',
    borderRadius: 20,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Elevation for Android
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
    // backgroundColor: '#0d1b2a',
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
    // fontWeight: 'bold',
    color: '#ffffff',
     fontFamily:'jakarta_bold',
     fontSize: 15
  },
  navBar: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#0d1b2a',
    backgroundColor:'#dc2f02',
    zIndex: 10,
    position: 'absolute', //need tp fixed 
    top: 0,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff',
    height: 45,
    width: '77%',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  searchInput: {
    width: '90%',
    height: 40,
    color: '#666666',
    fontSize: 18,
    //  fontFamily:'jakarta_regular'
     fontFamily:'noto_regular'

  },
  logo: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  homeHeadingText: {
    // fontWeight: 'bold',
    fontSize: 30,
    color: '#eaf4f4',
    // fontFamily:'raleway'
    fontFamily:'jakarta_bold'

  },
  foodItems_container:{
    
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', width: '100%', gap: 10, paddingBottom: 4 

  },
  logoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 8, 
    borderRadius: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4.65, 
    elevation: 8, 
  },
  

})