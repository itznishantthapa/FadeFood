import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import TopBar from '../../components/viewScreens/TopBar';
import { scaleHeight, scaleWidth } from '../../Scaling';
import esewa from '../../assets/esewa.png'



const MethodSelection = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4F8" }}>
      <StatusBar hidden={false} backgroundColor="#F0F4F8" style="dark" />
      <TopBar navigation={navigation} top_title='Payment' withSettingIcons={false} handleSettingIcon={undefined} />
      <View style={styles.container}>
        <View style={styles.paymentBar}>
              <View style={styles.paymentLogo}>
                <Image source={esewa} style={styles.paymentLogoImage} />
              </View>

              <View style={styles.paymentText}>
                <Text style={styles.paymentTextTitle}>Esewa</Text>
              </View>

        
            </View>
      </View>
    </SafeAreaView >
  )
}

export default MethodSelection

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  paymentBar: {
    backgroundColor: "#fff",
    height: scaleHeight(100),
    width: "90%",
    borderRadius: scaleWidth(10),
    marginTop: scaleHeight(10),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: scaleWidth(10),
    gap:scaleWidth(10),
    padding:scaleHeight(10),

  },
  paymentLogo:{
    width:scaleWidth(50),
    height:scaleHeight(50),
    borderRadius:scaleWidth(10),
  },

  paymentLogoImage:{
    width:scaleWidth(50),
    height:scaleHeight(50),
    borderRadius:scaleWidth(10),

  },
  paymentTextTitle:{
    fontSize:scaleWidth(20),
    color:"#000",
    fontFamily:'montserrat_semibold'
  }



})