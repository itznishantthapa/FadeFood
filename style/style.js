import { StyleSheet } from "react-native";

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
    backgroundColor: '#0d1b2a',
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
    backgroundColor: '#D7D7D7'
  },
  dashboardContainer: {
    height: 385,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#D7D7D7'
  },
  homeHeading: {
    height: '45%',
    width: '100%',
    backgroundColor: '#0d1b2a',
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
    marginBottom: 10
  },
  map_box:{
    borderWidth: 10, 
    borderColor: 'white', 
    height: '90%', 
    borderRadius: 20 
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
    backgroundColor: '#0d1b2a',
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
    backgroundColor: '#7CB518',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },
  category_text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  navBar: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0d1b2a',
    zIndex: 10,
    position: 'absolute', //need tp fixed 
    top: 0,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#333333',
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

  },
  logo: {
    height: 30,
    width: 30,
  },
  homeHeadingText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#eaf4f4'

  },
  foodItems_container:{
    
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', width: '100%', gap: 10, paddingBottom: 4 

  }

})