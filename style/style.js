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
        // borderWidth:1,
        // borderColor:'black'
    },
    loginButton: {
        width: '80%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF6F00',
        borderRadius: 10,
        marginTop: 20
    },
    authBox:{
        height:90,
        width:'80%',
        borderWidth:1,
        borderColor:'#E0E0E0',
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

    }
})