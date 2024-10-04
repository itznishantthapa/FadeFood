import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainViewStyle:{
        backgroundColor: '#F5F5F5',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection:'column',
       
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
        backgroundColor: '#000000',
        borderRadius: 10,
        marginTop: 20
    },
    authBox:{
        height:90,
        width:'80%',
        borderWidth:1,
        borderColor:'#BDBDBD',
        flexDirection:'column',
        justifyContent:'center',
        paddingLeft:20 
    },
    BigText_for_login:{
        flexDirection:'column',
        width:'80%',
        justifyContent:'center',
        alignItems:'flex-start',
        marginBottom:40

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
      dashboardContainer:{
        height:510,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
      },
      homeHeading:{
        height:'40%',
        width:'100%',
        alignItems:'center',
        backgroundColor:'#0d1b2a',
        borderBottomRightRadius:20
        ,borderBottomLeftRadius:20
        
      },
      homeMap:{
        height:'48%',
        width:'100%',
        // backgroundColor:'#C8E6A4',
      },
      home_categories_options:{
        height:'12%',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
      },
      navBar:{
        width:'100%',
        height:60,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
      },
      searchBar:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1.5,
        borderColor:'#333333',
        height:45,
        width:'77%',
        borderRadius:8,
        backgroundColor:'#F5F5F5',
      },
      searchInput:{
        width:'90%',
        height:40,
        color:'#666666',
        fontSize:18,
       
      },
      logo:{
        height:30,
        width:30,
      }

})